import { createClient } from '@supabase/supabase-js'
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 環境変数が設定されているか確認
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase環境変数が設定されていません。NEXT_PUBLIC_SUPABASE_URLとNEXT_PUBLIC_SUPABASE_ANON_KEYを.envファイルに設定してください。')
}

console.log('Supabase URL:', supabaseUrl ? supabaseUrl.substring(0, 10) + '...' : 'Not set')
console.log('Supabase Key Length:', supabaseKey ? supabaseKey.length : 0)

export const supabase = createClient(supabaseUrl || '', supabaseKey || '')

// o4-mini料金設定（1M tokensあたりの価格、単位: USD）
// o4-mini-2025-04-16の価格を使用
const O4_MINI_PRICE = {
  INPUT: 1.10,   // $1.10 per 1M tokens
  OUTPUT: 4.40   // $4.40 per 1M tokens
}

/**
 * 学番の形式をバリデーションする関数
 * 形式: 2文字のアルファベット + 5桁の数字（例: ab12345）
 */
export const validateStudentId = (studentId: string): boolean => {
  const regex = /^[a-zA-Z]{2}\d{5}$/;
  return regex.test(studentId);
}

/**
 * トークン使用量を記録する関数
 */
export const recordTokenUsage = async (userId: string, inputTokens: number, outputTokens: number, model: string) => {
  try {
    // トークン使用量をテーブルに記録
    const totalTokens = inputTokens + outputTokens;
    const totalCost = ((inputTokens / 1000000) * O4_MINI_PRICE.INPUT) + ((outputTokens / 1000000) * O4_MINI_PRICE.OUTPUT);

    await prisma.tokenUsageLog.create({
      data: {
        userId: userId,
        inputTokens: inputTokens,
        outputTokens: outputTokens,
        totalTokens: totalTokens,
        modelName: model,
        cost: totalCost
      }
    });

    // ユーザーの総トークン使用量とコストを更新
    await prisma.user.update({
      where: { id: userId },
      data: {
        tokenUsage: {
          increment: totalTokens
        },
        estimatedCost: {
          increment: totalCost
        }
      }
    });

    return true;
  } catch (error) {
    console.error('トークン使用量記録中のエラー:', error);
    return false;
  }
}

/**
 * ユーザーIDからユーザー情報を取得する関数
 */
export const getUserById = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    return user;
  } catch (error) {
    console.error('ユーザー取得中のエラー:', error);
    return null;
  }
}

// 学生IDを更新する関数
export const updateStudentId = async (userId: string, studentId: string, name: string) => {
  try {
    // 学生IDが既に使用されているか確認
    const existingUser = await prisma.user.findFirst({
      where: {
        studentId: studentId,
        NOT: {
          id: userId
        }
      }
    });
    
    if (existingUser) {
      return { success: false, message: 'この学生IDは既に使用されています' };
  }

    // 学生IDと名前を更新
    await prisma.user.update({
      where: { id: userId },
      data: {
        studentId: studentId,
        name: name
      }
    });
    
    return { success: true, message: '学生情報が正常に登録されました' };
  } catch (err) {
    console.error('学生ID更新中にエラーが発生しました:', err);
    return { success: false, message: '予期せぬエラーが発生しました' };
  }
};

// ユーザー関連の関数
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    return user;
  } catch (err) {
    console.error('ユーザー取得中に例外が発生しました:', err)
    return null
  }
}

export const createUser = async (email: string, hashedPassword: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword
      }
    });

    return user;
  } catch (err) {
    console.error('ユーザー作成中に例外が発生しました:', err)
    return null
  }
} 