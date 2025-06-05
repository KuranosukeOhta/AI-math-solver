import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

interface ApiResponse {
  success: boolean;
  message: string;
  data?: {
    userId: string;
  };
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const { studentId, name } = await request.json();

    console.log(`[/api/student/login] Processing login for studentId: ${studentId}, name: ${name}`);

    if (!studentId || !name) {
      console.log(`[/api/student/login] Missing required fields: studentId=${studentId}, name=${name}`);
      return NextResponse.json({
        success: false,
        message: '学番と名前を入力してください'
      }, { status: 400 });
    }

    // Find user by student ID
    const existingUser = await prisma.user.findUnique({
      where: { student_id: studentId }
    });

    if (!existingUser) {
      console.log(`[/api/student/login] Student not found: ${studentId}`);
      return NextResponse.json({
        success: false,
        message: 'この学番は登録されていません。まず登録を行ってください。'
      }, { status: 404 });
    }

    // Check if name matches
    if (existingUser.name !== name) {
      console.log(`[/api/student/login] Name mismatch for studentId ${studentId}: expected ${existingUser.name}, got ${name}`);
      return NextResponse.json({
        success: false,
        message: '学番または名前が正しくありません。登録時の情報と一致するか確認してください。'
      }, { status: 401 });
    }

    console.log(`[/api/student/login] Login successful for studentId: ${studentId}`);

    const response = NextResponse.json({
      success: true,
      message: 'ログインが完了しました',
      data: {
        userId: existingUser.id
      }
    });

    response.cookies.set('userId', existingUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    return response;

  } catch (error) {
    console.error('[/api/student/login] Login error:', error);
    return NextResponse.json({
      success: false,
      message: 'ログイン処理中にエラーが発生しました。しばらくしてから再度お試しください。'
    }, { status: 500 });
  }
} 