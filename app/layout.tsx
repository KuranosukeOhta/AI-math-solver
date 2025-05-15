import { getLocaleOnServer } from '@/i18n/server'
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
  const locale = getLocaleOnServer()
  return (
    <html lang={locale ?? 'en'} className="h-full">
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
