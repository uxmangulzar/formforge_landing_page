const FAQS = [
  { q: 'Do I need equipment?', a: 'No, just your phone.' },
  { q: 'Does it work on iPhone and Android?', a: 'Yes.' },
  { q: 'Is it free?', a: 'Yes for beta users.' },
  { q: 'Can beginners use it?', a: 'Yes.' },
  { q: 'Is data private?', a: 'Only movement data is used.' },
] as const

export function FaqSection() {
  return (
    <section id="faq" className="reveal is-visible relative scroll-mt-20 px-4 py-24 sm:px-5 sm:py-32 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400/5 blur-[120px] max-md:hidden" />

      <div className="relative z-10 mx-auto mb-16 max-w-5xl text-center 2xl:max-w-6xl [@media(min-width:1920px)]:max-w-[110rem] [@media(min-width:2560px)]:max-w-[130rem]">
        <div className="mb-6 text-xs font-black uppercase tracking-[0.4em] text-green-400">FAQ</div>
        <h2 className="text-[clamp(2.2rem,5.4vw,5rem)] font-black tracking-tight text-white [@media(min-width:1920px)]:text-[clamp(3.2rem,3.4vw,5.6rem)]">
          Common <span className="font-serif italic text-green-400">Questions.</span>
        </h2>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl space-y-4 2xl:max-w-6xl [@media(min-width:1920px)]:max-w-[110rem] [@media(min-width:2560px)]:max-w-[130rem]">
        {FAQS.map((faq, index) => (
          <details
            key={faq.q}
            className="group overflow-hidden rounded-3xl border border-white/5 bg-white/5 open:border-white/20 open:bg-white/10 open:shadow-2xl"
            open={index === 0}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left sm:px-8 sm:py-7 [&::-webkit-details-marker]:hidden">
              <span className="text-base font-bold tracking-tight text-white/80 group-open:text-green-400 sm:text-xl">{faq.q}</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 group-open:rotate-180 group-open:border-green-400 group-open:bg-green-400 group-open:text-black">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-white/5 px-5 pb-6 pt-5 text-base leading-relaxed text-white/50 sm:px-8 sm:pb-8 sm:pt-6 sm:text-lg">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
