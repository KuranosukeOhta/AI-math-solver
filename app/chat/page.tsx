'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useStudent } from '@/app/context/student-context'
import Chat from '@/app/components/chat'
import type { ChatItem, Feedbacktype, VisionFile, Resolution } from '@/types/app'
import { TransferMethod } from '@/types/app'
import Toast from '@/app/components/base/toast'
import { sendChatMessage, fetchChatList, updateFeedback } from '@/service'
import { v4 as uuidv4 } from 'uuid'
import { APP_ID, API_KEY, API_URL } from '@/config'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const ERROR_MESSAGES = {
    SERVER: 'サーバーエラーが発生しました。もう一度お試しください。'
}

export default function ChatPage() {
    const { isRegistered, studentId, name } = useStudent()
    const router = useRouter()
    const [chatList, setChatList] = useState<ChatItem[]>([])
    const [isResponding, setIsResponding] = useState(false)
    const { notify } = Toast
    const abortControllerRef = useRef<AbortController | null>(null)
    const [conversationId, setConversationId] = useState<string | null>(null)
    // ユーザーIDを保持
    const userIdRef = useRef<string>(`user_${APP_ID}:${uuidv4()}`)

    // 環境変数と設定の確認
    useEffect(() => {
        console.log("===== API設定確認 =====")
        console.log("APP_ID:", APP_ID ? `${APP_ID.substring(0, 5)}...` : "未設定")
        console.log("API_KEY:", API_KEY ? "設定済み" : "未設定")
        console.log("API_URL:", API_URL || "デフォルト")
        console.log("========================")
    }, [])

    // 未登録ユーザーはデバッグページにリダイレクト
    useEffect(() => {
        if (!isRegistered) {
            router.push('/debug')
        }
    }, [isRegistered, router])

    // 既存のチャット履歴を読み込む
    useEffect(() => {
        if (isRegistered && conversationId) {
            try {
                fetchChatList(conversationId)
                    .then((res: any) => {
                        if (res.data && Array.isArray(res.data)) {
                            const newChatList: ChatItem[] = []
                            res.data.forEach((item: any) => {
                                newChatList.push({
                                    id: `question-${item.id}`,
                                    content: item.query,
                                    isAnswer: false,
                                    message_files: item.message_files?.filter((file: any) => file.belongs_to === 'user') || [],
                                })
                                newChatList.push({
                                    id: item.id,
                                    content: item.answer,
                                    isAnswer: true,
                                    message_files: item.message_files?.filter((file: any) => file.belongs_to === 'assistant') || [],
                                })
                            })
                            setChatList(newChatList)
                        } else {
                            console.warn('チャット履歴が空か、予想外のフォーマットです')
                        }
                    })
                    .catch(err => {
                        console.error('チャット履歴の取得に失敗:', err)
                    })
            } catch (error) {
                console.error('チャット履歴を取得できませんでした:', error)
            }
        }
    }, [isRegistered, conversationId])

    // メッセージ送信処理
    const handleSend = async (message: string, files: VisionFile[] = []) => {
        if (!message.trim()) return

        // ユーザーメッセージをリストに追加
        const userMessageId = `user-${uuidv4()}`
        const userMessage: ChatItem = {
            id: userMessageId,
            content: message,
            isAnswer: false,
            message_files: files
        }

        setChatList(prev => [...prev, userMessage])
        setIsResponding(true)

        try {
            // 常に同じユーザーIDを使用して会話の一貫性を確保
            const userId = userIdRef.current

            // APIデータの準備
            const data: Record<string, any> = {
                query: message,
                inputs: {}, // 空のinputsオブジェクトを必ず含める
                conversation_id: conversationId,
                user: userId,
                response_mode: 'streaming' // responseMode値を明示的に設定
            }

            if (files && files.length > 0) {
                data.files = files
            }

            console.log("送信データ:", data)

            // 応答用のプレースホルダー
            const placeholderId = `placeholder-${Date.now()}`
            const placeholderItem: ChatItem = {
                id: placeholderId,
                content: '',
                isAnswer: true,
            }

            setChatList(prev => [...prev, placeholderItem])

            // 応答用のアイテム
            const responseItem: ChatItem = {
                id: `${Date.now()}`,
                content: '',
                isAnswer: true,
                message_files: [],
            }

            let hasSetResponseId = false
            let newConversationId = conversationId

            // APIを呼び出し
            await sendChatMessage(data, {
                getAbortController: (controller) => {
                    abortControllerRef.current = controller
                },
                onData: (message: string, isFirstMessage: boolean, { conversationId: newId, messageId }: any) => {
                    console.log("受信データ:", { message: message.substring(0, 20), isFirstMessage, newId, messageId })

                    responseItem.content = responseItem.content + message

                    if (messageId && !hasSetResponseId) {
                        responseItem.id = messageId
                        hasSetResponseId = true
                    }

                    if (isFirstMessage && newId && !newConversationId) {
                        newConversationId = newId
                        setConversationId(newId)
                    }

                    // 応答を更新
                    setChatList(prev => {
                        return prev.map(item =>
                            item.id === placeholderId ? responseItem : item
                        )
                    })
                },
                onMessageEnd: (messageEnd) => {
                    console.log("メッセージ終了:", messageEnd)
                },
                onCompleted: (hasError?: boolean) => {
                    console.log("応答完了:", { hasError })

                    // エラーがなければレスポンスを確定
                    if (!hasError) {
                        setChatList(prev => {
                            // プレースホルダーを最終レスポンスで置き換える
                            return prev.map(item =>
                                item.id === placeholderId ? responseItem : item
                            )
                        })
                    } else {
                        // エラーの場合、プレースホルダーを削除
                        setChatList(prev => prev.filter(item => item.id !== placeholderId))
                        notify({ type: 'error', message: 'AIからの応答中にエラーが発生しました' })
                    }

                    setIsResponding(false)
                },
                onError: () => {
                    console.error("API呼び出しエラー発生")
                    setChatList(prev => prev.filter(item => item.id !== placeholderId))
                    setIsResponding(false)
                    notify({ type: 'error', message: ERROR_MESSAGES.SERVER })
                },
                onThought: (thought) => {
                    console.log("思考過程:", thought)
                    return true
                },
                onFile: (file) => {
                    console.log("ファイル:", file)
                },
                onWorkflowStarted: ({ workflow_run_id, task_id }) => {
                    console.log("ワークフロー開始:", { workflow_run_id, task_id })
                },
                onWorkflowFinished: ({ data }) => {
                    console.log("ワークフロー完了:", data)
                },
                onTextChunk: (text) => {
                    console.log("テキストチャンク:", text.substring(0, 20))
                },
                onTextReplace: (text) => {
                    console.log("テキスト置換:", text.substring(0, 20))
                }
            })
        } catch (error) {
            console.error('メッセージ送信エラー:', error)
            setIsResponding(false)
            notify({ type: 'error', message: ERROR_MESSAGES.SERVER })
        }
    }

    // フィードバック処理
    const handleFeedback = async (messageId: string, feedback: Feedbacktype) => {
        try {
            await updateFeedback({ messageId, rating: feedback.rating })
            setChatList(prev =>
                prev.map(item =>
                    item.id === messageId
                        ? { ...item, feedback }
                        : item
                )
            )
        } catch (error) {
            console.error('フィードバックエラー:', error)
        }
    }

    // 送信可能かチェック
    const checkCanSend = () => {
        return isRegistered && !isResponding
    }

    if (!isRegistered) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Skeleton className="h-8 w-48 mb-4" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen bg-background">
            {/* ヘッダー */}
            <header className="flex-shrink-0 bg-background/95 backdrop-blur-sm border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <h1 className="text-lg font-semibold text-primary">AI Math Solver</h1>
                        </div>
                        {name && (
                            <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                        <User className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-muted-foreground">{name}</span>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* メインコンテンツエリア - フレックスで高さを調整 */}
            <div className="flex-1 flex flex-col min-h-0">
                <Chat
                    chatList={chatList}
                    onSend={handleSend}
                    isResponding={isResponding}
                    onFeedback={handleFeedback}
                    checkCanSend={checkCanSend}
                    abortController={abortControllerRef.current}
                    files={[]}
                    onFilesChange={() => { }}
                    supportAgent
                    visionConfig={{
                        enabled: true,
                        details: 'auto',
                        number_limits: 1,
                        transfer_methods: [TransferMethod.remote_url]
                    }}
                    speechToTextConfig={{
                        enabled: false
                    }}
                    chatContainerClassName="flex-1 min-h-0"
                    chatFooterClassName="flex-shrink-0 border-t bg-background/50 backdrop-blur"
                    chatFooterInnerClassName="container mx-auto px-4 py-4"
                />
            </div>
        </div>
    )
} 