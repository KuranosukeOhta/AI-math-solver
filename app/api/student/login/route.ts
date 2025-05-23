import { type NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';
import { validateStudentId } from '@/utils/supabase';

export async function POST(request: NextRequest) {
  console.log('[/api/student/login] POST request received');
  try {
    const body = await request.json();
    const { studentId, name } = body;
    console.log(`[/api/student/login] Request body: studentId=${studentId}, name=${name}`);

    // バリデーション
    if (!studentId || !name) {
      console.log('[/api/student/login] Validation failed: studentId or name is missing');
      return NextResponse.json({ success: false, message: '学番と名前を入力してください' }, { status: 400 });
    }

    if (!validateStudentId(studentId)) {
      console.log(`[/api/student/login] Validation failed: Invalid studentId format: ${studentId}`);
      return NextResponse.json({ success: false, message: '学番の形式が正しくありません（例: ab12345）' }, { status: 400 });
    }

    // 既存のユーザーをチェック
    console.log(`[/api/student/login] Checking if studentId ${studentId} exists`);
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id, name, student_id')
      .eq('student_id', studentId)
      .single();

    if (checkError) {
      if (checkError.code === 'PGRST116') { // 見つからない
        console.log(`[/api/student/login] User with studentId ${studentId} not found`);
        return NextResponse.json({ 
          success: false, 
          message: 'この学番は登録されていません' 
        }, { status: 404 });
      }
      console.log('[/api/student/login] Error checking existing user:', checkError);
      return NextResponse.json({ 
        success: false, 
        message: 'データベースエラーが発生しました' 
      }, { status: 500 });
    }

    // 名前の照合
    if (existingUser.name !== name) {
      console.log(`[/api/student/login] Name mismatch for studentId ${studentId}: expected ${existingUser.name}, got ${name}`);
      return NextResponse.json({ 
        success: false, 
        message: '学番と名前が一致しません' 
      }, { status: 401 });
    }

    console.log(`[/api/student/login] Login successful for user: ${existingUser.id}`);

    // cookieにuserIdを保存
    const response = NextResponse.json({ 
      success: true, 
      message: 'ログインが完了しました',
      userId: existingUser.id
    });
    
    response.cookies.set('userId', existingUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30日
    });

    return response;

  } catch (error) {
    console.error('[/api/student/login] Unexpected error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'サーバーエラーが発生しました' 
    }, { status: 500 });
  }
} 