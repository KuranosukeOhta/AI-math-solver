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
        message: 'Student ID and name are required'
      }, { status: 400 });
    }

    // Find user using Prisma
    const existingUser = await prisma.user.findUnique({
      where: { studentId: studentId }
    });

    if (!existingUser) {
      console.log(`[/api/student/login] Student not found: ${studentId}`);
      return NextResponse.json({
        success: false,
        message: 'Student not found'
      }, { status: 404 });
    }

    // Validate name
    if (existingUser.name !== name) {
      console.log(`[/api/student/login] Name mismatch for studentId ${studentId}: expected ${existingUser.name}, got ${name}`);
      return NextResponse.json({
        success: false,
        message: 'Invalid student ID or name'
      }, { status: 401 });
    }

    console.log(`[/api/student/login] Login successful for user: ${existingUser.id}`);

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
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
      message: 'Login failed'
    }, { status: 500 });
  }
} 