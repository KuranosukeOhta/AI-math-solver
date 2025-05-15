import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { updateUserSubscription } from '@/utils/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = headers().get('stripe-signature') as string

    let event: Stripe.Event
    
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error(`⚠️  Webhook signature verification failed: ${err.message}`)
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
    }

    // 支払い成功イベントを処理
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      
      // セッションからメタデータを取得
      const userId = session.metadata?.userId
      const hours = parseInt(session.metadata?.hours || '1')
      
      if (!userId) {
        console.error('Missing userId in session metadata')
        return NextResponse.json({ error: 'Missing userId in session metadata' }, { status: 400 })
      }

      // Supabaseでサブスクリプションを更新
      const subscription = await updateUserSubscription(userId, hours)
      
      if (!subscription) {
        console.error('サブスクリプション更新に失敗しました')
        return NextResponse.json({ error: 'サブスクリプション更新に失敗しました' }, { status: 500 })
      }

      console.log(`Subscription updated for user ${userId}, new end date: ${subscription.subscription_end}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
} 