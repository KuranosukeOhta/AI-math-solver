import { NextRequest, NextResponse } from 'next/server';
import { getUserById } from '@/utils/supabase';

export async function GET(request: NextRequest) {
  console.log('/api/student/check] GET request received'); // リクエスト開始ログ
  try {
    // クッキーからユーザーIDを取得
    console.log('/api/student/check] Reading userId cookie'); // クッキー読み取り前ログ
    const userId = request.cookies.get('userId')?.value;
    console.log(`[/api/student/check] userId from cookie: ${userId}`); // クッキー読み取り結果ログ
    
    if (!userId) {
      console.log('/api/student/check] userId cookie missing, returning 401'); // userIdなしログ
      return NextResponse.json({ success: false, message: 'ユーザー情報が見つかりません' }, { status: 401 });
    }

    // ユーザー情報を取得
    console.log(`[/api/student/check] Fetching user with ID: ${userId}`); // ユーザー情報取得前ログ
    const user = await getUserById(userId);
    console.log(`[/api/student/check] User fetch result: ${user ? 'Found' : 'Not Found'}`); // ユーザー情報取得結果ログ
    
    if (!user) {
      console.log(`[/api/student/check] User with ID ${userId} not found in DB, returning 404`); // ユーザー見つからずログ
      return NextResponse.json({ success: false, message: 'ユーザー情報が見つかりません' }, { status: 404 });
    }

    console.log('/api/student/check] User found, returning success response'); // ユーザー見つかったログ
    return NextResponse.json({
      success: true,
      studentId: user.student_id,
      name: user.name,
    });
  } catch (error) {
    console.error('/api/student/check] Error:', error); // エラーログ
    return NextResponse.json({ success: false, message: '予期せぬエラーが発生しました' }, { status: 500 });
  }
} 