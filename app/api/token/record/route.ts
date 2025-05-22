import { type NextRequest, NextResponse } from 'next/server'

// トークン使用量を記録するためのダミーエンドポイント
// 現在は実際の処理は行わず、成功レスポンスのみ返します
export async function POST(request: NextRequest) {
  try {
    // リクエストボディを取得
    const body = await request.json().catch(() => ({}))
    
    console.log('[DEBUG] Token usage record request:', body)
    
    // 成功レスポンスを返す
    return NextResponse.json({ success: true, message: 'Token usage recorded (dummy)' })
  } catch (error: any) {
    console.error('[DEBUG] Error in token record:', error)
    return NextResponse.json(
      { 
        error: true, 
        message: error.message || 'Failed to process token record request'
      },
      { status: 500 }
    )
  }
} 