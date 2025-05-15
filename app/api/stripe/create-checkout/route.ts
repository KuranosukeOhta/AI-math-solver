import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getServerSession } from 'next-auth'
import { getUserByEmail } from '@/utils/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'ログインが必要です' }, { status: 401 })
    }

    const body = await request.json()
    const { hours } = body

    if (!hours || hours <= 0) {
      return NextResponse.json({ error: '無効な時間数です' }, { status: 400 })
    }

    // 1時間あたりの料金（円）
    const pricePerHour = parseInt(process.env.NEXT_PUBLIC_PRICE_PER_HOUR || '300')
    const amount = pricePerHour * hours

    // ユーザー情報を取得
    const user = await getUserByEmail(session.user.email)

    if (!user) {
      return NextResponse.json({ error: 'ユーザーが見つかりません' }, { status: 404 })
    }

    // Stripeチェックアウトセッションを作成
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: `AI数学ソルバー ${hours}時間利用権`,
              description: `${hours}時間分のAI数学ソルバーの利用権です`
            },
            unit_amount: pricePerHour,
          },
          quantity: hours,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/payment/cancel`,
      metadata: {
        userId: user.id,
        hours: hours.toString(),
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: '決済処理中にエラーが発生しました' }, { status: 500 })
  }
} 