import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

// 特定の会話の取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conversationId = params.id

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          include: {
            images: true
          },
          orderBy: {
            created_at: 'asc'
          }
        }
      }
    })

    if (!conversation) {
      return NextResponse.json(
        { error: '会話が見つかりません' },
        { status: 404 }
      )
    }

    return NextResponse.json({ conversation })
  } catch (error) {
    console.error('会話取得エラー:', error)
    return NextResponse.json(
      { error: '会話の取得に失敗しました' },
      { status: 500 }
    )
  }
}

// 会話のタイトル更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conversationId = params.id
    const { title } = await request.json()

    if (!title) {
      return NextResponse.json(
        { error: 'タイトルが必要です' },
        { status: 400 }
      )
    }

    const conversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        title,
        updated_at: new Date()
      }
    })

    return NextResponse.json({ conversation })
  } catch (error) {
    console.error('会話更新エラー:', error)
    return NextResponse.json(
      { error: '会話の更新に失敗しました' },
      { status: 500 }
    )
  }
}

// 会話の削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conversationId = params.id

    await prisma.conversation.delete({
      where: { id: conversationId }
    })

    return NextResponse.json({ message: '会話が削除されました' })
  } catch (error) {
    console.error('会話削除エラー:', error)
    return NextResponse.json(
      { error: '会話の削除に失敗しました' },
      { status: 500 }
    )
  }
} 