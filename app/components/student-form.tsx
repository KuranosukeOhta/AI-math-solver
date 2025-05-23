'use client'

import { useState, useEffect } from 'react'
import { useStudent } from '@/app/context/student-context'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'

interface StudentFormProps {
    onRegister?: () => void
}

interface DebugInfo {
    [key: string]: unknown
}

// フォームのバリデーションスキーマ
const formSchema = z.object({
    studentId: z.string()
        .min(1, { message: '学番は必須です' })
        .regex(/^[a-zA-Z]{2}\d{5}$/, {
            message: '学番は2文字のアルファベットと5桁の数字（例: ab12345）の形式で入力してください'
        }),
    name: z.string().min(1, { message: '名前は必須です' })
})

type FormValues = z.infer<typeof formSchema>

const StudentForm: React.FC<StudentFormProps> = ({ onRegister }) => {
    console.log('StudentForm: Component rendering')
    const { setStudentInfo, loginStudent, isRegistered, studentId: savedStudentId, name: savedName } = useStudent()
    console.log('StudentForm: isRegistered =', isRegistered)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null)
    const { toast } = useToast()
    const router = useRouter()

    // デバッグモードをオフに設定
    const [showDebug, setShowDebug] = useState<boolean>(false)

    // フォームの初期化
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            studentId: savedStudentId || '',
            name: savedName || ''
        }
    })

    // 両方のフィールドが入力されているかチェック
    const [isFormFilled, setIsFormFilled] = useState<boolean>(false)

    useEffect(() => {
        // フォームの値が変更されたときにチェック
        const subscription = form.watch((values) => {
            setIsFormFilled(!!values.studentId && !!values.name)
        })
        return () => subscription.unsubscribe()
    }, [form.watch])

    const toggleDebug = () => {
        setShowDebug(!showDebug)
    }

    const handleSubmit = async (values: FormValues) => {
        console.log('StudentForm: handleSubmit started')
        setError('')
        setDebugInfo(null)

        setIsLoading(true)
        try {
            console.log('StudentForm: Calling setStudentInfo')
            const response = await setStudentInfo(values.studentId, values.name)
            console.log('StudentForm: setStudentInfo response:', response)
            toast({
                title: "登録完了",
                description: "登録が完了しました",
            })
            if (onRegister) onRegister()
        } catch (err: unknown) {
            console.error('StudentForm: Error during registration:', err)
            const errorMessage = err instanceof Error ? err.message : '登録に失敗しました。もう一度お試しください。'

            // 既に登録されている場合はログインを試行
            if (errorMessage.includes('既に登録されています')) {
                console.log('StudentForm: Student already registered, attempting login...')
                try {
                    const loginResponse = await loginStudent(values.studentId, values.name)
                    console.log('StudentForm: loginStudent response:', loginResponse)
                    toast({
                        title: "ログイン完了",
                        description: "ログインが完了しました",
                    })
                    if (onRegister) onRegister()
                    return // 成功したのでここで終了
                } catch (loginErr: unknown) {
                    console.error('StudentForm: Error during login:', loginErr)
                    const loginErrorMessage = loginErr instanceof Error ? loginErr.message : 'ログインに失敗しました。'
                    setError(loginErrorMessage)
                    toast({
                        variant: "destructive",
                        title: "ログインエラー",
                        description: loginErrorMessage,
                    })
                    setDebugInfo(loginErr as DebugInfo)
                    return
                }
            }

            // その他のエラー
            setError(errorMessage)
            toast({
                variant: "destructive",
                title: "エラー",
                description: errorMessage,
            })
            // デバッグ情報を保存
            setDebugInfo(err as DebugInfo)
        } finally {
            setIsLoading(false)
        }
    }

    const handleStartAI = () => {
        // リロードではなく、チャットページに遷移
        console.log('StudentForm: Navigating to chat page');
        router.push('/chat');
    }

    const testConnection = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('/api/student/test-connection', {
                method: 'GET'
            })
            const data = await response.json()
            setDebugInfo(data)
            toast({
                title: "接続テスト",
                description: "Connection test completed",
            })
        } catch (err) {
            setDebugInfo(err as DebugInfo)
            toast({
                variant: "destructive",
                title: "接続エラー",
                description: "Connection test failed",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">学生ログイン・登録</CardTitle>
                <CardDescription className="text-center">
                    学番と名前を入力してください（初回の場合は自動で登録されます）
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className="mb-6 bg-green-50 border-green-200">
                    <AlertCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-600">
                        これは学生情報登録フォームです。学番と名前を入力して登録してください。
                    </AlertDescription>
                </Alert>

                {isRegistered ? (
                    <div className="text-center">
                        <p className="mb-2">登録済みです</p>
                        <Card className="mb-6 bg-gray-50">
                            <CardContent className="pt-6">
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">学番:</span>
                                        <Badge variant="outline">{savedStudentId}</Badge>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">名前:</span>
                                        <span>{savedName}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Button
                            onClick={handleStartAI}
                            className="w-full"
                        >
                            AIを使い始める
                        </Button>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                            {error && (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <FormField
                                control={form.control}
                                name="studentId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>学番 <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="ab12345"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.value.toLowerCase())}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            2文字のアルファベットと5桁の数字（例: ab12345）
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>名前 <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="山田 太郎" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full ${isFormFilled
                                    ? 'bg-primary hover:bg-primary/90 shadow-md transition-all'
                                    : 'bg-primary/70'
                                    }`}
                            >
                                {isLoading ? 'ログイン中...' : 'ログイン・登録する'}
                            </Button>

                            <Collapsible className="w-full">
                                <div className="flex items-center justify-center">
                                    <CollapsibleTrigger asChild>
                                        <Button variant="link" size="sm" className="text-xs text-muted-foreground">
                                            {showDebug ? (
                                                <>
                                                    <ChevronUp className="h-3 w-3 mr-1" />
                                                    デバッグ情報を隠す
                                                </>
                                            ) : (
                                                <>
                                                    <ChevronDown className="h-3 w-3 mr-1" />
                                                    デバッグ情報を表示
                                                </>
                                            )}
                                        </Button>
                                    </CollapsibleTrigger>
                                </div>
                                <CollapsibleContent>
                                    <Card className="mt-4 bg-muted/50">
                                        <CardHeader className="py-2">
                                            <CardTitle className="text-sm">デバッグ情報</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex space-x-2 mb-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={testConnection}
                                                >
                                                    接続テスト
                                                </Button>
                                            </div>
                                            {debugInfo && (
                                                <pre className="text-xs overflow-auto max-h-40 p-2 bg-muted rounded-md">
                                                    {JSON.stringify(debugInfo, null, 2)}
                                                </pre>
                                            )}
                                        </CardContent>
                                    </Card>
                                </CollapsibleContent>
                            </Collapsible>
                        </form>
                    </Form>
                )}
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
                <p className="text-xs text-muted-foreground text-center">
                    入力いただいた情報は、使用状況の記録と課金計算のためだけに使用されます。
                </p>
            </CardFooter>
        </Card>
    )
}

export default StudentForm 