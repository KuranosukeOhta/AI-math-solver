import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // 管理者権限チェック（必要に応じて実装）
    // const isAdmin = await checkAdminPermission(session.user.id)
    // if (!isAdmin) {
    //   return NextResponse.json(
    //     { error: 'Admin access required' },
    //     { status: 403 }
    //   )
    // }

    // トークン使用量統計を取得
    const stats = await prisma.user.aggregate({
      _sum: {
        token_usage: true,
        estimated_cost: true
      },
      _count: {
        id: true
      },
      _avg: {
        token_usage: true,
        estimated_cost: true
      }
    })

    // 上位ユーザーの統計
    const topUsers = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        token_usage: true,
        estimated_cost: true
      },
      orderBy: {
        token_usage: 'desc'
      },
      take: 10
    })

    return NextResponse.json({
      summary: {
        totalUsers: stats._count.id,
        totalTokens: stats._sum.token_usage || 0,
        totalCost: stats._sum.estimated_cost || 0,
        avgTokensPerUser: stats._avg.token_usage || 0,
        avgCostPerUser: stats._avg.estimated_cost || 0
      },
      topUsers
    })
  } catch (error) {
    console.error('Admin token usage stats error:', error)
    return NextResponse.json(
      { error: 'Failed to get token usage statistics' },
      { status: 500 }
    )
  }
} 