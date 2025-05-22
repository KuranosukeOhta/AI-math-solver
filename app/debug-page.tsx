'use client'

import React from 'react'
import StudentForm from '@/app/components/student-form'

export default function DebugPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">AI数学ソルバー</h1>
                <StudentForm />
            </div>
        </div>
    )
} 