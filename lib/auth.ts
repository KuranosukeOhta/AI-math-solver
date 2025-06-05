import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        
        // データベースから最新のユーザー情報を取得
        const existingUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            email: true,
            name: true,
            student_id: true,
            token_usage: true,
            estimated_cost: true,
            google_id: true,
            profile_image: true,
          }
        });

        if (existingUser) {
          session.user.student_id = existingUser.student_id
          session.user.token_usage = existingUser.token_usage
          session.user.estimated_cost = existingUser.estimated_cost
        }
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Google OAuth情報を更新
          await prisma.user.upsert({
            where: { email: user.email! },
            create: {
              email: user.email!,
              name: user.name || '',
              password: 'oauth', // OAuth用のダミーパスワード
              google_id: profile?.sub,
              profile_image: user.image,
            },
            update: {
              name: user.name || undefined,
              google_id: profile?.sub,
              profile_image: user.image,
            },
          });
          return true;
        } catch (error) {
          console.error('Google OAuth user update error:', error);
          return false;
        }
      }
      return true;
    },
  },
  session: {
    strategy: 'database',
  },
}

export default NextAuth(authOptions) 