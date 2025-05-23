import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

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
    const tokenUsage = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        studentId: true,
        tokenUsage: true,
        estimatedCost: true,
        createdAt: true
      },
      orderBy: {
        tokenUsage: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      data: tokenUsage
    });
  } catch (error) {
    console.error('トークン使用量集計エラー:', error);
    return NextResponse.json({ success: false, message: '予期せぬエラーが発生しました' }, { status: 500 });
  }
} 