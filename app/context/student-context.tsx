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
    const [studentId, setStudentId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [isRegistered, setIsRegistered] = useState<boolean>(false)

    // 初期化時にクッキーから情報を取得
    useEffect(() => {
        const checkRegistration = async () => {
            try {
                const response = await fetch('/api/student/check', {
                    method: 'GET',
                    credentials: 'include',
                })

                if (response.ok) {
                    const data = await response.json()
                    if (data.success && data.studentId && data.name) {
                        setStudentId(data.studentId)
                        setName(data.name)
                        setIsRegistered(true)
                    }
                }
            } catch (error) {
                console.error('学生情報確認エラー:', error)
            }
        }

        checkRegistration()
    }, [])

    const setStudentInfo = async (newStudentId: string, newName: string) => {
        try {
            const response = await fetch('/api/student/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ studentId: newStudentId, name: newName }),
            })

            if (response.ok) {
                setStudentId(newStudentId)
                setName(newName)
                setIsRegistered(true)
            } else {
                const errorData = await response.json()
                throw new Error(errorData.message || '登録に失敗しました')
            }
        } catch (error) {
            console.error('学生情報登録エラー:', error)
            throw error
        }
    }

    const clearStudentInfo = () => {
        setStudentId('')
        setName('')
        setIsRegistered(false)
        // クッキーを削除
        document.cookie = 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
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