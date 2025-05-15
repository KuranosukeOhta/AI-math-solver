import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // 認証が必要ないパスはスキップ
  const publicPaths = [
    '/auth/signin',
    '/auth/signup',
    '/payment/success',
    '/payment/cancel',
    '/api/auth',
    '/api/stripe/webhook',
  ]

  const path = request.nextUrl.pathname
  
  // API エンドポイントとパブリックパスはスキップ
  if (path.startsWith('/api/') || publicPaths.some(p => path.startsWith(p))) {
    return NextResponse.next()
  }

  // ユーザーのトークンを取得
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // ユーザーが認証されていない場合はログインページにリダイレクト
  if (!token) {
    const url = new URL('/auth/signin', request.url)
    url.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(url)
  }

  // サブスクリプションの有効期限をチェック
  const subscriptionEnd = token.subscriptionEnd ? new Date(token.subscriptionEnd as string) : null
  const now = new Date()
  
  // サブスクリプションが有効でない場合は支払いページにリダイレクト
  if (!subscriptionEnd || subscriptionEnd < now) {
    // チャットページへのアクセスの場合のみリダイレクト
    if (path === '/' || path.startsWith('/chat')) {
      return NextResponse.redirect(new URL('/payment', request.url))
    }
  }

  return NextResponse.next()
} 