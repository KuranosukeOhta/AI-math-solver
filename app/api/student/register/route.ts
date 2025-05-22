import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';
import { validateStudentId } from '@/utils/supabase';

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
      return NextResponse.json({ 
        success: false, 
        message: '学番は2文字のアルファベットと5桁の数字（例: ab12345）の形式で入力してください'
      }, { status: 400 });
    }

    // 学番が既に存在するか確認
    console.log(`[/api/student/register] Checking if studentId ${studentId} already exists`);
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('student_id', studentId)
      .maybeSingle();

    if (checkError) {
      console.error('[/api/student/register] Error checking existing user:', checkError);
      return NextResponse.json({ success: false, message: 'データベースエラーが発生しました' }, { status: 500 });
    }

    let userId;

    if (existingUser) {
      // 既存ユーザーの場合は名前を更新
      userId = existingUser.id;
      console.log(`[/api/student/register] Existing user found with ID ${userId}, updating name`);
      const { error: updateError } = await supabase
        .from('users')
        .update({ name })
        .eq('id', userId);

      if (updateError) {
        console.error('[/api/student/register] Error updating user:', updateError);
        return NextResponse.json({ success: false, message: 'ユーザー情報の更新に失敗しました' }, { status: 500 });
      }
    } else {
      // 新規ユーザーの場合は作成
      console.log('[/api/student/register] Creating new user');
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
        console.error('[/api/student/register] Error creating user:', createError);
        return NextResponse.json({ success: false, message: 'ユーザー登録に失敗しました' }, { status: 500 });
      }

      if (!newUser) {
        console.error('[/api/student/register] New user data is null or undefined');
        return NextResponse.json({ success: false, message: 'ユーザー登録に失敗しました' }, { status: 500 });
      }

      userId = newUser.id;
      console.log(`[/api/student/register] New user created with ID ${userId}`);
    }

    // クッキーにユーザーIDを保存（セッション管理用）
    console.log(`[/api/student/register] Setting userId cookie: ${userId}`);
    const response = NextResponse.json({ success: true, userId });
    response.cookies.set('userId', userId, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60, // 30日
      path: '/'
    });

    console.log('[/api/student/register] Registration successful');
    return response;
  } catch (error) {
    console.error('[/api/student/register] Unexpected error:', error);
    return NextResponse.json({ success: false, message: '予期せぬエラーが発生しました' }, { status: 500 });
  }
} 