import { type NextRequest } from 'next/server'
import { ChatClient } from 'dify-client'
import { v4 } from 'uuid'
import { API_KEY, API_URL, APP_ID } from '@/config'

// Dify API設定情報をログ出力
console.log('Dify API 設定:')
console.log('APP_ID:', APP_ID || '未設定')
console.log('API_KEY:', API_KEY ? '設定済み' : '未設定')
console.log('API_URL:', API_URL || '未設定')

const userPrefix = `user_${APP_ID}:`

export const getInfo = (request: NextRequest) => {
  const sessionId = request.cookies.get('session_id')?.value || v4()
  const user = userPrefix + sessionId
  return {
    sessionId,
    user,
  }
}

export const setSession = (sessionId: string) => {
  return { 'Set-Cookie': `session_id=${sessionId}` }
}

// APIキーまたはURLが未設定の場合、コンソールに警告を出力
if (!API_KEY || !API_URL) {
  console.warn('警告: Dify APIキーまたはURLが設定されていません。チャット機能が動作しない可能性があります。')
  console.warn('環境変数 NEXT_PUBLIC_APP_ID, NEXT_PUBLIC_APP_KEY, NEXT_PUBLIC_API_URL を確認してください。')
}

// DifyのChatClientを初期化
export const client = new ChatClient(API_KEY, API_URL || undefined)

// APIリクエストの送信前にデバッグ用のログを出力する関数
export const logAPIRequest = (url: string, method: string, data?: any) => {
  console.log(`[Dify API] リクエスト: ${method} ${url}`)
  if (data) {
    console.log(`[Dify API] リクエストデータ:`, data)
  }
}

// API応答をデバッグ用にログ出力する関数
export const logAPIResponse = (url: string, status: number, data?: any) => {
  console.log(`[Dify API] 応答: ${status} ${url}`)
  if (data) {
    console.log(`[Dify API] 応答データ:`, data)
  }
}
