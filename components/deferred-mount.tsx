'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type DeferredMountProps = {
  children: ReactNode
  fallback: ReactNode
  id?: string
  rootMargin?: string
}

export function DeferredMount({
  children,
  fallback,
  id,
  rootMargin = '0px 0px 200px 0px',
}: DeferredMountProps) {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mounted) return

    const mount = () => setMounted(true)

    if (id && window.location.hash === `#${id}`) {
      mount()
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          mount()
          observer.disconnect()
        }
      },
      { rootMargin, threshold: 0.01 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [mounted, id, rootMargin])

  return (
    <div ref={ref} id={id}>
      {mounted ? children : fallback}
    </div>
  )
}
