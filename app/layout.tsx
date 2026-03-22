import type { Metadata, Viewport } from 'next'
import { Noto_Sans_TC, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { GlobalCursorLayer } from '@/components/cursor/global-cursor-layer'

const notoSansTC = Noto_Sans_TC({ 
  subsets: ["latin"],
  variable: '--font-noto-sans-tc',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: '財團法人鄉育教育基金會 | 撥開職涯的迷霧，看見你的專屬藍圖',
  description: '財團法人鄉育教育基金會（CountryEDU Charity Foundation）致力於賦能青年選擇力，協助大學生從自我認識到定義賽道，具備在多變環境下的決策能力。透過數據驅動成長與 SEL 社會情緒學習，讓迷惘轉化為選擇的力量。',
  keywords: ['職涯探索', '大學生', '自我認識', 'SEL', '社會情緒學習', '教育基金會', '鄉育', 'CountryEDU'],
  generator: 'v0.app',
  openGraph: {
    title: '財團法人鄉育教育基金會 CountryEDU Charity Foundation',
    description: '撥開職涯的迷霧，看見你的專屬藍圖，讓迷惘轉化為選擇的力量。',
    siteName: '財團法人鄉育教育基金會',
    locale: 'zh_TW',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#4a7c59',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${notoSansTC.variable} ${inter.variable} font-sans antialiased`}>
        <GlobalCursorLayer />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
