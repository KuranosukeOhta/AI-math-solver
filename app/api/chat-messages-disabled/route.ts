import { type NextRequest, NextResponse } from 'next/server'
import { API_KEY, API_URL, APP_ID } from '@/config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('送信データ:', body)
    
    const {
      inputs = {},  // inputsがない場合は空オブジェクトをデフォルト値として使用
      query,
      files,
      conversation_id: conversationId,
      response_mode: responseMode,
      user
    } = body
    
    // 必須パラメータのチェック
    if (!query && !inputs) {
      return NextResponse.json(
        { error: true, message: 'query or inputs is required' },
        { status: 400 }
      )
    }
    
    // Dify APIへのリクエストデータ作成
    const difyRequestBody = {
      inputs,
      query,
      user,
      response_mode: responseMode || 'streaming',
    }
    
    // オプションのパラメータ追加
    if (conversationId) {
      difyRequestBody.conversation_id = conversationId
    }
    
    if (files && files.length > 0) {
      difyRequestBody.files = files
    }
    
    console.log('[DEBUG Proxy] Chat Message Request to Dify:', difyRequestBody)
    
    // Dify APIのエンドポイント
    const difyUrl = `${API_URL}/chat-messages`
    
    // リクエストヘッダー
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      'App-Id': APP_ID
    }
    
    // SSEレスポンスを返すためのストリームを作成
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Dify APIにリクエスト
          const response = await fetch(difyUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(difyRequestBody),
          })
          
          if (!response.ok) {
            const errorText = await response.text()
            console.error('[DEBUG Proxy] Dify API error:', response.status, errorText)
            
            // エラーイベントをクライアントに送信
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              status: response.status,
              message: `Dify API returned an error: ${response.status}`,
              details: errorText
            })}\n\n`))
            
            controller.close()
            return
          }
          
          // SSEレスポンスをクライアントに転送
          const reader = response.body?.getReader()
          if (!reader) {
            throw new Error('Response body is null')
          }
          
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            
            // 受信したデータをそのままクライアントに転送
            controller.enqueue(value)
          }
          
          controller.close()
        } catch (error: any) {
          console.error('[DEBUG Proxy] Stream error:', error)
          
          // エラーイベントをクライアントに送信
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({
            status: 500,
            message: `Error in chat message proxy: ${error.message}`
          })}\n\n`))
          
          controller.close()
        }
      }
    })
    
    // SSEレスポンスを返す
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error: any) {
    console.error('[DEBUG Proxy] Error in chat-messages proxy:', error)
    return NextResponse.json(
      { 
        error: true, 
        message: error.message || 'Failed to process request',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}
