import { type NextRequest, NextResponse } from 'next/server'
import { API_KEY, API_URL, APP_ID } from '@/config'

// 会話一覧を取得するエンドポイント（Difyプロキシ）
export async function GET(request: NextRequest) {
  try {
    // URLからクエリパラメータを取得
    const { searchParams } = new URL(request.url)
    const firstId = searchParams.get('first_id')
    const limit = searchParams.get('limit')
    const pinned = searchParams.get('pinned')
    
    console.log('[DEBUG Proxy] Conversations API Request:', { firstId, limit, pinned })

    // Dify APIのエンドポイント
    const difyUrl = new URL(`${API_URL}/conversations`)
    
    // クエリパラメータを追加
    if (firstId) difyUrl.searchParams.append('first_id', firstId)
    if (limit) difyUrl.searchParams.append('limit', limit)
    if (pinned) difyUrl.searchParams.append('pinned', pinned)
    
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
          message: `Failed to fetch conversations from Dify API: ${response.status}`,
          details: errorText
        },
        { status: response.status }
      )
    }

    // 正常なレスポンスを返す
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('[DEBUG Proxy] Error in conversations proxy:', error)
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

// 新しい会話を作成するエンドポイント（名前の自動生成用）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const conversationId = body.conversation_id
    const autoGenerate = body.auto_generate || true
    const user = body.user
    
    if (!conversationId) {
      return NextResponse.json(
        { error: true, message: 'Conversation ID is required' },
        { status: 400 }
      )
    }
    
    console.log('[DEBUG Proxy] Rename Conversation Request:', { conversationId, autoGenerate, user })
    
    // Dify APIのエンドポイント
    const difyUrl = `${API_URL}/conversations/${conversationId}/name`
    
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
      body: JSON.stringify({
        auto_generate: autoGenerate,
        user
      }),
      cache: 'no-store'
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[DEBUG Proxy] Dify API error:', response.status, errorText)
      return NextResponse.json(
        { 
          error: true, 
          message: `Failed to rename conversation: ${response.status}`,
          details: errorText
        },
        { status: response.status }
      )
    }

    // 正常なレスポンスを返す
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('[DEBUG Proxy] Error in conversation rename proxy:', error)
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
