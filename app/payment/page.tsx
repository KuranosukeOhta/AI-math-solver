'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'

export default function Payment() {
    const { data: session } = useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [selectedHours, setSelectedHours] = useState(1)
    const [error, setError] = useState('')
    const [hasUsedTrial, setHasUsedTrial] = useState(false)
    const [checkingTrial, setCheckingTrial] = useState(true)

    // 1時間あたりの料金
    const pricePerHour = parseInt(process.env.NEXT_PUBLIC_PRICE_PER_HOUR || '300')

    // サブスクリプションの有効期限を計算
    const subscriptionEnd = session?.user?.subscriptionEnd
        ? new Date(session.user.subscriptionEnd as string)
        : null

    const isSubscriptionActive = subscriptionEnd && subscriptionEnd > new Date()

    // トライアル状態を確認
    useEffect(() => {
        const checkTrialStatus = async () => {
            if (session?.user?.id) {
                try {
                    const { data } = await supabase
                        .from('payments')
                        .select('*')
                        .eq('user_id', session.user.id)
                        .eq('status', 'trial')
                        .limit(1)

                    setHasUsedTrial(data && data.length > 0)
                } catch (error) {
                    console.error('トライアル状態確認エラー:', error)
                } finally {
                    setCheckingTrial(false)
                }
            } else {
                setCheckingTrial(false)
            }
        }

        checkTrialStatus()
    }, [session])

    // 残り時間を計算
    const getRemainingTime = () => {
        if (!subscriptionEnd || !isSubscriptionActive) return null

        const now = new Date()
        const diffMs = subscriptionEnd.getTime() - now.getTime()

        // 5分未満の場合は分と秒で表示
        if (diffMs < 5 * 60 * 1000) {
            const diffMins = Math.floor(diffMs / (1000 * 60))
            const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000)
            return `${diffMins}分${diffSecs}秒`
        }

        // それ以外は時間と分で表示
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
        return `${diffHrs}時間${diffMins}分`
    }

    // トライアル状態のテキストを取得
    const getTrialStatusText = () => {
        if (checkingTrial) return '確認中...'

        if (isSubscriptionActive) {
            const remainingTime = getRemainingTime()
            return `現在のサブスクリプションは ${subscriptionEnd?.toLocaleString('ja-JP')} まで有効です（残り約${remainingTime}）`
        }

        if (hasUsedTrial) {
            return 'トライアル期間は終了しました。サービスを継続するには支払いが必要です。'
        }

        return '5分間の無料トライアルをご利用いただけます。ログインするとすぐに開始されます。'
    }

    const handlePayment = async () => {
        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/stripe/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hours: selectedHours }),
            })

            const data = await response.json()

            if (response.ok && data.url) {
                // Stripeのチェックアウトページにリダイレクト
                window.location.href = data.url
            } else {
                setError(data.error || '決済処理中にエラーが発生しました')
            }
        } catch (error) {
            setError('決済処理中にエラーが発生しました')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        AI数学ソルバー 利用料金
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {getTrialStatusText()}
                    </p>
                </div>

                {error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">{error}</h3>
                            </div>
                        </div>
                    </div>
                )}

                {!isSubscriptionActive && (
                    <div className="bg-blue-50 p-4 rounded-md mb-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800">初回登録特典</h3>
                                <div className="mt-2 text-sm text-blue-700">
                                    <p>初めてのご利用の方には、5分間の無料トライアル期間をご提供しています。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">利用時間を選択</h3>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {[1, 3, 5].map((hours) => (
                                <button
                                    key={hours}
                                    type="button"
                                    onClick={() => setSelectedHours(hours)}
                                    className={`py-2 px-4 rounded-md ${selectedHours === hours
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                        }`}
                                >
                                    {hours}時間
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-700">料金:</span>
                            <span className="text-xl font-bold">{pricePerHour * selectedHours}円</span>
                        </div>

                        <button
                            type="button"
                            onClick={handlePayment}
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                        >
                            {loading ? '処理中...' : '支払いに進む'}
                        </button>
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => router.push('/')}
                            className="text-sm text-indigo-600 hover:text-indigo-500"
                        >
                            ホームに戻る
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 