'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

interface TokenUsageData {
    id: string
    name: string
    student_id: string
    token_usage: number
    estimated_cost: number
    created_at: string
}

// useSearchParamsを使用するコンポーネントを分離
function AdminContent() {
    const [tokenUsageData, setTokenUsageData] = useState<TokenUsageData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const searchParams = useSearchParams()
    const adminKey = searchParams.get('key')

    // この簡易的なキーで管理者ページへのアクセスを制限
    const ADMIN_KEY = 'admin123'

    useEffect(() => {
        if (adminKey !== ADMIN_KEY) {
            setError('アクセス権限がありません')
            setIsLoading(false)
            return
        }

        const fetchTokenUsage = async () => {
            try {
                const response = await fetch('/api/admin/token-usage')
                if (!response.ok) {
                    throw new Error('データの取得に失敗しました')
                }
                const data = await response.json()
                if (data.success) {
                    setTokenUsageData(data.data)
                } else {
                    throw new Error(data.message || 'データの取得に失敗しました')
                }
            } catch (err: any) {
                setError(err.message || 'データの取得中にエラーが発生しました')
            } finally {
                setIsLoading(false)
            }
        }

        fetchTokenUsage()
    }, [adminKey])

    // 合計値の計算
    const totalTokens = tokenUsageData.reduce((sum, item) => sum + item.token_usage, 0)
    const totalCost = tokenUsageData.reduce((sum, item) => sum + item.estimated_cost, 0)

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow">
                    <h1 className="text-2xl font-bold mb-6">トークン使用量ダッシュボード</h1>
                    <p>データを読み込んでいます...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow">
                    <h1 className="text-2xl font-bold mb-6">トークン使用量ダッシュボード</h1>
                    <div className="p-4 bg-red-50 text-red-700 rounded-md">
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6">トークン使用量ダッシュボード</h1>

                {/* 概要 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">ユーザー数</h2>
                        <p className="text-3xl font-bold">{tokenUsageData.length}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">総トークン数</h2>
                        <p className="text-3xl font-bold">{totalTokens.toLocaleString()}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">総コスト（USD）</h2>
                        <p className="text-3xl font-bold">${totalCost.toFixed(2)}</p>
                    </div>
                </div>

                {/* ユーザー一覧 */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4 text-left">学番</th>
                                <th className="py-3 px-4 text-left">名前</th>
                                <th className="py-3 px-4 text-right">トークン使用量</th>
                                <th className="py-3 px-4 text-right">推定コスト（USD）</th>
                                <th className="py-3 px-4 text-left">登録日</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {tokenUsageData.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4">{item.student_id || '-'}</td>
                                    <td className="py-3 px-4">{item.name || '-'}</td>
                                    <td className="py-3 px-4 text-right">{item.token_usage.toLocaleString()}</td>
                                    <td className="py-3 px-4 text-right">${item.estimated_cost.toFixed(4)}</td>
                                    <td className="py-3 px-4">{new Date(item.created_at).toLocaleDateString('ja-JP')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {tokenUsageData.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        データがありません
                    </div>
                )}
            </div>
        </div>
    )
}

// メインコンポーネント - Suspenseでラップ
const AdminTokenUsagePage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow">
                    <h1 className="text-2xl font-bold mb-6">トークン使用量ダッシュボード</h1>
                    <p>読み込み中...</p>
                </div>
            </div>
        }>
            <AdminContent />
        </Suspense>
    )
}

export default AdminTokenUsagePage 