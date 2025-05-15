import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    subscriptionEnd?: Date | null
  }

  interface Session {
    user: {
      id: string
      email: string
      subscriptionEnd?: string | null
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    subscriptionEnd?: string | null
  }
} 