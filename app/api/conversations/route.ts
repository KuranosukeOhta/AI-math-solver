import { type NextRequest, NextResponse } from 'next/server'
import { API_KEY, API_URL, APP_ID } from '@/config'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

// 会話一覧を取得するエンドポイント（Difyプロキシ）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'ユーザーIDが必要です' }, 
        { status: 400 }
      )
    }

    const conversations = await prisma.conversation.findMany({
      where: { user_id: userId },
      include: {
        messages: {
          orderBy: { created_at: 'asc' },
          include: {
            images: true
          }
        }
      },
      orderBy: { updated_at: 'desc' }
    })

    return NextResponse.json(conversations)
  } catch (error) {
    console.error('会話取得エラー:', error)
    return NextResponse.json(
      { error: '会話の取得に失敗しました' }, 
      { status: 500 }
    )
  }
}

// 新しい会話を作成するエンドポイント（名前の自動生成用）
export async function POST(request: NextRequest) {
  try {
    const { userId, title = "新しい会話" } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'ユーザーIDが必要です' }, 
        { status: 400 }
      )
    }

    const conversation = await prisma.conversation.create({
      data: {
        user_id: userId,
        title
      },
      include: {
        messages: {
          include: {
            images: true
          }
        }
      }
    })

    return NextResponse.json(conversation)
  } catch (error) {
    console.error('会話作成エラー:', error)
    return NextResponse.json(
      { error: '会話の作成に失敗しました' }, 
      { status: 500 }
    )
  }
}
