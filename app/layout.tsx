import './styles/globals.css'
import './styles/markdown.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { I18nextProvider } from './i18n/i18nextProvider'
import { StudentProvider } from './context/student-context'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Math Solver',
  description: 'Math problem solver powered by AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <I18nextProvider>
          <StudentProvider>
            {children}
            <Toaster />
          </StudentProvider>
        </I18nextProvider>
      </body>
    </html>
  )
}
