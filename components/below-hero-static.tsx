import { Activity, Gamepad2, Zap } from 'lucide-react'

const COACH_ITEMS = [
  { icon: Zap, text: 'Fix your form instantly' },
  { icon: Gamepad2, text: 'Turn workouts into games' },
  { icon: Activity, text: 'Track movement like an athlete' },
] as const

export function BelowHeroStatic() {
  return (
    <>
      <section className="relative z-10 px-4 py-12 sm:px-5 sm:py-16 lg:px-8 reveal is-visible">
        <div className="mx-auto max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-10 backdrop-blur-sm sm:rounded-[2.5rem] sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-green-400/[0.04] via-transparent to-yellow-400/[0.04]" />

            <h2 className="relative mx-auto max-w-3xl text-center text-[clamp(1.6rem,3.8vw,2.75rem)] font-black leading-[1.15] tracking-tight text-white">
              What if your phone could <span className="text-green-400">coach every rep?</span>
            </h2>

            <div className="relative mt-10 grid gap-4 sm:grid-cols-3 sm:gap-6">
              {COACH_ITEMS.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-white/5 bg-black/40 px-5 py-6 text-center sm:py-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-green-400/20 bg-green-400/10 text-green-400">
                    <Icon size={22} strokeWidth={2.5} />
                  </div>
                  <p className="text-sm font-bold leading-snug text-white/90 sm:text-base">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="reveal is-visible px-4 py-8 sm:px-5 sm:py-12 lg:px-8">
        <div className="group relative mx-auto max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem]">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-yellow-400/5 opacity-50 blur-3xl max-md:hidden" />

          <div className="relative min-h-[300px] aspect-video overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl">
            <picture>
              <source media="(max-width: 768px)" srcSet="/push_up-mobile.webp" type="image/webp" />
              <img
                src="/push_up.webp"
                width={1200}
                height={675}
                loading="lazy"
                fetchPriority="low"
                decoding="async"
                alt="AI Push Up Coaching"
                className="absolute inset-0 h-full w-full object-cover opacity-90"
              />
            </picture>

            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 sm:left-6 sm:top-6 sm:gap-3 sm:px-4 sm:py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 sm:h-2 sm:w-2" />
              <span className="text-[8px] font-black uppercase tracking-widest text-white/80 sm:text-[10px]">
                Push-Up Analysis Active
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent p-5 sm:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div>
                  <h3 className="text-xl font-black text-white sm:text-2xl">Full Body Motion Tracking</h3>
                  <p className="mt-1 text-sm text-white/60">
                    AI monitors 17 joint points simultaneously for perfect execution.
                  </p>
                </div>
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-center sm:flex-none sm:px-4 sm:py-2">
                    <div className="text-[8px] font-black uppercase text-white/40">Joint Precision</div>
                    <div className="text-base font-black text-green-400 sm:text-lg">99.8%</div>
                  </div>
                  <div className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-center sm:flex-none sm:px-4 sm:py-2">
                    <div className="text-[8px] font-black uppercase text-white/40">Latency</div>
                    <div className="text-base font-black text-yellow-400 sm:text-lg">12ms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
