'use client'

import { useEffect, useRef } from 'react'
import 'katex/dist/katex.min.css'

// KaTeX関数を動的にインポート
let renderMathInElement: any = null

interface MathRendererProps {
    content: string
    className?: string
}

export default function MathRenderer({ content, className = '' }: MathRendererProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const loadKaTeX = async () => {
            if (!renderMathInElement) {
                // KaTeXの自動レンダリング機能を動的にインポート
                const katex = await import('katex/dist/contrib/auto-render')
                renderMathInElement = katex.default
            }

            if (containerRef.current && renderMathInElement) {
                // 既存の数式要素をクリア
                const mathElements = containerRef.current.querySelectorAll('.katex')
                mathElements.forEach(el => {
                    const parent = el.parentNode
                    if (parent) {
                        parent.replaceChild(document.createTextNode(el.textContent || ''), el)
                    }
                })

                // 新しい数式をレンダリング
                renderMathInElement(containerRef.current, {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '$', right: '$', display: false },
                        { left: '\\[', right: '\\]', display: true },
                        { left: '\\(', right: '\\)', display: false }
                    ],
                    throwOnError: false,
                    errorColor: '#cc0000'
                })
            }
        }

        loadKaTeX()
    }, [content])

    return (
        <div
            ref={containerRef}
            className={`math-content ${className}`}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
} 