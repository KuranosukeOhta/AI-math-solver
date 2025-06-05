import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

// o4-mini料金設定（1M tokensあたりの価格、単位: USD）
const O4_MINI_PRICE = {
  INPUT: 1.10,   // $1.10 per 1M tokens
  OUTPUT: 0.275  // $0.275 per 1M tokens
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      console.log('No authenticated session found')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ユーザー情報を取得
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      console.log('User not found for email:', session.user.email)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    console.log('Token record request body:', JSON.stringify(body, null, 2))
    
    // フロントエンドから送信されるパラメータに対応
    const { 
      model = 'openai/o4-mini',
      conversationId,
      inputTokens = 0,
      outputTokens = 0,
      cost // フロントエンドから直接送信される場合
    } = body

    const totalTokens = inputTokens + outputTokens

    // costが送信されない場合は計算
    const calculatedCost = cost !== undefined ? cost : 
      ((inputTokens / 1000000) * O4_MINI_PRICE.INPUT) + ((outputTokens / 1000000) * O4_MINI_PRICE.OUTPUT)

    console.log('Recording token usage:', {
      userId: user.id,
      model,
      conversationId,
      inputTokens,
      outputTokens,
      totalTokens,
      cost: calculatedCost
    })

    // トークン使用ログの作成
    await prisma.tokenUsageLog.create({
      data: {
        user_id: user.id,
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        total_tokens: totalTokens,
        model_name: model,
        cost: calculatedCost,
        conversation_id: conversationId
      }
    })

    // ユーザーの累計使用量を更新
    await prisma.user.update({
      where: { id: user.id },
      data: {
        token_usage: {
          increment: totalTokens
        },
        estimated_cost: {
          increment: calculatedCost
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Token usage recorded successfully',
      data: {
        totalTokens,
        cost: calculatedCost,
        model
      }
    })

    } catch (error) {
    console.error('Token record error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
} 