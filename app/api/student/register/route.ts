import { type NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';
import { validateStudentId } from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid'; // UUIDを生成するためのライブラリをインポート

export async function POST(request: NextRequest) {
  console.log('[/api/student/register] POST request received');
  try {
    const body = await request.json();
    const { studentId, name } = body;
    console.log(`[/api/student/register] Request body: studentId=${studentId}, name=${name}`);

    // バリデーション
    if (!studentId || !name) {
      console.log('[/api/student/register] Validation failed: studentId or name is missing');
      return NextResponse.json({ success: false, message: '学番と名前を入力してください' }, { status: 400 });
    }

    if (!validateStudentId(studentId)) {
      console.log(`[/api/student/register] Validation failed: Invalid studentId format: ${studentId}`);
      return NextResponse.json({ success: false, message: '学番の形式が正しくありません（例: ab12345）' }, { status: 400 });
    }

    // 既存のユーザーをチェック
    console.log(`[/api/student/register] Checking if studentId ${studentId} already exists`);
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('student_id', studentId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116は「見つからない」エラー
      console.log('[/api/student/register] Error checking existing user:', checkError);
      return NextResponse.json({ 
        success: false, 
        message: 'データベースエラーが発生しました' 
      }, { status: 500 });
    }

    if (existingUser) {
      console.log(`[/api/student/register] User with studentId ${studentId} already exists`);
      return NextResponse.json({ 
        success: false, 
        message: 'この学番は既に登録されています' 
      }, { status: 409 });
    }

    // 新しいユーザーを作成
    console.log('[/api/student/register] Creating new user');
    const userId = uuidv4();
    const email = `${studentId}@example.com`; // 仮のメールアドレス
    
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert([
        {
          id: userId,
          email: email,
          password: '', // パスワードは空文字列
          name: name,
          student_id: studentId,
          token_usage: 0,
          estimated_cost: 0.0
        }
      ])
      .select()
      .single();

    if (createError) {
      console.log('[/api/student/register] Error creating user:', createError);
      return NextResponse.json({ 
        success: false, 
        message: 'ユーザー作成に失敗しました' 
      }, { status: 500 });
    }

    console.log(`[/api/student/register] User created successfully: ${newUser.id}`);

    // cookieにuserIdを保存
    const response = NextResponse.json({ 
      success: true, 
      message: '登録が完了しました',
      userId: newUser.id
    });
    
    response.cookies.set('userId', newUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30日
    });

    return response;

  } catch (error) {
    console.error('[/api/student/register] Unexpected error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'サーバーエラーが発生しました' 
    }, { status: 500 });
  }
} 