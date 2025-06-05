'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import MathRenderer from '@/app/components/ui/math-renderer'
import { Brain, Bot, User } from 'lucide-react'

export default function TestUIPage() {
    return (
        <div className="container mx-auto p-8 space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-2">AI Math Solver</h1>
                <p className="text-gray-600">ChatGPTライクなUI デザインテスト</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Brain className="w-5 h-5 text-blue-600" />
                            <span>ボタンコンポーネント</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button className="w-full">プライマリボタン</Button>
                        <Button variant="outline" className="w-full">アウトラインボタン</Button>
                        <Button variant="ghost" className="w-full">ゴーストボタン</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>バッジとアバター</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <Badge>gpt-4o-mini</Badge>
                            <Badge variant="outline">GPT-4o</Badge>
                            <Badge variant="secondary">Claude</Badge>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Avatar>
                                <AvatarFallback className="bg-blue-600 text-white">
                                    <Bot className="w-4 h-4" />
                                </AvatarFallback>
                            </Avatar>
                            <Avatar>
                                <AvatarFallback>
                                    <User className="w-4 h-4" />
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>入力フィールド</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Input placeholder="数学の問題を入力..." />
                        <Input placeholder="検索..." />
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>数式レンダリング</CardTitle>
                    <CardDescription>KaTeXによるLaTeX数式の表示テスト</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">インライン数式：</h4>
                        <MathRenderer content="これは $E = mc^2$ のアインシュタインの式です。" />
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">ブロック数式：</h4>
                        <MathRenderer content="二次方程式の解の公式は以下の通りです：

$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

この式を使って任意の二次方程式を解くことができます。" />
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">複雑な数式：</h4>
                        <MathRenderer content="複素解析の基本：

$$\\oint_C f(z) dz = 2\\pi i \\sum_{k} \\text{Res}(f, z_k)$$

フーリエ変換：

$$\\mathcal{F}\\{f(t)\\}(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt$$" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>チャットメッセージプレビュー</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex space-x-3">
                        <Avatar className="w-8 h-8">
                            <AvatarFallback>
                                <User className="w-4 h-4" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <MathRenderer content="微分方程式 $\\frac{dy}{dx} = x^2 + y$ を解いてください。" />
                            </div>
                            <div className="text-xs text-gray-500 mt-1">14:32</div>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-blue-600 text-white">
                                <Bot className="w-4 h-4" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Brain className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-medium text-blue-800">思考中...</span>
                                </div>
                                <div className="text-sm text-blue-700">
                                    これは一階線形微分方程式ですね。積分因子法を使って解いてみます...
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-blue-600 text-white">
                                <Bot className="w-4 h-4" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <MathRenderer content="この微分方程式を解くために、積分因子法を使用します。

与えられた方程式：
$$\\frac{dy}{dx} = x^2 + y$$

これを標準形に書き直すと：
$$\\frac{dy}{dx} - y = x^2$$

積分因子は：
$$\\mu(x) = e^{\\int -1 dx} = e^{-x}$$

両辺に $e^{-x}$ を掛けると：
$$e^{-x}\\frac{dy}{dx} - e^{-x}y = x^2 e^{-x}$$

左辺は $(e^{-x}y)'$ なので：
$$\\frac{d}{dx}(e^{-x}y) = x^2 e^{-x}$$

両辺を積分すると、右辺の積分は部分積分を用いて計算できます。

最終的な解は：
$$y = e^x(-x^2 + 2x - 2) + Ce^x$$

ここで $C$ は積分定数です。" />
                            </div>
                            <div className="text-xs text-gray-500 mt-1">14:35</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 