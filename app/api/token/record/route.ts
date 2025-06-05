import { type NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'
import { cookies } from 'next/headers'

// o4-mini料金設定（1M tokensあたりの価格、単位: USD）
// o4-mini-2025-04-16の価格を使用
const O4_MINI_PRICE = {
  INPUT: 1.10,   // $1.10 per 1M tokens
  OUTPUT: 4.40   // $4.40 per 1M tokens
};

// トークンの価格を計算する関数
function calculateCost(inputTokens: number, outputTokens: number): number {
  // 入力トークンと出力トークンの価格を計算
  const inputCost = (inputTokens / 1000000) * O4_MINI_PRICE.INPUT;
  const outputCost = (outputTokens / 1000000) * O4_MINI_PRICE.OUTPUT;
  
  // 合計コスト（USD）
  const totalCost = inputCost + outputCost;
  
  // 詳細なログ出力
  console.log('[TOKEN COST] === o4-mini費用計算詳細 ===');
  console.log(`[TOKEN COST] 入力トークン: ${inputTokens} tokens`);
  console.log(`[TOKEN COST] 出力トークン: ${outputTokens} tokens`);
  console.log(`[TOKEN COST] 総トークン: ${inputTokens + outputTokens} tokens`);
  console.log(`[TOKEN COST] 入力トークン費用: $${inputCost.toFixed(8)} (${inputTokens} tokens × $${O4_MINI_PRICE.INPUT}/1M tokens)`);
  console.log(`[TOKEN COST] 出力トークン費用: $${outputCost.toFixed(8)} (${outputTokens} tokens × $${O4_MINI_PRICE.OUTPUT}/1M tokens)`);
  console.log(`[TOKEN COST] 総費用: $${totalCost.toFixed(8)}`);
  console.log(`[TOKEN COST] 総費用（円換算）: ¥${(totalCost * 150).toFixed(4)} (1USD=150円換算)`);
  console.log('[TOKEN COST] === 計算終了 ===');
  
  return totalCost;
}

// 環境変数からデータベースURLを取得
const databaseUrl = process.env.DATABASE_URL;
console.log('[DATABASE] Using database URL from environment variable');

// PrismaClientのインスタンスを作成し、明示的にデータベースURLを設定
const prisma = new PrismaClient({
  datasourceUrl: databaseUrl
});

export async function POST(request: NextRequest) {
  try {
    // リクエストボディを取得
    const body = await request.json().catch(() => ({}))
    
    console.log('[DEBUG] Token usage record request:', body)
    
    // 必要なデータが含まれているか確認
    if (!body.inputTokens || !body.outputTokens) {
      console.log('[ERROR] Missing required token information:', { 
        inputTokens: body.inputTokens, 
        outputTokens: body.outputTokens 
      });
      return NextResponse.json(
        { error: true, message: 'Missing required token information' },
        { status: 400 }
      )
    }

    // ユーザーIDをクッキーから取得
    const userId = request.cookies.get('userId')?.value

    if (!userId) {
      console.log('[ERROR] User not authenticated - no userId cookie found');
      return NextResponse.json(
        { error: true, message: 'User not authenticated' },
        { status: 401 }
      )
    }

    console.log(`[DEBUG] Processing token record for user: ${userId}`);

    const inputTokens = Number(body.inputTokens)
    const outputTokens = Number(body.outputTokens)
    const totalTokens = inputTokens + outputTokens
    const modelName = 'o4-mini-2025-04-16' // モデルを固定
    const conversationId = body.conversationId || null
    
    // コストを計算（詳細ログ付き）
    const cost = calculateCost(inputTokens, outputTokens)

    console.log('[DEBUG] About to save token usage log:', {
      userId,
      inputTokens,
      outputTokens,
      totalTokens,
      modelName,
      cost,
      conversationId
    });

    // トークン使用ログをデータベースに記録
    await prisma.tokenUsageLog.create({
      data: {
        userId,
        inputTokens,
        outputTokens,
        totalTokens,
        modelName,
        cost,
        conversationId
      }
    })

    console.log('[SUCCESS] Token usage log saved successfully');

    // ユーザーの総トークン使用量と推定コストを更新
    await prisma.user.update({
      where: { id: userId },
      data: {
        tokenUsage: { increment: totalTokens },
        estimatedCost: { increment: cost }
      }
    })

    console.log(`[SUCCESS] User ${userId} total usage updated - added ${totalTokens} tokens, $${cost.toFixed(8)}`);
    
    // 成功レスポンスを返す
    return NextResponse.json({ 
      success: true, 
      message: 'Token usage recorded successfully',
      data: {
        inputTokens,
        outputTokens,
        totalTokens,
        cost,
        modelName
      }
    })
  } catch (error: unknown) {
    console.error('[ERROR] Error in token record:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to process token record request'
    return NextResponse.json(
      { 
        error: true, 
        message: errorMessage
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 