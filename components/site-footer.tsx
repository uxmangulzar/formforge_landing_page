import { Facebook, Linkedin, Twitter } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-white/5 bg-black px-5 py-20">
      <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-full bg-gradient-to-t from-green-400/[0.02] to-transparent" />

      <div className="relative z-10 mx-auto max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem]">
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6 text-2xl font-black tracking-tighter">
              Repvio <span className="text-green-400">Fit</span>
            </div>
            <p className="mb-8 max-w-sm text-lg leading-relaxed text-white/40">
              The world&apos;s most advanced AI-powered movement coaching platform. Professional form analysis using only your phone.
            </p>
            <div className="flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <div className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white">Social</div>
            <ul className="space-y-4 text-sm font-medium text-white/40">
              <li>Twitter (X)</li>
              <li>LinkedIn</li>
              <li>Facebook</li>
              <li>Reddit</li>
              <li>Instagram</li>
            </ul>
          </div>

          <div>
            <div className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white">Legal</div>
            <ul className="space-y-4 text-sm font-medium text-white/40">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div>
            <div className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white">Contact</div>
            <ul className="mb-8 space-y-4 text-sm font-medium text-white/40">
              <li>hello@repviofit.ai</li>
            </ul>
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl bg-green-400 px-8 py-4 text-sm font-black text-black shadow-[0_0_20px_rgb(var(--repvio-primary-rgb)/0.2)]"
            >
              Join Waitlist
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-10 md:flex-row">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
            © 2026 <span className="text-green-400">Repvio Fit</span>. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
