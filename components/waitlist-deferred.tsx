'use client'

import dynamic from 'next/dynamic'
import { DeferredMount } from '@/components/deferred-mount'

const WaitlistClient = dynamic(
  () => import('@/components/waitlist-client').then((mod) => ({ default: mod.WaitlistClient })),
  { ssr: false },
)

function WaitlistPlaceholder() {
  return (
    <section className="relative scroll-mt-20 px-4 py-24 sm:px-5 sm:py-32 lg:px-8" aria-label="Join the waitlist">
      <div className="relative z-10 mx-auto w-full max-w-[88rem] rounded-[2rem] border border-white/10 bg-[#0A0A0A] p-5 sm:rounded-[3rem] sm:p-8 md:p-14">
        <div className="text-center">
          <div className="mb-8 text-xs font-black uppercase tracking-[0.4em] text-green-400">Join The Waitlist</div>
          <h2 className="text-[clamp(2rem,5.2vw,4rem)] font-black leading-[1.1] tracking-tight text-white">
            Be among the first to <br />
            <span className="font-serif italic text-green-400">experience AI movement coaching.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/50 sm:text-xl">
            Early beta users get priority access, exclusive features, and referral rewards.
          </p>
          <div className="mx-auto mt-16 max-w-3xl min-h-[20rem] rounded-2xl border border-white/5 bg-white/[0.02]" />
        </div>
      </div>
    </section>
  )
}

export function WaitlistDeferred() {
  return (
    <DeferredMount id="waitlist" fallback={<WaitlistPlaceholder />}>
      <WaitlistClient />
    </DeferredMount>
  )
}
