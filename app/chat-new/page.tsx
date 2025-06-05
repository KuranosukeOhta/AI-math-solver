'use client'

import { SessionProvider } from 'next-auth/react'
import ChatInterface from '@/app/components/chat/chat-interface'

export default function NewChatPage() {
    return (
        <SessionProvider session={null}>
            <ChatInterface />
        </SessionProvider>
    )
} 