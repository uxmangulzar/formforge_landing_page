import { BackgroundDecor } from '@/components/background-decor'
import { BelowHeroStatic } from '@/components/below-hero-static'
import { FaqSection } from '@/components/faq-section'
import { HeroSection } from '@/components/hero-section'
import { MagicMomentSection } from '@/components/magic-moment-section'
import { MarketingSectionsStatic } from '@/components/marketing-sections-static'
import { SiteFooter } from '@/components/site-footer'
import { WaitlistDeferred } from '@/components/waitlist-deferred'

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white selection:bg-green-400 selection:text-black 2xl:text-[17px]">
      <BackgroundDecor />
      <HeroSection />
      <BelowHeroStatic />
      <MarketingSectionsStatic />
      <MagicMomentSection />
      <WaitlistDeferred />
      <FaqSection />
      <SiteFooter />
    </div>
  )
}
