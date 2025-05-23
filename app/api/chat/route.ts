import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';
import OpenAI from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface FileAttachment {
  id?: string;
  type: string;
  transfer_method: string;
  url: string;
  upload_file_id: string;
  name?: string;
  size?: number;
  belongs_to?: string;
}

interface ChatRequest {
  query: string;
  conversation_id?: string;
  files?: FileAttachment[];
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { query, conversation_id, files } = body;

    console.log('[/api/chat] Request received:', { query, conversation_id, filesCount: files?.length });

    // ユーザー認証
    const userId = request.cookies.get('userId')?.value;
    if (!userId) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    // ユーザー情報を取得
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // ファイル情報を処理
    let fileContext = '';
    if (files && files.length > 0) {
      const fileDescriptions = files.map(file => {
        if (file.type === 'image') {
          return `画像ファイル: ${file.name || 'image'}`;
        } else if (file.type === 'document') {
          return `文書ファイル: ${file.name || 'document'} (${file.size ? Math.round(file.size / 1024) + 'KB' : 'サイズ不明'})`;
        }
        return `ファイル: ${file.name || 'file'}`;
      }).join(', ');
      
      fileContext = `\n\n[添付ファイル: ${fileDescriptions}]`;
    }

    // OpenAI APIに送信するメッセージを構築
    const messageContent = query + fileContext;

    // OpenAI APIを呼び出し
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "あなたは数学の問題解決を支援するAIアシスタントです。学生からの質問に対して、わかりやすく丁寧に答えてください。添付されたファイルがある場合は、その内容も考慮して回答してください。"
        },
        {
          role: "user",
          content: messageContent
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const assistantMessage = completion.choices[0]?.message?.content || '';
    const usage = completion.usage;

    console.log('[/api/chat] OpenAI response received:', {
      messageLength: assistantMessage.length,
      usage: usage
    });

    // トークン使用量を記録
    if (usage) {
      try {
        await prisma.tokenUsageLog.create({
          data: {
            userId: userId,
            inputTokens: usage.prompt_tokens,
            outputTokens: usage.completion_tokens,
            totalTokens: usage.total_tokens,
            modelName: 'gpt-4o-mini',
            cost: (usage.prompt_tokens * 0.00015 + usage.completion_tokens * 0.0006) / 1000, // GPT-4o-miniの価格
          }
        });

        // ユーザーの総使用量を更新
        await prisma.user.update({
          where: { id: userId },
          data: {
            tokenUsage: {
              increment: usage.total_tokens
            },
            estimatedCost: {
              increment: (usage.prompt_tokens * 0.00015 + usage.completion_tokens * 0.0006) / 1000
            }
          }
        });
      } catch (error) {
        console.error('[/api/chat] Error recording token usage:', error);
      }
    }

    // レスポンスを返す
    return NextResponse.json({
      success: true,
      message: assistantMessage,
      usage: usage,
      conversation_id: conversation_id || `conv_${Date.now()}`,
      message_id: `msg_${Date.now()}`,
    });

  } catch (error) {
    console.error('[/api/chat] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
} 