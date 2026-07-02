'use client'

import dynamic from 'next/dynamic'
import { DeferredMount } from '@/components/deferred-mount'

const MagicMomentDemo = dynamic(
  () => import('@/components/magic-moment-demo').then((mod) => ({ default: mod.MagicMomentDemo })),
  {
    ssr: false,
    loading: () => (
      <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5" aria-hidden>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="min-h-[11.5rem] rounded-2xl border border-white/10 bg-zinc-900/40 sm:min-h-[12.5rem]"
          />
        ))}
      </div>
    ),
  },
)

export function MagicMomentDeferred() {
  return (
    <DeferredMount
      fallback={
        <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5" aria-hidden>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="min-h-[11.5rem] rounded-2xl border border-white/10 bg-zinc-900/40 sm:min-h-[12.5rem]" />
          ))}
        </div>
      }
    >
      <MagicMomentDemo />
    </DeferredMount>
  )
}
