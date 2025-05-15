'use client'

import { useRouter } from 'next/navigation'

export default function PaymentCancel() {
    const router = useRouter()

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                    <svg
                        className="h-6 w-6 text-yellow-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        お支払いがキャンセルされました
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        お支払いプロセスがキャンセルされました。料金は請求されていません。
                    </p>
                </div>
                <div className="flex justify-center space-x-4">
                    <button
                        type="button"
                        onClick={() => router.push('/payment')}
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        支払いに戻る
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        ホームに戻る
                    </button>
                </div>
            </div>
        </div>
    )
} 