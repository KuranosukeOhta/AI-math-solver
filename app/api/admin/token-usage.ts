import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET(request: NextRequest) {
  try {
    // 認証キーの確認
    const adminApiKey = process.env.ADMIN_API_KEY;
    const requestApiKey = request.headers.get('Authorization');

    if (!adminApiKey || !requestApiKey || requestApiKey !== `Bearer ${adminApiKey}`) {
      return NextResponse.json(
        { success: false, message: '認証に失敗しました' }, 
        { status: 401 }
      );
    }

    // トークン使用量の集計
    const { data: tokenUsage, error: tokenUsageError } = await supabase
      .from('users')
      .select(`
        id,
        name,
        student_id,
        token_usage,
        estimated_cost,
        created_at
      `)
      .order('token_usage', { ascending: false });

    if (tokenUsageError) {
      console.error('トークン使用量取得エラー:', tokenUsageError);
      return NextResponse.json({ success: false, message: 'データベースエラーが発生しました' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: tokenUsage
    });
  } catch (error) {
    console.error('トークン使用量集計エラー:', error);
    return NextResponse.json({ success: false, message: '予期せぬエラーが発生しました' }, { status: 500 });
  }
} 