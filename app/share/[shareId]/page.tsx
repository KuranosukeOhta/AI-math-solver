'use client'

import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import MathRenderer from '@/app/components/ui/math-renderer'
import { Bot, User, Share2, Clock, Eye, Download, ArrowLeft, Brain } from 'lucide-react'
import Link from 'next/link'

interface SharedMessage {
    id: string
    role: 'user' | 'assistant'
    content: string
    createdAt: string
    images: Array<{
        id: string
        filename: string
        originalName?: string
        mimeType: string
        size: number
        url: string
    }>
}

interface SharedConversation {
    id: string
    title: string
    user: {
        name?: string
        profileImage?: string
    }
    messages: SharedMessage[]
    sharedAt: string
    viewCount: number
    expiresAt?: string
}

export default function SharedConversationPage({
    params
}: {
    params: { shareId: string }
}) {
    const [conversation, setConversation] = useState<SharedConversation | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSharedConversation = async () => {
            try {
                const response = await fetch(`/api/share/${params.shareId}`)

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.error || 'Failed to fetch conversation')
                }

                const data = await response.json()
                setConversation(data)
            } catch (error) {
                console.error('Failed to fetch shared conversation:', error)
                setError(error instanceof Error ? error.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        }

        fetchSharedConversation()
    }, [params.shareId])

    const generatePDF = async () => {
        // PDFエクスポート機能（今後実装予定）
        alert('PDF エクスポート機能は近日実装予定です')
    }

    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.href)
        alert('URLをコピーしました！')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">読み込み中...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle className="text-red-600">エラー</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <Link href="/">
                            <Button variant="outline" className="w-full">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                ホームに戻る
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!conversation) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* ヘッダー */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Brain className="w-6 h-6 text-blue-600" />
                            <div>
                                <h1 className="text-xl font-semibold">{conversation.title}</h1>
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <span>shared by {conversation.user.name || 'Anonymous'}</span>
                                    <Badge variant="outline">
                                        <Eye className="w-3 h-3 mr-1" />
                                        {conversation.viewCount} views
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={copyUrl}>
                                <Share2 className="w-4 h-4 mr-2" />
                                URLをコピー
                            </Button>
                            <Button variant="outline" size="sm" onClick={generatePDF}>
                                <Download className="w-4 h-4 mr-2" />
                                PDF
                            </Button>
                        </div>
                    </div>

                    {conversation.expiresAt && (
                        <div className="mt-2 text-xs text-amber-600 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            期限: {new Date(conversation.expiresAt).toLocaleDateString('ja-JP')}
                        </div>
                    )}
                </div>
            </div>

            {/* メッセージエリア */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                <ScrollArea className="h-full">
                    <div className="space-y-6">
                        {conversation.messages.map((message) => (
                            <div key={message.id} className="flex space-x-4">
                                <Avatar className="w-8 h-8 mt-1">
                                    {message.role === 'user' ? (
                                        <>
                                            <AvatarImage src={conversation.user.profileImage || ''} />
                                            <AvatarFallback>
                                                <User className="w-4 h-4" />
                                            </AvatarFallback>
                                        </>
                                    ) : (
                                        <AvatarFallback className="bg-blue-600 text-white">
                                            <Bot className="w-4 h-4" />
                                        </AvatarFallback>
                                    )}
                                </Avatar>

                                <div className="flex-1">
                                    <div className="bg-white rounded-lg p-4 shadow-sm border">
                                        {/* 画像表示 */}
                                        {message.images && message.images.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {message.images.map((image) => (
                                                    <img
                                                        key={image.id}
                                                        src={image.url}
                                                        alt={image.originalName || image.filename}
                                                        className="max-w-xs rounded-lg border hover:scale-105 transition-transform cursor-pointer"
                                                        onClick={() => window.open(image.url, '_blank')}
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {/* メッセージ本文 */}
                                        <MathRenderer content={message.content} />
                                    </div>

                                    <div className="text-xs text-gray-500 mt-1">
                                        {new Date(message.createdAt).toLocaleString('ja-JP')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* フッター */}
            <div className="bg-white border-t mt-8">
                <div className="max-w-4xl mx-auto px-4 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                        <Brain className="w-4 h-4 text-blue-600" />
                        <span>Powered by AI Math Solver</span>
                        <span>•</span>
                        <span>Shared on {new Date(conversation.sharedAt).toLocaleDateString('ja-JP')}</span>
                    </div>
                    <Link href="/">
                        <Button variant="link" className="mt-2">
                            AI Math Solver を使ってみる
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
} 