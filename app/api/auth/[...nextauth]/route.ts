import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare, hash } from 'bcrypt'
import { createUser, getUserByEmail } from '@/utils/supabase'

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
          
          return {
            id: newUser.id,
            email: newUser.email,
            studentId: newUser.studentId
          }
        }

        // 既存ユーザーの場合はパスワードを検証
        const isPasswordValid = await compare(credentials.password, user.password)
        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          studentId: user.studentId
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.studentId = user.studentId
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.studentId = token.studentId as string | null
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