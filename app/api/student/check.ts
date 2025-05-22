import { NextRequest, NextResponse } from 'next/server';
import { getUserById } from '@/utils/supabase';

export async function GET(request: NextRequest) {
  try {
    // クッキーからユーザーIDを取得
    const userId = request.cookies.get('userId')?.value;
    
    if (!userId) {
      return NextResponse.json({ success: false, message: 'ユーザー情報が見つかりません' }, { status: 401 });
    }

    // ユーザー情報を取得
    const user = await getUserById(userId);
    
    if (!user) {
      return NextResponse.json({ success: false, message: 'ユーザー情報が見つかりません' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      studentId: user.student_id,
      name: user.name,
    });
  } catch (error) {
    console.error('ユーザー情報確認エラー:', error);
    return NextResponse.json({ success: false, message: '予期せぬエラーが発生しました' }, { status: 500 });
  }
} 