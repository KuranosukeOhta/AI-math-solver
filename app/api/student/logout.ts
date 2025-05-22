import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true, message: 'ログアウトしました' });
    // userIdクッキーを削除
    response.cookies.set('userId', '', {
      httpOnly: true,
      maxAge: 0, // 即時失効
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('ログアウトエラー:', error);
    return NextResponse.json({ success: false, message: 'ログアウト処理中にエラーが発生しました' }, { status: 500 });
  }
} 