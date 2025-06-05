import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

// 使用モデル（o4-mini思考モデル - o1,o3,o4シリーズの最新版）
const DEFAULT_MODEL = 'openai/o4-mini'

// o4-mini料金設定（1M tokensあたりの価格、単位: USD）
const O4_MINI_PRICE = {
  INPUT: 1.10,   // $1.10 per 1M tokens
  OUTPUT: 0.275  // $0.275 per 1M tokens
}

/**
 * トークン使用量を記録する関数
 */
const recordTokenUsage = async (userId: string, inputTokens: number, outputTokens: number, model: string) => {
  try {
    const totalTokens = inputTokens + outputTokens;
    
    // o4-miniの料金計算
    const totalCost = ((inputTokens / 1000000) * O4_MINI_PRICE.INPUT) + ((outputTokens / 1000000) * O4_MINI_PRICE.OUTPUT);

    await prisma.tokenUsageLog.create({
      data: {
        user_id: userId,
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        total_tokens: totalTokens,
        model_name: model,
        cost: totalCost
      }
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        token_usage: {
          increment: totalTokens
        },
        estimated_cost: {
          increment: totalCost
        }
      }
    });

    return true;
  } catch (error) {
    console.error('トークン使用量記録中のエラー:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  console.log('=== Chat Messages API Request Started ===')
  try {
    const requestBody = await request.json()
    console.log('Request body received:', JSON.stringify(requestBody, null, 2))
    
    const { inputs, query, conversation_id, user, response_mode = "streaming", model = DEFAULT_MODEL } = requestBody

    if (!OPENROUTER_API_KEY) {
      console.error('OpenRouter API key not configured')
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' }, 
        { status: 500 }
      )
    }

    // メッセージ配列の構築
    const messages = [
      {
        role: 'user',
        content: query
      }
    ]

    // OpenRouterリクエストの準備
    const openRouterRequest = {
      model,
      messages,
      stream: response_mode === "streaming",
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

    if (response_mode === "streaming") {
      // ストリーミングレスポンスの処理
      const encoder = new TextEncoder()
      const decoder = new TextDecoder()

      let messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      let inputTokens = 0
      let outputTokens = 0
      let fullContent = ''

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
            
            while (true) {
              const { done, value } = await reader.read()
              
              if (done) {
                // ユーザーIDの抽出と使用量記録
                if (user && inputTokens > 0) {
                  const userId = user.includes(':') ? user.split(':')[1] : user;
                  if (userId && userId !== 'undefined') {
                    await recordTokenUsage(userId, inputTokens, outputTokens, model)
                  }
                }

                // 終了イベントの送信
                if (!controllerClosed) {
                  try {
                    const endEvent = {
                      event: 'message_end',
                      data: {
                        id: messageId,
                        conversation_id: conversation_id,
                        usage: {
                          input_tokens: inputTokens,
                          output_tokens: outputTokens,
                          total_tokens: inputTokens + outputTokens
                        }
                      }
                    }
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(endEvent)}\n\n`))
                    controller.close()
                    controllerClosed = true
                  } catch (controllerError) {
                    console.log('Controller already closed:', controllerError)
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
                    
                    // 使用状況の追跡
                    if (parsed.usage) {
                      inputTokens = parsed.usage.prompt_tokens || 0
                      outputTokens = parsed.usage.completion_tokens || 0
                    }

                    if (parsed.choices && parsed.choices[0]) {
                      const choice = parsed.choices[0]
                      const content = choice.delta?.content || ''

                      if (content && !controllerClosed) {
                        fullContent += content
                        
                        // Dify形式のメッセージデータの構築
                        const messageData = {
                          event: 'message',
                          data: {
                            id: messageId,
                            conversation_id: conversation_id,
                            answer: content,
                            created_at: Date.now()
                          }
                        }

                        try {
                          controller.enqueue(encoder.encode(`data: ${JSON.stringify(messageData)}\n\n`))
                        } catch (enqueueError) {
                          console.log('Controller enqueue error:', enqueueError)
                          controllerClosed = true
                        }
                      }

                      // 思考プロセスの処理（o4-miniでサポートされている場合）
                      if (choice.delta?.reasoning) {
                        const reasoningData = {
                          event: 'agent_thought',
                          data: {
                            id: `thought_${Date.now()}`,
                            chain_id: messageId,
                            position: parsed.reasoning?.step || 0,
                            thought: choice.delta.reasoning,
                            created_at: Date.now()
                          }
                        }

                        if (!controllerClosed) {
                          try {
                            controller.enqueue(encoder.encode(`data: ${JSON.stringify(reasoningData)}\n\n`))
                          } catch (enqueueError) {
                            console.log('Reasoning enqueue error:', enqueueError)
                            controllerClosed = true
                          }
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
      
      // トークン使用量の記録
      if (user && data.usage) {
        const userId = user.includes(':') ? user.split(':')[1] : user;
        if (userId && userId !== 'undefined') {
          await recordTokenUsage(
            userId, 
            data.usage.prompt_tokens || 0, 
            data.usage.completion_tokens || 0, 
            model
          )
        }
      }

      // Dify互換形式でレスポンス
      const difyResponse = {
        conversation_id: conversation_id,
        message_id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        answer: data.choices?.[0]?.message?.content || '',
        created_at: Date.now(),
        usage: data.usage || {}
      }

      return NextResponse.json(difyResponse)
    }
  } catch (error) {
    console.error('Chat messages error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
} 