'use client'

import React, { useState } from 'react'
import { useStudent } from '@/app/context/student-context'
import Toast from '@/app/components/base/toast'

interface StudentFormProps {
    onRegister?: () => void
}

const StudentForm: React.FC<StudentFormProps> = ({ onRegister }) => {
    const { setStudentInfo, isRegistered, studentId: savedStudentId, name: savedName } = useStudent()
    const [studentId, setStudentId] = useState<string>(savedStudentId || '')
    const [name, setName] = useState<string>(savedName || '')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const { notify } = Toast

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('StudentForm: handleSubmit started')
        setError('')

        if (!studentId || !name) {
            setError('学番と名前を入力してください')
            return
        }

        // 学番の形式チェック（2文字のアルファベット + 5桁の数字）
        const regex = /^[a-zA-Z]{2}\d{5}$/
        if (!regex.test(studentId)) {
            setError('学番は2文字のアルファベットと5桁の数字（例: ab12345）の形式で入力してください')
            return
        }

        setIsLoading(true)
        try {
            console.log('StudentForm: Calling setStudentInfo')
            await setStudentInfo(studentId, name)
            notify({ type: 'success', message: '登録が完了しました' })
            if (onRegister) onRegister()
        } catch (err: any) {
            setError(err.message || '登録に失敗しました。もう一度お試しください。')
            notify({ type: 'error', message: err.message || '登録に失敗しました' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">学生情報登録</h2>

            {isRegistered ? (
                <div className="text-center">
                    <p className="mb-2">登録済みです</p>
                    <div className="mb-4 p-4 bg-gray-50 rounded-md">
                        <p><span className="font-semibold">学番:</span> {savedStudentId}</p>
                        <p><span className="font-semibold">名前:</span> {savedName}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200"
                    >
                        AIを使い始める
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <div className="mb-4">
                        <label htmlFor="studentId" className="block text-gray-700 font-medium mb-2">
                            学番 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="studentId"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value.toLowerCase())}
                            placeholder="ab12345"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            2文字のアルファベットと5桁の数字（例: ab12345）
                        </p>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                            名前 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="山田 太郎"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded-md font-medium text-white transition duration-200 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                    >
                        {isLoading ? '登録中...' : '登録して使い始める'}
                    </button>
                </form>
            )}

            <p className="mt-4 text-xs text-gray-500 text-center">
                入力いただいた情報は、使用状況の記録と課金計算のためだけに使用されます。
            </p>
        </div>
    )
}

export default StudentForm 