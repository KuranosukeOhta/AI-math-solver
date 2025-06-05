import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

// o4-mini料金設定（1M tokensあたりの価格、単位: USD）
const O4_MINI_PRICE = {
  INPUT: 1.10,   // $1.10 per 1M tokens
  OUTPUT: 0.275  // $0.275 per 1M tokens
}

// 管理者APIのトークン使用状況取得
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    // 最新のトークン使用ログを取得
    const tokenLogs = await prisma.tokenUsageLog.findMany({
      orderBy: {
        created_at: 'desc'
      },
      take: limit,
      skip: offset,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    })

    // 全体統計
    const totalStats = await prisma.tokenUsageLog.aggregate({
      _sum: {
        input_tokens: true,
        output_tokens: true,
        total_tokens: true,
        cost: true
      },
      _count: {
        id: true
      }
    })

    // ユーザー別統計（上位10名）
    const userStats = await prisma.user.findMany({
      orderBy: {
        token_usage: 'desc'
      },
      take: 10,
      select: {
        id: true,
        email: true,
        name: true,
        token_usage: true,
        estimated_cost: true
      }
    })

    // モデル別統計
    const modelStats = await prisma.tokenUsageLog.groupBy({
      by: ['model_name'],
      _sum: {
        input_tokens: true,
        output_tokens: true,
        total_tokens: true,
        cost: true
      },
      _count: {
        id: true
      },
      orderBy: {
        _sum: {
          total_tokens: 'desc'
        }
      }
    })

    return NextResponse.json({
      logs: tokenLogs,
      stats: {
        total: {
          totalRequests: totalStats._count.id || 0,
          totalInputTokens: totalStats._sum.input_tokens || 0,
          totalOutputTokens: totalStats._sum.output_tokens || 0,
          totalTokens: totalStats._sum.total_tokens || 0,
          totalCost: totalStats._sum.cost || 0
        },
        topUsers: userStats,
        modelUsage: modelStats.map(stat => ({
          model: stat.model_name,
          requests: stat._count.id,
          inputTokens: stat._sum.input_tokens || 0,
          outputTokens: stat._sum.output_tokens || 0,
          totalTokens: stat._sum.total_tokens || 0,
          cost: stat._sum.cost || 0
        }))
      },
      pricing: {
        model: 'openai/o4-mini',
        description: 'o4-mini思考モデル（o1,o3,o4シリーズの最新版）',
        inputPrice: O4_MINI_PRICE.INPUT,
        outputPrice: O4_MINI_PRICE.OUTPUT,
        unit: 'per 1M tokens (USD)'
      },
      pagination: {
        limit,
        offset,
        hasMore: tokenLogs.length === limit
      }
    })

  } catch (error) {
    console.error('Token usage fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch token usage' },
      { status: 500 }
    )
  }
} 