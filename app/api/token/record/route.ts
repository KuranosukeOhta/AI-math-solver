import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { inputTokens, outputTokens, cost } = await request.json()

    if (typeof inputTokens !== 'number' || typeof outputTokens !== 'number' || typeof cost !== 'number') {
      return NextResponse.json(
        { error: 'Invalid token data' },
        { status: 400 }
      )
    }

    // ユーザーのトークン使用量を更新
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        token_usage: {
          increment: inputTokens + outputTokens
        },
        estimated_cost: {
          increment: cost
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Token recording error:', error)
    return NextResponse.json(
      { error: 'Failed to record token usage' },
      { status: 500 }
    )
  }
} 