import { NextAuthProvider } from './providers'

import './styles/globals.css'
import './styles/markdown.scss'

export const metadata = {
  title: 'AI数学ソルバー',
  description: 'AIを使って数学の問題を解決するアプリケーション',
}

const LocaleLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // サーバーサイドでのロケール取得を避け、固定値を使用
  const locale = 'ja'
  return (
    <html lang={locale} className="h-full">
      <body className="h-full">
        <NextAuthProvider>
          <div className="overflow-x-auto">
            <div className="w-screen h-screen min-w-[300px]">
              {children}
            </div>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
