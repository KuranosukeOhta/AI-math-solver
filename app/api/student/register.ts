import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';
import { validateStudentId } from '@/utils/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, name } = body;

    // バリデーション
    if (!studentId || !name) {
      return NextResponse.json({ success: false, message: '学番と名前を入力してください' }, { status: 400 });
    }

    if (!validateStudentId(studentId)) {
      return NextResponse.json({ 
        success: false, 
        message: '学番は2文字のアルファベットと5桁の数字（例: ab12345）の形式で入力してください'
      }, { status: 400 });
    }

    // 学番が既に存在するか確認
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('student_id', studentId)
      .maybeSingle();

    if (checkError) {
      console.error('学番重複チェックエラー:', checkError);
      return NextResponse.json({ success: false, message: 'データベースエラーが発生しました' }, { status: 500 });
    }

    let userId;

    if (existingUser) {
      // 既存ユーザーの場合は名前を更新
      userId = existingUser.id;
      const { error: updateError } = await supabase
        .from('users')
        .update({ name })
        .eq('id', userId);

      if (updateError) {
        console.error('ユーザー更新エラー:', updateError);
        return NextResponse.json({ success: false, message: 'ユーザー情報の更新に失敗しました' }, { status: 500 });
      }
    } else {
      // 新規ユーザーの場合は作成
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          student_id: studentId,
          name,
          email: `${studentId}@example.com`, // ダミーのメールアドレス
          password: '' // パスワードは使用しないが、NULLではないようにする
        })
        .select('id')
        .single();

      if (createError) {
        console.error('ユーザー作成エラー:', createError);
        return NextResponse.json({ success: false, message: 'ユーザー登録に失敗しました' }, { status: 500 });
      }

      userId = newUser.id;
    }

    // クッキーにユーザーIDを保存（セッション管理用）
    const response = NextResponse.json({ success: true, userId });
    response.cookies.set('userId', userId, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60, // 30日
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('エラー:', error);
    return NextResponse.json({ success: false, message: '予期せぬエラーが発生しました' }, { status: 500 });
  }
} 