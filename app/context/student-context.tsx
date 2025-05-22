'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface StudentContextType {
    studentId: string
    name: string
    isRegistered: boolean
    setStudentInfo: (studentId: string, name: string) => void
    clearStudentInfo: () => void
}

const StudentContext = createContext<StudentContextType | undefined>(undefined)

export function StudentProvider({ children }: { children: ReactNode }) {
    // 固定の学生情報（ダミー）
    const [studentId, setStudentId] = useState<string>('aa12345')
    const [name, setName] = useState<string>('ゲストユーザー')
    // 常に登録済みとして扱う
    const [isRegistered, setIsRegistered] = useState<boolean>(true)

    // 登録機能（コールされてもローカルだけで処理する）
    const setStudentInfo = async (newStudentId: string, newName: string) => {
        setStudentId(newStudentId)
        setName(newName)
        setIsRegistered(true)
        return true
    }

    const clearStudentInfo = () => {
        setStudentId('aa12345')
        setName('ゲストユーザー')
    }

    return (
        <StudentContext.Provider value={{ studentId, name, isRegistered, setStudentInfo, clearStudentInfo }}>
            {children}
        </StudentContext.Provider>
    )
}

export function useStudent() {
    const context = useContext(StudentContext)
    if (context === undefined) {
        throw new Error('useStudent must be used within a StudentProvider')
    }
    return context
} 