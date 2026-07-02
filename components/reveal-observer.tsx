'use client'

import { useEffect } from 'react'

export function RevealObserver() {
  useEffect(() => {
    let cleanup: (() => void) | undefined

    const setup = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -50px 0px' },
      )

      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => observer.observe(el))
      cleanup = () => observer.disconnect()
    }

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(setup, { timeout: 3000 })
      return () => {
        window.cancelIdleCallback(id)
        cleanup?.()
      }
    }

    const timer = window.setTimeout(setup, 200)
    return () => {
      window.clearTimeout(timer)
      cleanup?.()
    }
  }, [])

  return null
}
