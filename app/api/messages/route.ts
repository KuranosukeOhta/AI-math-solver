import { type NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

// メッセージ一覧を取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get('conversationId')
    
    if (!conversationId) {
      return NextResponse.json(
        { error: 'conversationId is required' }, 
        { status: 400 }
      )
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: {
        images: true
      },
      orderBy: { createdAt: 'asc' }
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error('メッセージ取得エラー:', error)
    return NextResponse.json(
      { error: 'メッセージの取得に失敗しました' }, 
      { status: 500 }
    )
  }
}

// メッセージの保存
export async function POST(request: NextRequest) {
  try {
    const { conversationId, role, content, images = [] } = await request.json()

    if (!conversationId || !role || !content) {
      return NextResponse.json(
        { error: '必要な情報が不足しています' }, 
        { status: 400 }
      )
    }

    // メッセージを作成
    const message = await prisma.message.create({
      data: {
        conversationId,
        role,
        content,
        images: {
          create: images.map((image: any) => ({
            filename: image.id || `img_${Date.now()}`,
            originalName: image.name || 'image',
            mimeType: image.type || 'image/jpeg',
            size: image.size || 0,
            base64Data: image.base64 || image.url,
            url: image.url
          }))
        }
      },
      include: {
        images: true
      }
    })

    // 会話の更新日時を更新
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() }
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error('メッセージ保存エラー:', error)
    return NextResponse.json(
      { error: 'メッセージの保存に失敗しました' }, 
      { status: 500 }
    )
  }
}
