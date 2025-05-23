'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStudent } from '@/app/context/student-context'
import StudentForm from '@/app/components/student-form'

export default function LoginPage() {
    const { isRegistered } = useStudent()
    const router = useRouter()

    useEffect(() => {
        if (isRegistered) {
            router.push('/chat')
        }
    }, [isRegistered, router])

    if (isRegistered) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>ログイン済みです。チャットページに移動中...</p>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-6">
                <StudentForm onRegister={() => router.push('/chat')} />
            </div>
        </div>
    )
} 