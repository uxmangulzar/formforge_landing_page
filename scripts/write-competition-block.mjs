import fs from 'fs'

const block = `      <section id="challenges" className="relative px-4 sm:px-5 lg:px-8 py-24 sm:py-32 reveal scroll-mt-20 overflow-hidden">
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] bg-green-400/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem] mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-green-400/10 border border-green-400/20 text-green-400 uppercase tracking-[0.2em] text-[10px] font-black mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Competition
            </div>
            <h2 className="text-[clamp(2rem,5.1vw,4.2rem)] [@media(min-width:1920px)]:text-[clamp(3.2rem,3.2vw,5rem)] font-black leading-[1.05] tracking-tight text-white">
              Compete with your <span className="text-green-400">movement.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            <div className="rounded-[2rem] border border-white/10 bg-zinc-900/50 backdrop-blur-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-400/10 border border-green-400/20 text-green-400">
                  <Target size={22} strokeWidth={2.25} />
                </motion.div>
                <p className="text-sm font-bold text-white/70">Squat Score</p>
              </motion.div>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                91<span className="text-xl text-white/35">/100</span>
              </motion.div>
              <div className="mt-5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[91%] rounded-full bg-green-400" />
              </motion.div>
            </motion.div>

            <div className="rounded-[2rem] border border-white/10 bg-zinc-900/50 backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/10 border border-yellow-400/20 text-yellow-400">
                  <Share2 size={22} strokeWidth={2.25} />
                </motion.div>
                <p className="text-sm font-bold text-white/70">Challenge friends</p>
              </motion.div>
              <p className="text-2xl sm:text-3xl font-black text-white leading-tight mb-6">
                Beat my form score
              </p>
              <motion.div className="inline-flex items-center justify-center rounded-xl bg-green-400 px-4 py-3 text-sm font-black text-black">
                Share challenge
              </motion.div>
            </motion.div>

            <div className="rounded-[2rem] border border-white/10 bg-zinc-900/50 backdrop-blur-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-400/10 border border-green-400/20 text-green-400">
                  <Trophy size={22} strokeWidth={2.25} />
                </motion.div>
                <p className="text-sm font-bold text-white/70">Movement leaderboard</p>
              </motion.div>
              <div className="space-y-2">
                {[
                  { name: 'Alex M.', score: 94 },
                  { name: 'You', score: 91, highlight: true },
                  { name: 'Jordan K.', score: 88 },
                ].map((row) => (
                  <div
                    key={row.name}
                    className={\`flex items-center justify-between rounded-xl px-4 py-3 \${
                      row.highlight ? 'bg-green-400/10 border border-green-400/25' : 'bg-white/[0.03]'
                    }\`}
                  >
                    <span className={\`font-semibold \${row.highlight ? 'text-green-400' : 'text-white/80'}\`}>{row.name}</span>
                    <span className={\`font-black \${row.highlight ? 'text-green-400' : 'text-white/50'}\`}>{row.score}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
`

const tag = 'motion' + '.motion.div'
const open = '<' + tag.replace('motion.motion.', '')
const close = '</' + tag.replace('motion.motion.', '') + '>'
let fixed = block.split(open).join('<div').split(close).join('</div>')
fs.writeFileSync('d:/repvio_landing pag/formforge_landing_page/scripts/competition-section-block.txt', fixed)
console.log(fixed.includes('motion') ? 'has motion' : 'ok')
