'use client'

import { useEffect, useState } from 'react'

export function LazyToaster() {
  const [Toaster, setToaster] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    const load = () => {
      import('@/components/ui/sonner').then((mod) => setToaster(() => mod.Toaster))
    }

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(load, { timeout: 3000 })
      return () => window.cancelIdleCallback(id)
    }

    const timer = window.setTimeout(load, 1500)
    return () => window.clearTimeout(timer)
  }, [])

  if (!Toaster) return null
  return <Toaster />
}
