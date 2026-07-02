import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { LazyAnalytics } from '@/components/lazy-analytics'

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'Repvio AI - AI-Powered Workout Form Correction',
  description:
    'Real-time AI movement coaching, fitness gaming, and recovery training using only your smartphone camera.',
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-black" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="image"
          href="/hero-mobile.webp"
          type="image/webp"
          media="(max-width: 768px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/hero.webp"
          type="image/webp"
          media="(min-width: 769px)"
          fetchPriority="high"
        />
      </head>
      <body className={`${geist.className} antialiased bg-black text-white`} suppressHydrationWarning>
        {children}
        <LazyAnalytics />
      </body>
    </html>
  )
}
