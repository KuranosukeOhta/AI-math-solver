'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStudent } from '@/app/context/student-context'
import Chat from '@/app/components/chat'
import type { ChatItem, Feedbacktype } from '@/types/app'
import Toast from '@/app/components/base/toast'

export default function ChatPage() {
    const { isRegistered, studentId, name } = useStudent()
    const router = useRouter()
    const [chatList, setChatList] = useState<ChatItem[]>([])
    const [isResponding, setIsResponding] = useState(false)
    const { notify } = Toast

    // 未登録ユーザーはデバッグページにリダイレクト
    useEffect(() => {
        if (!isRegistered) {
            router.push('/debug')
        }
    }, [isRegistered, router])

    // メッセージ送信処理
    const handleSend = async (message: string, files: any[] = []) => {
        if (!message.trim()) return

        // ユーザーメッセージをリストに追加
        const userMessage: ChatItem = {
            id: `user-${Date.now()}`,
            content: message,
            isAnswer: false,
            message_files: files
        }

        // AIの応答プレースホルダー
        const aiResponsePlaceholder: ChatItem = {
            id: `ai-${Date.now()}`,
            content: '考え中...',
            isAnswer: true,
        }

        setChatList(prev => [...prev, userMessage, aiResponsePlaceholder])
        setIsResponding(true)

        try {
            // 実際のAI応答を取得する処理（ここではダミー応答）
            await new Promise(resolve => setTimeout(resolve, 1000))

            // AIの応答を更新
            setChatList(prev => {
                const newList = [...prev]
                const lastIndex = newList.length - 1
                newList[lastIndex] = {
                    ...newList[lastIndex],
                    content: `${message}についての回答です。数学の問題解決をお手伝いします。`
                }
                return newList
            })

            notify({ type: 'success', message: '回答を生成しました' })
        } catch (error) {
            console.error('AI応答の取得に失敗:', error)
            notify({ type: 'error', message: 'エラーが発生しました。もう一度お試しください。' })

            // エラー時は応答プレースホルダーを削除
            setChatList(prev => prev.filter(item => item.id !== aiResponsePlaceholder.id))
        } finally {
            setIsResponding(false)
        }
    }

    // フィードバック処理
    const handleFeedback = (messageId: string, feedback: Feedbacktype) => {
        setChatList(prev => prev.map(item =>
            item.id === messageId ? { ...item, feedback } : item
        ))
        notify({ type: 'success', message: 'フィードバックを送信しました' })
    }

    if (!isRegistered) {
        return <div className="p-4">認証中...</div>
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900">AI数学ソルバー</h1>
                    <div className="text-sm text-gray-500">
                        {name} ({studentId})
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <Chat
                        chatList={chatList}
                        onSend={handleSend}
                        onFeedback={handleFeedback}
                        isResponding={isResponding}
                        checkCanSend={() => true}
                    />
                </div>
            </main>
        </div>
    )
} 