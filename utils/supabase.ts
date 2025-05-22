import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 環境変数が設定されているか確認
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase環境変数が設定されていません。NEXT_PUBLIC_SUPABASE_URLとNEXT_PUBLIC_SUPABASE_ANON_KEYを.envファイルに設定してください。')
}

console.log('Supabase URL:', supabaseUrl ? supabaseUrl.substring(0, 10) + '...' : 'Not set')
console.log('Supabase Key Length:', supabaseKey ? supabaseKey.length : 0)

export const supabase = createClient(supabaseUrl || '', supabaseKey || '')

// OpenAI APIの料金（1000トークンあたりの価格、単位: USD）
// 2024年8月時点の情報。変更された場合は更新が必要
const TOKEN_PRICE = {
  INPUT: 0.5 / 1000,  // $0.5 per 1M tokens for input
  OUTPUT: 1.5 / 1000,  // $1.5 per 1M tokens for output
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
    const { error: logError } = await supabase
      .from('token_usage_logs')
      .insert({
        user_id: userId,
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        model: model,
      });

    if (logError) {
      console.error('トークン使用量ログ記録エラー:', logError);
      return false;
    }

    // ユーザーの総トークン使用量とコストをRPCでアトミックに更新
    const totalTokens = inputTokens + outputTokens;
    const totalCost = (inputTokens * TOKEN_PRICE.INPUT) + (outputTokens * TOKEN_PRICE.OUTPUT);

    const { error: rpcError } = await supabase.rpc('increment_token_usage_and_cost', {
      user_id_input: userId,
      token_amount: totalTokens,
      cost_amount: totalCost,
    });

    if (rpcError) {
      console.error('ユーザーのトークン使用量・コスト更新エラー (RPC):', rpcError);
      return false;
    }

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
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('ユーザー取得エラー:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('ユーザー取得中のエラー:', error);
    return null;
  }
}

// 学生IDを更新する関数
export const updateStudentId = async (userId: string, studentId: string, name: string) => {
  try {
    // 学生IDが既に使用されているか確認
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('student_id', studentId)
      .not('id', 'eq', userId)
      .maybeSingle();
    
    if (checkError) {
      console.error('学生ID重複チェックエラー:', checkError);
      return { success: false, message: 'データベースエラーが発生しました' };
    }
    
    if (existingUser) {
      return { success: false, message: 'この学生IDは既に使用されています' };
  }

    // 学生IDと名前を更新
    const { error: updateError } = await supabase
      .from('users')
      .update({
        student_id: studentId,
        name: name
    })
      .eq('id', userId);

    if (updateError) {
      console.error('ユーザー情報更新エラー:', updateError);
      return { success: false, message: 'ユーザー情報の更新に失敗しました' };
    }
    
    return { success: true, message: '学生情報が正常に登録されました' };
  } catch (err) {
    console.error('学生ID更新中にエラーが発生しました:', err);
    return { success: false, message: '予期せぬエラーが発生しました' };
  }
};

// ユーザー関連の関数
export const getUserByEmail = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error) {
      console.error('ユーザー取得エラー:', error)
      if (error.code === 'PGRST116') {
        // レコードが見つからない場合は正常にnullを返す
        return null
      }
      throw new Error(`ユーザー取得エラー: ${error.message}`)
    }

    return data
  } catch (err) {
    console.error('ユーザー取得中に例外が発生しました:', err)
    return null
  }
}

export const createUser = async (email: string, hashedPassword: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert({
        email,
        password: hashedPassword
      })
      .select()
      .single()

    if (error) {
      console.error('ユーザー作成エラー:', error)
      throw new Error(`ユーザー作成エラー: ${error.message}`)
    }

    return data
  } catch (err) {
    console.error('ユーザー作成中に例外が発生しました:', err)
    return null
  }
} 