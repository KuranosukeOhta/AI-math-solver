import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// 静的ファイルの拡張子リスト
const STATIC_FILE_EXTENSIONS = ['.js', '.css', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico', '.json', '.woff', '.woff2', '.ttf', '.eot'];

export async function middleware(request: NextRequest) {
  // 開発モードでも認証チェックを行う（認証スキップを無効化）
  // const isDevelopment = process.env.NODE_ENV === 'development';
  // if (isDevelopment) {
  //   return NextResponse.next();
  // }

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
  const url = request.nextUrl.toString()
  
  // 静的ファイルかどうかをチェック
  const isStaticFile = 
    path.startsWith('/_next/') || 
    path.startsWith('/static/') || 
    STATIC_FILE_EXTENSIONS.some(ext => path.endsWith(ext)) ||
    url.includes('/_next/static/') ||
    url.includes('v=');
  
  // API エンドポイント、静的ファイル、パブリックパスはスキップ
  if (
    path.startsWith('/api/') || 
    isStaticFile ||
    publicPaths.some(p => path.startsWith(p))
  ) {
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

// 静的ファイルへのパスを明示的に除外
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.js|.*\\.css|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico).*)',
  ],
} 