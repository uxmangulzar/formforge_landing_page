import {
  Activity,
  Camera,
  Dumbbell,
  Gamepad2,
  Heart,
  LineChart,
  Share2,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from 'lucide-react'

const PAIN_POINTS = [
  'You think your form is correct, but it may not be',
  'Small mistakes can lead to injuries over time',
  'No trainer means no real correction',
  'Progress is slower without feedback',
] as const

const SOLUTION_STEPS = [
  { title: 'Open camera', icon: Camera },
  { title: 'Start moving', icon: Activity },
  { title: 'Get instant AI coaching', icon: Sparkles },
] as const

const HOW_IT_WORKS_STEPS = [
  { title: 'Open your camera', icon: Camera },
  { title: 'Move naturally', icon: Activity },
  { title: 'Get AI feedback instantly', icon: Sparkles },
] as const

const FEATURES = [
  { title: 'Train Mode', desc: 'Fix your form while training.', icon: Dumbbell, accent: 'from-green-400/15 via-green-400/5 to-transparent' },
  { title: 'Play Mode', desc: 'Turn workouts into movement-based games.', icon: Gamepad2, accent: 'from-yellow-400/15 via-yellow-400/5 to-transparent' },
  { title: 'Recover Mode', desc: 'Guided mobility and recovery training.', icon: Heart, accent: 'from-cyan-400/15 via-cyan-400/5 to-transparent' },
  { title: 'Progress Tracking', desc: 'Track movement improvement over time.', icon: LineChart, accent: 'from-green-400/10 via-yellow-400/5 to-transparent' },
] as const

const TESTIMONIALS = [
  { name: 'Priya S.', type: 'Beginner', text: "I didn't realize my form was this bad." },
  { name: 'Jay T.', type: 'Gamer', text: 'This makes workouts actually fun.' },
  { name: 'Marcus L.', type: 'Beginner', text: 'It feels like a real coach is watching me.' },
  { name: 'Elena R.', type: 'Recovery', text: "Way better than fitness apps I've used." },
] as const

const UX_ITEMS = [
  { text: 'Train with confidence.', icon: Shield, desc: 'Know you are doing it right.' },
  { text: 'Turn workouts into play.', icon: Gamepad2, desc: 'Gaming meets fitness.' },
  { text: 'Improve every session.', icon: TrendingUp, desc: 'Data-driven progress.' },
  { text: 'Real-time AI feedback.', icon: Zap, desc: 'Instant form corrections.' },
] as const

export function MarketingSectionsStatic() {
  return (
    <>
      <section className="reveal is-visible relative overflow-hidden px-4 py-10 sm:px-5 sm:py-14 lg:px-8">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-yellow-500/5 to-transparent blur-[100px] max-md:hidden" />
        <div className="relative z-10 mx-auto mb-6 max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
            The Problem
          </div>
          <h2 className="text-[clamp(1.9rem,5.2vw,4.2rem)] font-black leading-[1.1] tracking-tight text-white [@media(min-width:1920px)]:text-[clamp(3.2rem,3.4vw,5.2rem)]">
            Most people train <span className="text-green-400">without feedback.</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem]">
          {PAIN_POINTS.map((point, index) => (
            <div key={point} className="group relative rounded-2xl border border-white/5 bg-zinc-900/40 p-8">
              <div className="absolute left-0 right-0 top-0 h-1 rounded-t-2xl bg-yellow-500/30" />
              <div className="text-4xl font-black text-white/10 mb-6">0{index + 1}</div>
              <p className="text-lg font-medium leading-relaxed text-white/70">{point}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="solution" className="reveal is-visible relative scroll-mt-20 overflow-hidden px-4 py-20 sm:px-5 sm:py-28 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400/5 blur-[140px] max-md:hidden" />
        <div className="relative z-10 mx-auto max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem]">
          <div className="mb-12 max-w-3xl sm:mb-16">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              The Solution
            </div>
            <h2 className="text-[clamp(2rem,5.1vw,4.2rem)] font-black leading-[1.05] tracking-tight text-white [@media(min-width:1920px)]:text-[clamp(3.2rem,3.2vw,5rem)]">
              This changes <span className="text-green-400">everything.</span>
            </h2>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] xl:gap-14">
            <div className="space-y-4 sm:space-y-5">
              {SOLUTION_STEPS.map((step, index) => (
                <div key={step.title} className="flex items-center gap-5 rounded-2xl border border-white/10 bg-zinc-900/50 p-5 sm:gap-6 sm:p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-green-500 text-lg font-black text-black sm:h-14 sm:w-14 sm:text-xl">
                    {index + 1}
                  </div>
                  <div className="flex min-w-0 items-center gap-3">
                    <step.icon size={20} className="shrink-0 text-green-400" />
                    <h3 className="text-lg font-black text-white sm:text-xl">{step.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.85)] ring-1 ring-white/5 sm:rounded-[2.5rem]">
                <picture>
                  <source media="(max-width: 768px)" srcSet="/right_wrong-mobile.webp" type="image/webp" />
                  <img
                    src="/right_wrong.webp"
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    alt="Wrong form versus AI-corrected form comparison"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="reveal is-visible relative scroll-mt-20 overflow-hidden px-4 py-16 sm:px-5 sm:py-24 lg:px-8">
        <div className="relative z-10 mx-auto max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem]">
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              How It Works
            </div>
            <h2 className="text-[clamp(2rem,5.1vw,4.2rem)] font-black leading-[1.05] tracking-tight text-white [@media(min-width:1920px)]:text-[clamp(3.2rem,3.2vw,5rem)]">
              Three steps. <span className="text-green-400">Instant coaching.</span>
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-4 sm:gap-6 md:grid-cols-3">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center rounded-2xl border border-white/10 bg-zinc-900/50 p-6 text-center sm:p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-green-500 text-xl font-black text-black">
                  {index + 1}
                </div>
                <step.icon size={24} className="mb-4 text-green-400" strokeWidth={2.5} />
                <h3 className="text-lg font-black leading-snug text-white sm:text-xl">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="reveal is-visible scroll-mt-20 px-4 py-6 sm:px-5 sm:py-10 lg:px-8">
        <div className="relative z-10 mx-auto max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem]">
          <div className="mb-8 max-w-3xl">
            <div className="mb-4 text-xs uppercase tracking-[0.3em] text-green-400">Core Features</div>
            <h2 className="text-[clamp(2rem,5.1vw,4.2rem)] font-black [@media(min-width:1920px)]:text-[clamp(3.2rem,3.2vw,5rem)]">
              Train. Play. Recover. Level up.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/50 p-6 sm:rounded-[2.5rem] sm:p-8">
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-80`} />
                <div className="relative z-10">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-green-400/20 bg-green-400/10 text-green-400">
                    <feature.icon size={26} strokeWidth={2.25} />
                  </div>
                  <h3 className="mb-2 text-2xl font-black tracking-tight text-white sm:text-3xl">{feature.title}</h3>
                  <p className="text-base leading-relaxed text-white/55 sm:text-lg">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="challenges" className="reveal is-visible relative scroll-mt-20 overflow-hidden px-4 py-24 sm:px-5 sm:py-32 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400/5 blur-[140px] max-md:hidden" />
        <div className="relative z-10 mx-auto max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem]">
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Competition
            </div>
            <h2 className="text-[clamp(2rem,5.1vw,4.2rem)] font-black leading-[1.05] tracking-tight text-white [@media(min-width:1920px)]:text-[clamp(3.2rem,3.2vw,5rem)]">
              Compete with your <span className="text-green-400">movement.</span>
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-5 sm:gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-zinc-900/50 p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-green-400/20 bg-green-400/10 text-green-400">
                  <Target size={22} strokeWidth={2.25} />
                </div>
                <p className="text-sm font-bold text-white/70">Squat Score</p>
              </div>
              <div className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                91<span className="text-xl text-white/35">/100</span>
              </div>
              <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[91%] rounded-full bg-green-400" />
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-zinc-900/50 p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/20 bg-yellow-400/10 text-yellow-400">
                  <Share2 size={22} strokeWidth={2.25} />
                </div>
                <p className="text-sm font-bold text-white/70">Challenge friends</p>
              </div>
              <p className="mb-6 text-2xl font-black leading-tight text-white sm:text-3xl">Beat my form score</p>
              <div className="inline-flex items-center justify-center rounded-xl bg-green-400 px-4 py-3 text-sm font-black text-black">
                Share challenge
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-zinc-900/50 p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-green-400/20 bg-green-400/10 text-green-400">
                  <Trophy size={22} strokeWidth={2.25} />
                </div>
                <p className="text-sm font-bold text-white/70">Movement leaderboard</p>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Alex M.', score: 94 },
                  { name: 'You', score: 91, highlight: true },
                  { name: 'Jordan K.', score: 88 },
                ].map((row) => (
                  <div
                    key={row.name}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                      row.highlight ? 'border border-green-400/25 bg-green-400/10' : 'bg-white/[0.03]'
                    }`}
                  >
                    <span className={`font-semibold ${row.highlight ? 'text-green-400' : 'text-white/80'}`}>{row.name}</span>
                    <span className={`font-black ${row.highlight ? 'text-green-400' : 'text-white/50'}`}>{row.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal is-visible relative overflow-hidden px-4 py-24 sm:px-5 sm:py-32 lg:px-8">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-green-400/10 blur-[120px] max-md:hidden" />

        <div className="relative z-10 mx-auto grid max-w-[90rem] items-center gap-20 lg:grid-cols-2 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem]">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-green-400">
              User Experience
            </div>
            <h2 className="mb-10 text-[clamp(2.2rem,5.8vw,6rem)] font-black leading-[0.9] tracking-tighter text-white [@media(min-width:1920px)]:text-[clamp(3.6rem,3.8vw,6.6rem)]">
              Feel coached <br />
              <span className="font-serif italic text-green-400">every rep.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/50 sm:text-xl [@media(min-width:1920px)]:text-2xl">
              Experience a new era of training where AI watches, listens, and guides you through every single movement.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {UX_ITEMS.map((item) => (
              <div key={item.text} className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-zinc-950 text-green-400 shadow-xl">
                  <item.icon size={28} />
                </div>
                <h3 className="mb-2 text-xl font-black leading-tight text-white">{item.text}</h3>
                <p className="text-xs font-bold uppercase leading-relaxed tracking-widest text-white/40">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="feedback" className="reveal is-visible scroll-mt-20 px-4 py-16 sm:px-5 sm:py-24 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <div className="mb-4 text-xs uppercase tracking-[0.3em] text-green-400">Testimonials</div>
          <h2 className="text-[clamp(2rem,5.1vw,4.2rem)] font-black [@media(min-width:1920px)]:text-[clamp(3.2rem,3.2vw,5rem)]">
            What early users <span className="text-green-400">are saying.</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-4 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem]">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.name}
              className="flex min-h-[17rem] flex-col rounded-[2rem] border border-white/10 bg-zinc-900/50 p-7 sm:min-h-[18rem] sm:rounded-[2.25rem] sm:p-9 lg:p-10"
            >
              <div className="mb-5 text-lg tracking-wide text-green-400 sm:text-xl">★★★★★</div>
              <p className="flex-1 text-lg leading-relaxed text-white/80 sm:text-xl">&ldquo;{item.text}&rdquo;</p>
              <div className="mt-7 border-t border-white/10 pt-7">
                <p className="text-lg font-bold text-white">{item.name}</p>
                <p className="mt-1.5 text-base font-semibold text-green-400">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
