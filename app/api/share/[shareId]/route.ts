import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

// シェアされた会話の取得
export async function GET(
  request: NextRequest,
  { params }: { params: { shareId: string } }
) {
  try {
    const shareId = params.shareId

    // シェア設定の確認
    const sharedConversation = await prisma.sharedConversation.findUnique({
      where: { shareId },
      include: {
        conversation: {
          include: {
            messages: {
              include: {
                images: true
              },
              orderBy: { createdAt: 'asc' }
            },
            user: {
              select: {
                name: true,
                profileImage: true
              }
            }
          }
        }
      }
    })

    if (!sharedConversation) {
      return NextResponse.json(
        { error: 'シェアされた会話が見つかりません' },
        { status: 404 }
      )
    }

    // 有効期限チェック
    if (sharedConversation.expiresAt && new Date() > sharedConversation.expiresAt) {
      return NextResponse.json(
        { error: 'この会話のシェアは期限切れです' },
        { status: 410 }
      )
    }

    // 公開設定チェック
    if (!sharedConversation.isPublic) {
      return NextResponse.json(
        { error: 'この会話は非公開に設定されています' },
        { status: 403 }
      )
    }

    // 閲覧回数を増加
    await prisma.sharedConversation.update({
      where: { shareId },
      data: {
        viewCount: {
          increment: 1
        }
      }
    })

    const response = {
      id: sharedConversation.conversation.id,
      title: sharedConversation.title,
      user: sharedConversation.conversation.user,
      messages: sharedConversation.conversation.messages.map(message => ({
        id: message.id,
        role: message.role,
        content: message.content,
        createdAt: message.createdAt,
        images: message.images.map(img => ({
          id: img.id,
          filename: img.filename,
          originalName: img.originalName,
          mimeType: img.mimeType,
          size: img.size,
          url: img.url || `data:${img.mimeType};base64,${img.base64Data}`
        }))
      })),
      sharedAt: sharedConversation.createdAt,
      viewCount: sharedConversation.viewCount + 1,
      expiresAt: sharedConversation.expiresAt
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('シェア会話取得エラー:', error)
    return NextResponse.json(
      { error: 'シェアされた会話の取得に失敗しました' },
      { status: 500 }
    )
  }
} 