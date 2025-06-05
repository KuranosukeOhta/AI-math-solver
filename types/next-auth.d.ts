import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      student_id?: string | null
      token_usage?: number | null
      estimated_cost?: number | null
    }
  }
} 