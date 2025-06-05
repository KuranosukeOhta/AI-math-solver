import { NextRequest, NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export async function POST(request: NextRequest) {
  console.log('=== Chat Messages API Request Started ===')
  
  try {
    const body = await request.json()
    console.log('Request body received:', JSON.stringify(body, null, 2))

    if (!OPENROUTER_API_KEY) {
      console.error('OpenRouter API key not configured')
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' }, 
        { status: 500 }
      )
    }

    // Dify形式のリクエストからOpenRouter形式に変換
    const { query, conversation_id, inputs, files, user, response_mode } = body
    
    // メッセージ履歴を構築
    const messages = [
      {
        role: 'user',
        content: query
      }
    ]
    
    // ファイルがある場合は統合
    if (files && files.length > 0) {
      console.log('Files received:', files.length)
      // ファイル処理をここに追加可能
    }

    // OpenRouterリクエストの準備
    const openRouterRequest = {
      model: 'openai/gpt-4o', // 規定設定: GPT-4o
      messages,
      stream: response_mode === 'streaming',
      temperature: 0.7,
      max_tokens: 4000
    }

    console.log('OpenRouter request:', JSON.stringify(openRouterRequest, null, 2))

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'AI Math Solver'
      },
      body: JSON.stringify(openRouterRequest)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenRouter API error:', response.status, errorText)
      return NextResponse.json(
        { error: `OpenRouter API error: ${response.status}` }, 
        { status: response.status }
      )
    }

    if (response_mode === 'streaming') {
      // ストリーミングレスポンスをDify形式に変換
      const encoder = new TextEncoder()
      const decoder = new TextDecoder()

      const conversationId = conversation_id || `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      const readableStream = new ReadableStream({
        async start(controller) {
          const reader = response.body?.getReader()
          if (!reader) {
            controller.close()
            return
          }

          let controllerClosed = false

          try {
            let buffer = ''
            let fullContent = ''
            
            while (true) {
              const { done, value } = await reader.read()
              
              if (done) {
                // 最終メッセージイベント
                if (!controllerClosed) {
                  try {
                    const messageEndEvent = {
                      event: 'message_end',
                      task_id: taskId,
                      id: messageId,
                      message_id: messageId,
                      conversation_id: conversationId,
                      answer: fullContent,
                      created_at: Math.floor(Date.now() / 1000)
                    }
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(messageEndEvent)}\n\n`))
                    controller.close()
                    controllerClosed = true
                  } catch (closeError) {
                    console.log('Controller close error:', closeError)
                    controllerClosed = true
                  }
                }
                break
              }

              buffer += decoder.decode(value, { stream: true })
              const lines = buffer.split('\n')
              buffer = lines.pop() || ''

              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6).trim()
                  
                  if (data === '[DONE]') {
                    continue
                  }

                  try {
                    const parsed = JSON.parse(data)
                    
                    if (parsed.choices && parsed.choices[0]) {
                      const choice = parsed.choices[0]
                      const content = choice.delta?.content || ''

                      if (content && !controllerClosed) {
                        fullContent += content
                        
                        // Dify形式のメッセージイベント
                        const messageEvent = {
                          event: 'message',
                          task_id: taskId,
                          id: messageId,
                          message_id: messageId,
                          conversation_id: conversationId,
                          answer: content,
                          created_at: Math.floor(Date.now() / 1000)
                        }

                        try {
                          controller.enqueue(encoder.encode(`data: ${JSON.stringify(messageEvent)}\n\n`))
                        } catch (enqueueError) {
                          console.log('Controller enqueue error:', enqueueError)
                          controllerClosed = true
                        }
                      }
                    }
                  } catch (parseError) {
                    console.error('Failed to parse OpenRouter response:', parseError)
                  }
                }
              }
            }
          } catch (error) {
            console.error('Stream processing error:', error)
            if (!controllerClosed) {
              try {
                controller.error(error)
                controllerClosed = true
              } catch (errorHandleError) {
                console.log('Controller error handling failed:', errorHandleError)
              }
            }
          }
        }
      })

      return new NextResponse(readableStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    } else {
      // 非ストリーミングレスポンス
      const data = await response.json()
      
      // Dify形式のレスポンスに変換
      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const conversationId = conversation_id || `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      const difyResponse = {
        event: 'message',
        task_id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        id: messageId,
        message_id: messageId,
        conversation_id: conversationId,
        answer: data.choices[0]?.message?.content || '',
        created_at: Math.floor(Date.now() / 1000)
      }

      return NextResponse.json(difyResponse)
    }
  } catch (error) {
    console.error('Chat messages API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
} 