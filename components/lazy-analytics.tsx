'use client'

import { useEffect, useState } from 'react'

export function LazyAnalytics() {
  const [Analytics, setAnalytics] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return

    const load = () => {
      import('@vercel/analytics/next').then((mod) => setAnalytics(() => mod.Analytics))
    }

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(load, { timeout: 5000 })
      return () => window.cancelIdleCallback(id)
    }

    const timer = window.setTimeout(load, 3000)
    return () => window.clearTimeout(timer)
  }, [])

  if (!Analytics) return null
  return <Analytics />
}
