import { NextRequest, NextResponse } from 'next/server';
import { recordTokenUsage } from '@/utils/supabase';

export async function POST(request: NextRequest) {
  try {
    // クッキーからユーザーIDを取得
    const userId = request.cookies.get('userId')?.value;
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'ユーザーIDが見つかりません。学番と名前を登録してください。' }, 
        { status: 401 }
      );
    }

    const body = await request.json();
    const { inputTokens, outputTokens, model } = body;

    // バリデーション
    if (typeof inputTokens !== 'number' || typeof outputTokens !== 'number' || !model) {
      return NextResponse.json(
        { success: false, message: '無効なパラメータです' }, 
        { status: 400 }
      );
    }

    // トークン使用量を記録
    const success = await recordTokenUsage(userId, inputTokens, outputTokens, model);

    if (!success) {
      return NextResponse.json(
        { success: false, message: 'トークン使用量の記録に失敗しました' }, 
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('トークン記録エラー:', error);
    return NextResponse.json(
      { success: false, message: '予期せぬエラーが発生しました' }, 
      { status: 500 }
    );
  }
} 