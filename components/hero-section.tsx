const HUD_BAR_HEIGHTS = [30, 60, 40, 80, 55, 70]

export function HeroSection() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 max-md:backdrop-blur-none md:bg-black/60 md:backdrop-blur-xl">
        <div className="max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem] mx-auto px-4 sm:px-5 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="text-xl font-black tracking-tight">
            Repvio <span className="text-green-400">Fit</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#how-it-works" className="hover:text-green-400 transition-colors">How it Works</a>
            <a href="#features" className="hover:text-green-400 transition-colors">Features</a>
            <a href="#feedback" className="hover:text-green-400 transition-colors">Feedback</a>
            <a href="#faq" className="hover:text-green-400 transition-colors">FAQ</a>
          </nav>

          <a href="#waitlist" className="bg-green-400 text-black px-5 py-3 rounded-full text-sm font-bold hover:scale-105 transition-transform">
            Join Beta
          </a>
        </div>
      </header>

      <section className="relative px-4 sm:px-5 lg:px-8 pt-6 pb-10 z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] xl:grid-cols-2 gap-8 xl:gap-12 items-center max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem] mx-auto">
          <div className="max-md:order-2">
            <h1 className="text-[clamp(2rem,5.6vw,5.1rem)] [@media(min-width:1920px)]:text-[clamp(3.8rem,4.2vw,6.2rem)] leading-[1.05] font-black tracking-tight">
              Your workout form is probably <span className="text-green-400">wrong.</span> AI can fix it <span className="text-green-400">instantly.</span>
            </h1>

            <p className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed">
              No trainer. No wearables. Just real-time AI movement feedback.
            </p>

            <div className="mt-8">
              <a href="#waitlist" className="inline-flex bg-green-400 text-black px-8 py-4 rounded-2xl font-black text-lg hover:scale-[1.03] transition-transform shadow-[0_0_30px_rgb(var(--repvio-primary-rgb)/0.4)]">
                Try the Beta
              </a>
              <p className="mt-3 text-sm text-white/50">Early access for limited users</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-white/40">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                No wearables required
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Works with your phone camera
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Train anywhere
              </div>
            </div>
          </div>

          <div className="relative flex max-md:order-1 items-center justify-center lg:justify-end min-h-[280px] sm:min-h-[500px] lg:min-h-[600px] lg:perspective-[2000px] overflow-hidden lg:overflow-visible">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] max-md:hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--repvio-primary-rgb) /0.15),transparent_70%)]" />
              <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px] [transform:rotateX(60deg)_translateZ(-100px)]" />
              </div>
            </div>

            <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-400/20 blur-[120px] rounded-full max-md:hidden md:animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-400/10 blur-[120px] rounded-full max-md:hidden md:animate-pulse [animation-delay:2s]" />

            <div className="relative z-10 w-full max-w-[680px] xl:max-w-[760px] 2xl:max-w-[900px] [@media(min-width:1920px)]:max-w-[1100px] [@media(min-width:2560px)]:max-w-[1300px] transition-all duration-700 lg:[transform-style:preserve-3d] lg:hover:[transform:rotateY(-5deg)_rotateX(5deg)] group">
              <div className="absolute -inset-4 bg-green-400/20 blur-2xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative aspect-[4/3] rounded-xl border border-white/20 bg-zinc-950 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] ring-1 ring-white/10">
                <picture>
                  <source media="(max-width: 768px)" srcSet="/hero-mobile.webp" type="image/webp" />
                  <source media="(min-width: 769px)" srcSet="/hero.webp" type="image/webp" />
                  <img
                    src="/hero-mobile.webp"
                    alt="FormForge AI Pro"
                    width={480}
                    height={360}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    fetchPriority="high"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover opacity-90 md:transition-transform md:duration-1000 group-hover:scale-105"
                  />
                </picture>

                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/60 via-transparent to-white/5 max-md:from-zinc-950/40" />

                <div className="absolute top-6 right-6 max-md:hidden rounded-xl border border-white/10 bg-black/40 p-3 backdrop-blur-md flex flex-col gap-2 [transform:translateZ(50px)]">
                  <div className="flex gap-0.5 h-6 items-end">
                    {HUD_BAR_HEIGHTS.map((h, i) => (
                      <div
                        key={i}
                        className="w-0.5 bg-green-400/40 rounded-full max-md:opacity-70 md:animate-[grow_2s_ease-in-out_infinite]"
                        style={{ height: `${h}%`, animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-zinc-950 to-transparent max-md:hidden">
                  <div className="flex justify-between items-end">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-0.5 rounded-full bg-yellow-400/20 border border-yellow-400/30 text-[8px] font-black text-yellow-400 tracking-wider">BETA_ACCESS</div>
                        <div className="text-[8px] font-mono text-white/20 tracking-widest italic">FF_SYSTEM_v2.0</div>
                      </div>
                      <h3 className="text-xl font-black text-white/90">Real-time Form Metrics</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-green-400 font-mono italic tracking-tighter">98.2%</div>
                      <div className="text-[8px] font-black text-white/30 tracking-[0.3em]">QUALITY SCORE</div>
                    </div>
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
