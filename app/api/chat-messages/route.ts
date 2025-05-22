import { type NextRequest, NextResponse } from 'next/server'
import { client, getInfo, logAPIRequest, logAPIResponse } from '@/app/api/utils/common'

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
    } = body
    
    const { user } = getInfo(request)
    
    // デバッグ用にリクエスト情報をログ出力
    logAPIRequest('/chat-messages', 'POST', { 
      inputs, query, user, responseMode, conversationId, files 
    })
    
    console.log('[DEBUG] Dify API呼び出し直前のパラメータ:', {
      inputs, 
      query, 
      user, 
      stream: responseMode === 'streaming', // 文字列を真偽値に変換
      conversationId,
      files
    })
    
    // Dify APIにリクエスト送信 - 正しいパラメータ順序とストリーミング設定で呼び出し
    const res = await client.createChatMessage(
      inputs,
      query, 
      user, 
      responseMode === 'streaming', // 'streaming'という文字列ではなくtrueに変換
      conversationId, 
      files
    )
    
    // デバッグ用にレスポンス情報をログ出力
    logAPIResponse('/chat-messages', 200, res)
    
    return new Response(res.data)
  } catch (error: any) {
    console.error('API応答エラー', error)
    
    // エラーメッセージとスタックトレースを詳細にログ出力
    if (error.response) {
      console.error('[DEBUG] Error response:', error.response)
      console.error('[DEBUG] Error status:', error.response.status)
      console.error('[DEBUG] Error data:', error.response.data)
      
      // リクエスト情報も表示
      if (error.config) {
        console.error('[DEBUG] Failed request URL:', error.config.url)
        console.error('[DEBUG] Failed request method:', error.config.method)
        console.error('[DEBUG] Failed request headers:', error.config.headers)
        console.error('[DEBUG] Failed request data:', error.config.data)
      }
    } else {
      console.error('[DEBUG] Error details:', error.message, error.stack)
    }
    
    // クライアントにエラー情報を返す
    return NextResponse.json({ 
      error: true, 
      message: error.message || 'チャットメッセージの作成中にエラーが発生しました',
      details: error.response?.data?.error || error.response?.data || null
    }, { status: 500 })
  }
}
