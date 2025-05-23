import { NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  console.log('[/api/student/test-connection] GET request received');
  
  try {
    // Prismaへの接続をテスト
    const userCount = await prisma.user.count();
    
    // 環境変数情報（機密情報は伏せる）
    const envInfo = {
      DATABASE_URL: process.env.DATABASE_URL ? '設定済み' : '未設定',
      NODE_ENV: process.env.NODE_ENV
    };
    
    return NextResponse.json({
      success: true,
      message: 'データベース接続成功',
      env: envInfo,
      userCount: userCount
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