import { MagicMomentDeferred } from '@/components/magic-moment-deferred'

export function MagicMomentSection() {
  return (
    <section id="magic-moment" className="reveal is-visible relative scroll-mt-20 overflow-hidden px-4 py-20 sm:px-5 sm:py-28 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/5 blur-[120px] max-md:hidden" />

      <div className="relative z-10 mx-auto max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem]">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
            Magic Moment
          </div>
          <h2 className="text-[clamp(2rem,5.1vw,4.2rem)] font-black leading-[1.05] tracking-tight text-white [@media(min-width:1920px)]:text-[clamp(3.2rem,3.2vw,5rem)]">
            Real-time feedback in <span className="text-green-400">under 1 second.</span>
          </h2>
        </div>

        <MagicMomentDeferred />

        <p className="mx-auto mt-12 max-w-2xl text-center text-lg leading-relaxed text-white/60 sm:mt-14 sm:text-xl">
          &ldquo;It feels like a real trainer is watching every rep.&rdquo;
        </p>
      </div>
    </section>
  )
}
