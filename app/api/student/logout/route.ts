import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // セッションクッキーをクリア
    const response = NextResponse.json({ success: true });
    
    // NextAuth.jsのセッションクッキーをクリア
    response.cookies.set('next-auth.session-token', '', {
      expires: new Date(0),
      path: '/'
    });
    
    response.cookies.set('__Secure-next-auth.session-token', '', {
      expires: new Date(0),
      path: '/'
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'ログアウトに失敗しました' },
      { status: 500 }
    );
  }
} 