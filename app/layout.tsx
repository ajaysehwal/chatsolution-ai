import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from './contexts'
const inter = Inter({ subsets: ['latin'] })
import PrelineScript from './components/PrelineScript'
export const metadata: Metadata = {
  title: 'CSOL-AI',
  description: 'Experience the future of seamless, intelligent communication with our AI-powered chat solution',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <AppProvider>
        {children}
        </AppProvider>
        </body>
        <PrelineScript />

    </html>
  )
}
