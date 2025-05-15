import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare, hash } from 'bcrypt'
import { createUser, getUserByEmail, getUserSubscription, setTrialPeriod, hasUserUsedTrial } from '@/utils/supabase'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'メールアドレス', type: 'email' },
        password: { label: 'パスワード', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Supabaseからユーザー情報を取得
        const user = await getUserByEmail(credentials.email)

        if (!user) {
          // 新規ユーザーの場合は登録する
          const hashedPassword = await hash(credentials.password, 10)
          const newUser = await createUser(credentials.email, hashedPassword)
          
          if (!newUser) return null

          // 新規ユーザーにトライアル期間を設定
          const trial = await setTrialPeriod(newUser.id)
          
          return {
            id: newUser.id,
            email: newUser.email,
            subscriptionEnd: trial?.subscription_end || null
          }
        }

        // 既存ユーザーの場合はパスワードを検証
        const isPasswordValid = await compare(credentials.password, user.password)
        if (!isPasswordValid) {
          return null
        }

        // サブスクリプション情報を取得
        const subscription = await getUserSubscription(user.id)

        // サブスクリプションがなく、トライアルも使用していない場合は、トライアル期間を設定
        if (!subscription) {
          const hasUsedTrial = await hasUserUsedTrial(user.id)
          
          if (!hasUsedTrial) {
            const trial = await setTrialPeriod(user.id)
            return {
              id: user.id,
              email: user.email,
              subscriptionEnd: trial?.subscription_end || null
            }
          }
        }

        return {
          id: user.id,
          email: user.email,
          subscriptionEnd: subscription?.subscription_end || null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.subscriptionEnd = user.subscriptionEnd
      } else if (token.id) {
        // セッション中にサブスクリプション情報を更新する
        const subscription = await getUserSubscription(token.id as string)
        if (subscription) {
          token.subscriptionEnd = subscription.subscription_end
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.subscriptionEnd = token.subscriptionEnd as string | null
      }
      return session
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30日
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST } 