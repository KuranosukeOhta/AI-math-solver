import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET() {
  console.log('[/api/student/test-connection] GET request received');
  
  try {
    // Supabaseへの接続をテスト
    const { data, error, status } = await supabase
      .from('users')
      .select('count(*)', { count: 'exact', head: true });
    
    if (error) {
      console.error('[/api/student/test-connection] Error testing connection:', error);
      return NextResponse.json({
        success: false,
        message: 'データベース接続エラー',
        error: error,
        status: status
      }, { status: 500 });
    }
    
    // 環境変数情報（機密情報は伏せる）
    const envInfo = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '設定済み' : '未設定',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '設定済み' : '未設定',
      NODE_ENV: process.env.NODE_ENV
    };
    
    return NextResponse.json({
      success: true,
      message: 'データベース接続成功',
      env: envInfo,
      data,
      status
    });
  } catch (error) {
    console.error('[/api/student/test-connection] Unexpected error:', error);
    return NextResponse.json({
      success: false,
      message: '予期せぬエラーが発生しました',
      error: error
    }, { status: 500 });
  }
} 