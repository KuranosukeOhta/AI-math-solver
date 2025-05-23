'use client'

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface ApiResponse {
    success: boolean
    message: string
    userId?: string
}

interface StudentContextType {
    studentId: string
    name: string
    isRegistered: boolean
    setStudentInfo: (studentId: string, name: string) => Promise<ApiResponse>
    loginStudent: (studentId: string, name: string) => Promise<ApiResponse>
    clearStudentInfo: () => void
}

const StudentContext = createContext<StudentContextType | undefined>(undefined)

export function StudentProvider({ children }: { children: ReactNode }) {
    const [studentId, setStudentId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [isRegistered, setIsRegistered] = useState<boolean>(false)

    useEffect(() => {
        const checkRegistration = async () => {
            try {
                console.log('StudentContext: Checking registration...');
                const response = await fetch('/api/student/check', {
                    method: 'GET',
                    credentials: 'include',
                })

                console.log('StudentContext: Check response status:', response.status);
                if (response.ok) {
                    const data = await response.json()
                    if (data.success && data.studentId && data.name) {
                        setStudentId(data.studentId)
                        setName(data.name)
                        setIsRegistered(true)
                        console.log('StudentContext: User is registered:', data.studentId, data.name);
                    }
                } else {
                    console.log('StudentContext: User is NOT registered (response not ok)');
                    setIsRegistered(false)
                }
            } catch (error) {
                console.error('学生情報確認エラー:', error)
                console.log('StudentContext: User is NOT registered (error)');
                setIsRegistered(false)
            }
        }

        checkRegistration()
    }, [])

    const setStudentInfo = async (newStudentId: string, newName: string): Promise<ApiResponse> => {
        try {
            console.log('StudentContext: setStudentInfo started');
            const response = await fetch('/api/student/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ studentId: newStudentId, name: newName }),
            })
            console.log('StudentContext: register API response status:', response.status);

            // レスポンスのテキストを取得
            const responseText = await response.text();
            let responseData: ApiResponse;

            // JSONとして解析可能か試みる
            try {
                responseData = JSON.parse(responseText);
                console.log('StudentContext: register API response data:', responseData);
            } catch (e) {
                console.error('StudentContext: Failed to parse response as JSON:', responseText);
                throw new Error(`API応答の解析に失敗しました: ${responseText}`);
            }

            if (response.ok) {
                if (responseData.success) {
                    setStudentId(newStudentId)
                    setName(newName)
                    setIsRegistered(true)
                    console.log('StudentContext: Registration successful, isRegistered set to true');
                    return responseData;
                }
                console.log('StudentContext: Registration failed, data.success is false');
                throw new Error(responseData.message || '登録に失敗しました');
            }
            console.log('StudentContext: Registration failed, response not ok:', responseData);
            throw new Error(responseData.message || `登録に失敗しました (${response.status})`);
        } catch (error: unknown) {
            console.error('学生情報登録エラー:', error);
            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                throw new Error('APIサーバーに接続できません。ネットワーク接続を確認してください。');
            }
            throw error;
        }
    }

    const loginStudent = async (loginStudentId: string, loginName: string): Promise<ApiResponse> => {
        try {
            console.log('StudentContext: loginStudent started');
            const response = await fetch('/api/student/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ studentId: loginStudentId, name: loginName }),
            })
            console.log('StudentContext: login API response status:', response.status);

            // レスポンスのテキストを取得
            const responseText = await response.text();
            let responseData: ApiResponse;

            // JSONとして解析可能か試みる
            try {
                responseData = JSON.parse(responseText);
                console.log('StudentContext: login API response data:', responseData);
            } catch (e) {
                console.error('StudentContext: Failed to parse response as JSON:', responseText);
                throw new Error(`API応答の解析に失敗しました: ${responseText}`);
            }

            if (response.ok) {
                if (responseData.success) {
                    setStudentId(loginStudentId)
                    setName(loginName)
                    setIsRegistered(true)
                    console.log('StudentContext: Login successful, isRegistered set to true');
                    return responseData;
                }
                console.log('StudentContext: Login failed, data.success is false');
                throw new Error(responseData.message || 'ログインに失敗しました');
            }
            console.log('StudentContext: Login failed, response not ok:', responseData);
            throw new Error(responseData.message || `ログインに失敗しました (${response.status})`);
        } catch (error: unknown) {
            console.error('学生ログインエラー:', error);
            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                throw new Error('APIサーバーに接続できません。ネットワーク接続を確認してください。');
            }
            throw error;
        }
    }

    const clearStudentInfo = () => {
        setStudentId('')
        setName('')
        setIsRegistered(false)
        fetch('/api/student/logout', { method: 'POST' });
        document.cookie = 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }

    return (
        <StudentContext.Provider value={{ studentId, name, isRegistered, setStudentInfo, loginStudent, clearStudentInfo }}>
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