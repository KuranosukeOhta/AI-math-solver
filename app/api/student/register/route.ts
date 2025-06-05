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

    console.log(`[/api/student/register] Processing registration for studentId: ${studentId}, name: ${name}`);

    if (!studentId || !name) {
      console.log(`[/api/student/register] Missing required fields: studentId=${studentId}, name=${name}`);
      return NextResponse.json({ 
        success: false, 
        message: '学番と名前を入力してください'
      }, { status: 400 });
    }

    // Check if student already exists using Prisma
    const existingUser = await prisma.user.findUnique({
      where: { studentId: studentId }
    });

    if (existingUser) {
      console.log(`[/api/student/register] Student ID ${studentId} already exists`);
      return NextResponse.json({
        success: false,
        message: 'この学番は既に登録されています'
      }, { status: 409 });
      }

    console.log(`[/api/student/register] Creating new student record...`);

    // Create new user using Prisma
    const newUser = await prisma.user.create({
      data: {
        studentId: studentId,
        name: name,
        email: `${studentId}@student.example.com`, // Dummy email since it's required
        password: 'dummy_password', // Dummy password since it's required
        tokenUsage: 0,
        estimatedCost: 0
      }
    });

    console.log(`[/api/student/register] User created successfully: ${newUser.id}`);

    const response = NextResponse.json({
      success: true,
      message: '登録が完了しました',
      data: {
        userId: newUser.id
      }
    });

    response.cookies.set('userId', newUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    return response;

  } catch (error) {
    console.error('[/api/student/register] Registration error:', error);
    return NextResponse.json({
      success: false,
      message: '登録処理中にエラーが発生しました。しばらくしてから再度お試しください。'
    }, { status: 500 });
  }
} 