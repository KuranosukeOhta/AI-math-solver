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
      where: { conversation_id: conversationId },
      include: {
        images: true
      },
      orderBy: {
        created_at: 'asc'
      }
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
        { error: 'conversationId, role, content are required' },
        { status: 400 }
      )
    }

    // メッセージを作成
    const message = await prisma.message.create({
      data: {
        conversation_id: conversationId,
        role,
        content,
        images: {
          create: images.map((img: any) => ({
            filename: img.filename,
            original_name: img.originalName,
            mime_type: img.mimeType,
            size: img.size,
            base64_data: img.base64Data,
            url: img.url
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
      data: {
        updated_at: new Date()
      }
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error('メッセージ作成エラー:', error)
    return NextResponse.json(
      { error: 'メッセージの作成に失敗しました' }, 
      { status: 500 }
    )
  }
}
