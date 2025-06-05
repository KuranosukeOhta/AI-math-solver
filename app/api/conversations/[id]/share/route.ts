import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

// 会話をシェア用に公開
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conversationId = params.id
    const { title, expiresInDays } = await request.json()

    // 会話の存在確認（今は認証をスキップ）
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          include: {
            images: true
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    })

    if (!conversation) {
      return NextResponse.json(
        { error: '会話が見つかりません' },
        { status: 404 }
      )
    }

    // 有効期限の計算
    let expiresAt = null
    if (expiresInDays && expiresInDays > 0) {
      expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + expiresInDays)
    }

    // シェア用レコードの作成
    const sharedConversation = await prisma.sharedConversation.create({
      data: {
        conversationId,
        title: title || conversation.title,
        isPublic: true,
        expiresAt,
        viewCount: 0
      }
    })

    return NextResponse.json({
      shareId: sharedConversation.shareId,
      shareUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/share/${sharedConversation.shareId}`,
      expiresAt: sharedConversation.expiresAt
    })
  } catch (error) {
    console.error('シェア作成エラー:', error)
    return NextResponse.json(
      { error: 'シェアの作成に失敗しました' },
      { status: 500 }
    )
  }
}

// シェア設定の取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conversationId = params.id

    const sharedConversation = await prisma.sharedConversation.findFirst({
      where: { conversationId },
      orderBy: { createdAt: 'desc' }
    })

    if (!sharedConversation) {
      return NextResponse.json({ shared: false })
    }

    return NextResponse.json({
      shared: true,
      shareId: sharedConversation.shareId,
      shareUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/share/${sharedConversation.shareId}`,
      isPublic: sharedConversation.isPublic,
      expiresAt: sharedConversation.expiresAt,
      viewCount: sharedConversation.viewCount
    })
  } catch (error) {
    console.error('シェア設定取得エラー:', error)
    return NextResponse.json(
      { error: 'シェア設定の取得に失敗しました' },
      { status: 500 }
    )
  }
}

// シェア設定の削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conversationId = params.id

    await prisma.sharedConversation.deleteMany({
      where: { conversationId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('シェア削除エラー:', error)
    return NextResponse.json(
      { error: 'シェアの削除に失敗しました' },
      { status: 500 }
    )
  }
} 