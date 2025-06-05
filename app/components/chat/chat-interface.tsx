'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar'
import MathRenderer from '@/app/components/ui/math-renderer'
import { PlusIcon, PaperclipIcon, SendIcon, MenuIcon, Bot, User, Sparkles, Brain } from 'lucide-react'
import { useSession, signIn } from 'next-auth/react'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    images?: Array<{
        id: string
        url: string
        name: string
    }>
    thinking?: string
}

interface Conversation {
    id: string
    title: string
    updatedAt: Date
    messages: Message[]
}

export default function ChatInterface() {
    const { data: session } = useSession()
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [isThinking, setIsThinking] = useState(false)
    const [thinkingContent, setThinkingContent] = useState('')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isThinking])

    useEffect(() => {
        if (session?.user?.id) {
            loadConversations()
        }
    }, [session])

    const loadConversations = async () => {
        try {
            const response = await fetch('/api/conversations')
            if (response.ok) {
                const data = await response.json()
                setConversations(data)
                if (data.length > 0 && !currentConversation) {
                    setCurrentConversation(data[0])
                    setMessages(data[0].messages || [])
                }
            }
        } catch (error) {
            console.error('Failed to load conversations:', error)
        }
    }

    const createNewConversation = async () => {
        if (!session?.user?.id) return

        try {
            const response = await fetch('/api/conversations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: session.user.id,
                    title: 'New Chat'
                })
            })

            if (response.ok) {
                const newConversation = await response.json()
                setConversations(prev => [newConversation, ...prev])
                setCurrentConversation(newConversation)
                setMessages([])
            }
        } catch (error) {
            console.error('Failed to create conversation:', error)
        }
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || [])
        setSelectedImages(prev => [...prev, ...files])
    }

    const removeImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() && selectedImages.length === 0) return
        if (!session?.user?.id) {
            signIn()
            return
        }

        const userMessage: Message = {
            id: `msg_${Date.now()}`,
            role: 'user',
            content: input,
            timestamp: new Date(),
            images: selectedImages.map((file, idx) => ({
                id: `img_${idx}`,
                url: URL.createObjectURL(file),
                name: file.name
            }))
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setSelectedImages([])
        setIsLoading(true)
        setIsThinking(false)
        setThinkingContent('')

        try {
            // 画像をbase64に変換
            const imagePromises = selectedImages.map(file => {
                return new Promise<string>((resolve) => {
                    const reader = new FileReader()
                    reader.onload = () => resolve(reader.result as string)
                    reader.readAsDataURL(file)
                })
            })

            const base64Images = await Promise.all(imagePromises)

            // メッセージ履歴の準備（現在のメッセージのみ画像を含める）
            const messageHistory = [...messages].map(msg => ({
                role: msg.role,
                content: msg.content
            }))

            // 現在のユーザーメッセージを追加（画像がある場合は含める）
            const currentMessage: any = {
                role: userMessage.role,
                content: userMessage.content
            }

            if (base64Images.length > 0) {
                currentMessage.images = base64Images.map(base64 => ({
                    type: 'image_url',
                    image_url: { url: base64 }
                }))
            }

            const messagesHistory = [...messageHistory, currentMessage]

            // OpenRouterでストリーミングチャット
            const response = await fetch('/api/chat-openrouter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: messagesHistory,
                    model: 'openai/o1-preview',
                    stream: true,
                    userId: session.user.id
                })
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error || `Chat request failed (${response.status})`)
            }

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            let assistantMessage = ''
            let messageId = ''

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break

                    const chunk = decoder.decode(value)
                    const lines = chunk.split('\n')

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            try {
                                const data = JSON.parse(line.slice(6))

                                if (data.event === 'agent_thought') {
                                    setIsThinking(true)
                                    setThinkingContent(data.data.thought)
                                } else if (data.event === 'message') {
                                    setIsThinking(false)
                                    messageId = data.data.id
                                    assistantMessage += data.data.answer

                                    setMessages(prev => {
                                        const filtered = prev.filter(m => m.id !== messageId)
                                        return [...filtered, {
                                            id: messageId,
                                            role: 'assistant',
                                            content: assistantMessage,
                                            timestamp: new Date()
                                        }]
                                    })
                                } else if (data.event === 'message_end') {
                                    setIsThinking(false)
                                    // メッセージをデータベースに保存
                                    await saveMessage(userMessage)
                                    if (assistantMessage) {
                                        await saveMessage({
                                            id: messageId,
                                            role: 'assistant',
                                            content: assistantMessage,
                                            timestamp: new Date()
                                        })
                                    }
                                }
                            } catch (parseError) {
                                console.log('Parsing error:', parseError)
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Chat error:', error)
        } finally {
            setIsLoading(false)
            setIsThinking(false)
        }
    }

    const saveMessage = async (message: Message) => {
        if (!currentConversation) return

        try {
            await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conversationId: currentConversation.id,
                    role: message.role,
                    content: message.content,
                    images: message.images || []
                })
            })
        } catch (error) {
            console.error('Failed to save message:', error)
        }
    }

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">AI Math Solver</h1>
                    <p className="text-gray-600 mb-6">数学問題を解決するAIアシスタント</p>
                    <Button onClick={() => signIn('google')}>
                        Googleでサインイン
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-gray-50">
                {/* サイドバー */}
                <Sidebar className="w-80">
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>
                                <Button
                                    onClick={createNewConversation}
                                    className="w-full"
                                    size="sm"
                                >
                                    <PlusIcon className="w-4 h-4 mr-2" />
                                    新しいチャット
                                </Button>
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {conversations.map((conv) => (
                                        <SidebarMenuItem key={conv.id}>
                                            <SidebarMenuButton
                                                onClick={() => {
                                                    setCurrentConversation(conv)
                                                    setMessages(conv.messages || [])
                                                }}
                                                isActive={currentConversation?.id === conv.id}
                                            >
                                                <span className="truncate">{conv.title}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                {/* メインチャットエリア */}
                <div className="flex-1 flex flex-col">
                    {/* ヘッダー */}
                    <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="sm" className="md:hidden">
                                        <MenuIcon className="w-5 h-5" />
                                    </Button>
                                </SheetTrigger>
                            </Sheet>
                            <div className="flex items-center space-x-2">
                                <Brain className="w-6 h-6 text-blue-600" />
                                <h1 className="text-xl font-semibold">AI Math Solver</h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Badge variant="outline">o1-preview</Badge>
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={session.user?.image || ''} />
                                <AvatarFallback>
                                    {session.user?.name?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    {/* メッセージエリア */}
                    <ScrollArea className="flex-1 px-6">
                        <div className="max-w-4xl mx-auto py-6 space-y-6">
                            {messages.length === 0 ? (
                                <div className="text-center py-12">
                                    <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                                    <h2 className="text-2xl font-semibold mb-2">数学の問題を解決しましょう</h2>
                                    <p className="text-gray-600">
                                        複雑な数式、微積分、線形代数など、どんな数学問題でもお任せください
                                    </p>
                                </div>
                            ) : (
                                messages.map((message) => (
                                    <div key={message.id} className="flex space-x-4">
                                        <Avatar className="w-8 h-8 mt-1">
                                            {message.role === 'user' ? (
                                                <>
                                                    <AvatarImage src={session.user?.image || ''} />
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
                                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                                {message.images && message.images.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {message.images.map((image) => (
                                                            <img
                                                                key={image.id}
                                                                src={image.url}
                                                                alt={image.name}
                                                                className="max-w-xs rounded-lg border"
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                                <MathRenderer content={message.content} />
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {message.timestamp.toLocaleTimeString()}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}

                            {/* 思考プロセス表示 */}
                            {isThinking && (
                                <div className="flex space-x-4">
                                    <Avatar className="w-8 h-8 mt-1">
                                        <AvatarFallback className="bg-blue-600 text-white">
                                            <Bot className="w-4 h-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Brain className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm font-medium text-blue-800">思考中...</span>
                                            </div>
                                            <div className="text-sm text-blue-700 whitespace-pre-wrap">
                                                {thinkingContent}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {isLoading && !isThinking && (
                                <div className="flex space-x-4">
                                    <Avatar className="w-8 h-8 mt-1">
                                        <AvatarFallback className="bg-blue-600 text-white">
                                            <Bot className="w-4 h-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="bg-white rounded-lg p-4 shadow-sm">
                                            <div className="flex items-center space-x-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                                <span className="text-sm text-gray-600">回答を生成中...</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>

                    {/* 入力エリア */}
                    <div className="bg-white border-t px-6 py-4">
                        <div className="max-w-4xl mx-auto">
                            <form onSubmit={handleSubmit}>
                                {selectedImages.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {selectedImages.map((file, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={file.name}
                                                    className="w-16 h-16 object-cover rounded border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="flex space-x-3">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <PaperclipIcon className="w-4 h-4" />
                                    </Button>
                                    <div className="flex-1">
                                        <Textarea
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="数学の問題を入力してください..."
                                            className="min-h-[60px] resize-none"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault()
                                                    handleSubmit(e)
                                                }
                                            }}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isLoading || (!input.trim() && selectedImages.length === 0)}
                                        className="px-6"
                                    >
                                        <SendIcon className="w-4 h-4" />
                                    </Button>
                                </div>
                            </form>
                            <div className="text-xs text-gray-500 mt-2 text-center">
                                Enter で送信、Shift + Enter で改行
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
} 