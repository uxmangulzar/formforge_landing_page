'use client'

import { useEffect, useRef, useState } from 'react'
import { Activity, Target, Sparkles, TrendingUp, type LucideIcon } from 'lucide-react'

const STEPS: { label: string; icon: LucideIcon }[] = [
  { label: 'Movement detected', icon: Activity },
  { label: 'Mistake highlighted', icon: Target },
  { label: 'Correction applied', icon: Sparkles },
  { label: 'Score improves', icon: TrendingUp },
]

export function MagicMomentDemo() {
  const [magicMomentStep, setMagicMomentStep] = useState(0)
  const [heroScore, setHeroScore] = useState(62)
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([])

  useEffect(() => {
    const start = () => {
      intervalsRef.current.push(
        setInterval(() => setMagicMomentStep((s) => (s + 1) % 4), 1100),
        setInterval(() => setHeroScore((s) => (s >= 94 ? 62 : s + 2)), 1200),
      )
    }

    const stop = () => {
      intervalsRef.current.forEach(clearInterval)
      intervalsRef.current = []
    }

    const onVisibility = () => {
      stop()
      if (!document.hidden) start()
    }

    if (!document.hidden) start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="hidden sm:block absolute top-11 left-[10%] right-[10%] h-px bg-white/10" aria-hidden />
      <div
        className="hidden sm:block absolute top-11 left-[10%] h-px bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 transition-all duration-700 ease-out"
        style={{ width: `${(magicMomentStep / 3) * 80}%` }}
        aria-hidden
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 items-stretch">
        {STEPS.map((step, index) => {
          const isActive = index === magicMomentStep
          const isDone = index < magicMomentStep
          const StepIcon = step.icon

          return (
            <div
              key={step.label}
              className={`relative flex h-full min-h-[11.5rem] sm:min-h-[12.5rem] flex-col items-center text-center rounded-2xl border p-5 sm:p-6 transition-colors duration-500 ${
                isActive
                  ? 'border-green-400/50 bg-green-400/10 shadow-[0_0_32px_rgb(var(--repvio-primary-rgb)/0.15)]'
                  : isDone
                    ? 'border-green-400/20 bg-zinc-900/60'
                    : 'border-white/10 bg-zinc-900/40'
              }`}
            >
              <div
                className={`mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl transition-all duration-500 ${
                  isActive
                    ? 'bg-gradient-to-br from-green-400 to-green-500 text-black shadow-[0_0_20px_rgb(var(--repvio-primary-rgb)/0.35)]'
                    : isDone
                      ? 'bg-green-400/20 text-green-400'
                      : 'bg-white/5 text-white/40'
                }`}
              >
                <StepIcon size={22} strokeWidth={2.5} className={isActive ? 'animate-pulse' : ''} />
              </div>
              <div
                className={`text-[10px] font-mono uppercase tracking-widest mb-1.5 ${
                  isActive ? 'text-green-400' : isDone ? 'text-green-400/60' : 'text-white/30'
                }`}
              >
                Step {index + 1}
              </div>
              <p
                className={`text-sm font-bold leading-snug sm:text-base ${
                  isActive ? 'text-white' : isDone ? 'text-white/70' : 'text-white/45'
                }`}
              >
                {step.label}
              </p>
              <div className="mt-auto flex h-12 w-full items-center justify-center pt-3">
                {index === 3 ? (
                  <div
                    className={`rounded-lg border border-green-400/30 bg-black/50 px-3 py-1.5 transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden={!isActive}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">Form score </span>
                    <span className="text-lg font-black text-green-400 tabular-nums">{heroScore}%</span>
                  </div>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
