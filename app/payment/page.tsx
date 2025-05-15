'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Payment() {
    const { data: session } = useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [selectedHours, setSelectedHours] = useState(1)
    const [error, setError] = useState('')

    // 1時間あたりの料金
    const pricePerHour = parseInt(process.env.NEXT_PUBLIC_PRICE_PER_HOUR || '300')

    // サブスクリプションの有効期限を計算
    const subscriptionEnd = session?.user?.subscriptionEnd
        ? new Date(session.user.subscriptionEnd as string)
        : null

    const isSubscriptionActive = subscriptionEnd && subscriptionEnd > new Date()

    // 残り時間を計算
    const getRemainingTime = () => {
        if (!subscriptionEnd || !isSubscriptionActive) return null

        const now = new Date()
        const diffMs = subscriptionEnd.getTime() - now.getTime()
        const diffHrs = Math.round(diffMs / (1000 * 60 * 60))
        const diffMins = Math.round((diffMs % (1000 * 60 * 60)) / (1000 * 60))

        return `${diffHrs}時間${diffMins}分`
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
                        {isSubscriptionActive
                            ? `現在のサブスクリプションは ${subscriptionEnd?.toLocaleString('ja-JP')} まで有効です（残り約${getRemainingTime()}）`
                            : '現在有効なサブスクリプションはありません'}
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