import { type NextRequest, NextResponse } from 'next/server'
import { API_KEY, API_URL, APP_ID } from '@/config'

// メッセージ一覧を取得するエンドポイント（Difyプロキシ）
export async function GET(request: NextRequest) {
  try {
    // URLからクエリパラメータを取得
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get('conversation_id')
    const limit = searchParams.get('limit')
    const lastId = searchParams.get('last_id')
    
    console.log('[DEBUG Proxy] Messages API Request:', { conversationId, limit, lastId })

    // 必須パラメータのチェック
    if (!conversationId) {
      return NextResponse.json(
        { error: true, message: 'conversation_id is required' },
        { status: 400 }
      )
    }

    // Dify APIのエンドポイント
    const difyUrl = new URL(`${API_URL}/messages`)
    
    // クエリパラメータを追加
    difyUrl.searchParams.append('conversation_id', conversationId)
    if (limit) difyUrl.searchParams.append('limit', limit)
    if (lastId) difyUrl.searchParams.append('last_id', lastId)
    
    // リクエストヘッダー
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      'App-Id': APP_ID
    }
    
    console.log('[DEBUG Proxy] Requesting Dify API:', difyUrl.toString())

    // Dify APIにリクエスト
    const response = await fetch(difyUrl.toString(), {
      method: 'GET',
      headers,
      cache: 'no-store'
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[DEBUG Proxy] Dify API error:', response.status, errorText)
      return NextResponse.json(
        { 
          error: true, 
          message: `Failed to fetch messages from Dify API: ${response.status}`,
          details: errorText
        },
        { status: response.status }
      )
    }

    // 正常なレスポンスを返す
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('[DEBUG Proxy] Error in messages proxy:', error)
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

// メッセージにフィードバックを追加するエンドポイント（Difyプロキシ）
export async function POST(request: NextRequest) {
  try {
    // パスからメッセージIDを取得
    const path = new URL(request.url).pathname
    const messageId = path.split('/messages/')[1]?.split('/')[0]
    
    if (!messageId) {
      return NextResponse.json(
        { error: true, message: 'Message ID is required' },
        { status: 400 }
      )
    }
    
    const body = await request.json()
    
    console.log('[DEBUG Proxy] Feedback Request:', { messageId, body })
    
    // Dify APIのエンドポイント
    const difyUrl = `${API_URL}/messages/${messageId}/feedbacks`
    
    // リクエストヘッダー
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      'App-Id': APP_ID
    }

    // Dify APIにリクエスト
    const response = await fetch(difyUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      cache: 'no-store'
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[DEBUG Proxy] Dify API error:', response.status, errorText)
      return NextResponse.json(
        { 
          error: true, 
          message: `Failed to submit feedback to Dify API: ${response.status}`,
          details: errorText
        },
        { status: response.status }
      )
    }

    // 正常なレスポンスを返す
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('[DEBUG Proxy] Error in feedback proxy:', error)
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
