'use client'

import { useStudent } from '@/app/context/student-context'
import StudentForm from './student-form'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ChevronRight, Clipboard, Zap, Layers } from 'lucide-react'

const LandingPage: React.FC = () => {
    const { isRegistered } = useStudent()
    const router = useRouter()

    const handleStartAI = () => {
        router.push('/chat')
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background/50 to-background">
            {/* ヘッダー */}
            <header className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-primary">AI Math Solver</h1>
                    </div>
                    {isRegistered && (
                        <Button
                            onClick={handleStartAI}
                            variant="default"
                            size="sm"
                        >
                            AIを使い始める
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </header>

            {/* ヒーローセクション */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <Badge className="mb-4" variant="outline">最新のAI技術搭載</Badge>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                                数学の問題を<span className="text-primary">AIが解決</span>
                            </h1>
                            <p className="text-xl text-muted-foreground mb-6">
                                数式を入力するだけで、AIが解き方を詳しく説明します。
                                数学の学習をもっと効率的に、もっと楽しく。
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {isRegistered ? (
                                    <Button
                                        onClick={handleStartAI}
                                        size="lg"
                                        className="group"
                                    >
                                        今すぐ使ってみる
                                        <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                ) : (
                                    <Button
                                        asChild
                                        size="lg"
                                        className="group"
                                    >
                                        <a href="#register">
                                            無料で始める
                                            <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                        </a>
                                    </Button>
                                )}
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                >
                                    <a href="#features">
                                        詳しく見る
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <div className="relative w-full max-w-md h-64 md:h-80">
                                <div className="absolute inset-0 bg-muted rounded-lg transform rotate-3" />
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-lg shadow-xl flex items-center justify-center p-6">
                                    <div className="text-white">
                                        <div className="text-xl font-bold mb-2">例: 二次方程式の解</div>
                                        <div className="font-mono bg-white/10 p-3 rounded">
                                            x² + 5x + 6 = 0
                                        </div>
                                        <div className="mt-4 bg-white/20 p-3 rounded">
                                            <div className="mb-1">解答:</div>
                                            <div className="font-mono">x = -2, x = -3</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 特徴セクション */}
            <section id="features" className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">AI Math Solverの特徴</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader>
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <Clipboard className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>詳細な解説</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    単に答えを提示するだけでなく、解法のステップを詳しく説明します。理解を深めながら学習できます。
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <Zap className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>高速処理</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    複雑な数式も瞬時に処理。待ち時間なく、すぐに解答を得ることができます。
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <Layers className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>幅広い対応</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    代数、微積分、統計など、様々な数学分野の問題に対応。学年を問わず利用できます。
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 登録フォームセクション */}
            <section id="register" className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        {isRegistered ? 'AIを使い始める' : '無料で始める'}
                    </h2>
                    <div className="max-w-lg mx-auto">
                        <StudentForm />
                    </div>
                </div>
            </section>

            {/* フッター */}
            <footer className="bg-muted/80 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-xl font-bold">AI Math Solver</h2>
                            <p className="text-muted-foreground text-sm">© 2023 AI Math Solver. All rights reserved.</p>
                        </div>
                        <div className="flex space-x-4">
                            <Button variant="link" asChild>
                                <a href="/terms">利用規約</a>
                            </Button>
                            <Button variant="link" asChild>
                                <a href="/privacy">プライバシーポリシー</a>
                            </Button>
                            <Button variant="link" asChild>
                                <a href="/contact">お問い合わせ</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage 