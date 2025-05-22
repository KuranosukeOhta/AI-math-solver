'use client'

import React from 'react'

// シンプルな静的ページ
export default function SimplePage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">シンプルデバッグページ</h1>
                <p className="text-center">このページが表示されれば、Reactのレンダリングは正常です。</p>
            </div>
        </div>
    )
} 