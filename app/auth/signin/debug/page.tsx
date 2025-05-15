'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabase'

export default function DebugLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [envInfo, setEnvInfo] = useState<any>(null)

    const handleSignUp = async () => {
        setError(null)
        setResult(null)

        try {
            // 直接Supabaseの認証APIを使用してユーザーを作成
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            })

            if (error) {
                setError(`サインアップエラー: ${error.message}`)
                return
            }

            setResult(data)
        } catch (err: any) {
            setError(`例外エラー: ${err.message}`)
        }
    }

    const handleTestConnection = async () => {
        setError(null)
        setResult(null)

        try {
            // テーブルの存在確認
            const { data, error } = await supabase
                .from('users')
                .select('count()')
                .limit(1)

            if (error) {
                setError(`データベース接続エラー: ${error.message}`)
                return
            }

            setResult({ message: 'Supabase接続成功', data })
        } catch (err: any) {
            setError(`例外エラー: ${err.message}`)
        }
    }

    const checkEnvironmentVariables = () => {
        setEnvInfo({
            NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '設定済み' : '未設定',
            NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '設定済み' : '未設定',
            NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '設定済み' : '未設定',
            NEXTAUTH_URL: process.env.NEXTAUTH_URL ? '設定済み' : '未設定',
        })
    }

    const testCustomTable = async () => {
        setError(null)
        setResult(null)

        try {
            // カスタムテーブルへの直接アクセスを試みる
            const { data: usersData, error: usersError } = await supabase
                .from('users')
                .select('*')
                .limit(1)

            if (usersError) {
                setError(`usersテーブル接続エラー: ${usersError.message}`)
                return
            }

            // サブスクリプションテーブルの確認
            const { data: subscriptionsData, error: subscriptionsError } = await supabase
                .from('subscriptions')
                .select('*')
                .limit(1)

            setResult({
                users: usersData,
                subscriptions: subscriptionsError ? `エラー: ${subscriptionsError.message}` : subscriptionsData
            })
        } catch (err: any) {
            setError(`例外エラー: ${err.message}`)
        }
    }

    return (
        <div className="p-4 bg-gray-100 rounded-lg mt-8">
            <h3 className="text-lg font-semibold mb-4">接続テスト</h3>

            <div className="space-y-2 mb-4">
                <button
                    onClick={handleTestConnection}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                >
                    Supabase接続テスト
                </button>

                <button
                    onClick={checkEnvironmentVariables}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 mr-2"
                >
                    環境変数確認
                </button>

                <button
                    onClick={testCustomTable}
                    className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                >
                    カスタムテーブル接続テスト
                </button>
            </div>

            <div className="space-y-4 mt-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="メールアドレス"
                    className="w-full p-2 border rounded"
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワード"
                    className="w-full p-2 border rounded"
                />

                <button
                    onClick={handleSignUp}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    テストユーザー作成
                </button>
            </div>

            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
                    <p className="font-bold">エラー:</p>
                    <pre className="whitespace-pre-wrap">{error}</pre>
                </div>
            )}

            {result && (
                <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
                    <p className="font-bold">結果:</p>
                    <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}

            {envInfo && (
                <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded">
                    <p className="font-bold">環境変数:</p>
                    <pre className="whitespace-pre-wrap">{JSON.stringify(envInfo, null, 2)}</pre>
                </div>
            )}
        </div>
    )
} 