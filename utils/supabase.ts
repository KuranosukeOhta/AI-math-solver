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

// トライアル期間（分）
const TRIAL_MINUTES = 5

// サブスクリプション関連の関数
export const getUserSubscription = async (userId: string) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error('サブスクリプション取得エラー:', error)
    return null
  }

  return data
}

// トライアル期間を設定する関数
export const setTrialPeriod = async (userId: string) => {
  const now = new Date()
  const trialEnd = new Date(now.getTime() + TRIAL_MINUTES * 60 * 1000) // 現在時刻から5分後

  // トライアル情報を記録
  const { data: payment, error: paymentError } = await supabase
    .from('payments')
    .insert({
      user_id: userId,
      amount: 0, // 無料
      hours_added: TRIAL_MINUTES / 60, // 時間単位に変換（0.0833...時間）
      status: 'trial',
      stripe_id: null
    })
    .select()
    .single()

  if (paymentError) {
    console.error('トライアル支払い情報記録エラー:', paymentError)
    return null
  }

  // サブスクリプション情報を更新
  const { data: subscription, error: subError } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: userId,
      subscription_end: trialEnd.toISOString(),
      payment_id: payment.id,
      is_trial: true
    })
    .select()
    .single()

  if (subError) {
    console.error('トライアルサブスクリプション更新エラー:', subError)
    return null
  }

  return subscription
}

// ユーザーがトライアル済みかチェックする関数
export const hasUserUsedTrial = async (userId: string) => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'trial')
    .limit(1)
    
  if (error) {
    console.error('トライアル履歴チェックエラー:', error)
    return false
  }
  
  return data && data.length > 0
}

export const updateUserSubscription = async (
  userId: string,
  hours: number
) => {
  // 現在のサブスクリプション情報を取得
  const { data: currentSub } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const now = new Date()
  let subscriptionEnd: Date

  if (currentSub && new Date(currentSub.subscription_end) > now) {
    // 既存のサブスクリプションがある場合は期限を延長
    subscriptionEnd = new Date(new Date(currentSub.subscription_end).getTime() + hours * 60 * 60 * 1000)
  } else {
    // 新規または期限切れの場合は現在時刻から計算
    subscriptionEnd = new Date(now.getTime() + hours * 60 * 60 * 1000)
  }

  // 支払い情報を記録
  const { data: payment, error: paymentError } = await supabase
    .from('payments')
    .insert({
      user_id: userId,
      amount: parseInt(process.env.NEXT_PUBLIC_PRICE_PER_HOUR || '300') * hours,
      hours_added: hours,
      status: 'completed'
    })
    .select()
    .single()

  if (paymentError) {
    console.error('支払い情報記録エラー:', paymentError)
    return null
  }

  // サブスクリプション情報を更新
  const { data: subscription, error: subError } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: userId,
      subscription_end: subscriptionEnd.toISOString(),
      payment_id: payment.id,
      is_trial: false
    })
    .select()
    .single()

  if (subError) {
    console.error('サブスクリプション更新エラー:', subError)
    return null
  }

  return subscription
}

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