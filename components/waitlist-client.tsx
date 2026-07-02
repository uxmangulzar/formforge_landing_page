'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import type ReCAPTCHA from 'react-google-recaptcha'
import {
  Award,
  ChevronDown,
  Loader2,
  Mail,
  Search,
  Smartphone,
  Sparkles,
  Target,
  UserPlus,
  X,
  Clipboard,
} from 'lucide-react'
import { showToast } from '@/lib/toast'
import { LazyToaster } from '@/components/lazy-toaster'

const WaitlistLeaderboard = dynamic(
  () => import('@/components/waitlist-leaderboard').then((mod) => ({ default: mod.WaitlistLeaderboard })),
  {
    loading: () => (
      <div
        className="hero-skeleton-pulse mb-12 mt-16 min-h-[22.5rem] rounded-[2rem] border border-white/5 bg-white/[0.02]"
        aria-hidden
      />
    ),
  },
)

const RecaptchaWidget = dynamic(() => import('@/components/recaptcha-widget'), { ssr: false })

export function WaitlistClient() {
  const [email, setEmail] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [device, setDevice] = useState('Choose device')
  const [isDeviceOpen, setIsDeviceOpen] = useState(false)
  const [interest, setInterest] = useState('Select interest')
  const [isInterestOpen, setIsInterestOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSignedUp, setIsSignedUp] = useState(false)
  const [signupData, setSignupData] = useState<any>(null)
  const [signupMessage, setSignupMessage] = useState<string | null>(null)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showDemoVideo, setShowDemoVideo] = useState(false)
  const [statusEmail, setStatusEmail] = useState('')
  const [statusData, setStatusData] = useState<any>(null)
  const [isStatusLoading, setIsStatusLoading] = useState(false)
  const [showRecaptcha, setShowRecaptcha] = useState(false)
  const [showStatusRecaptcha, setShowStatusRecaptcha] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const statusRecaptchaRef = useRef<ReCAPTCHA>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) setReferralCode(ref)
  }, [])

  const handleJoinBeta = async () => {
    if (!email || !email.includes('@')) {
      showToast('error', 'Please enter a valid email address')
      return
    }
    if (device === 'Choose device') {
      showToast('error', 'Please select your device')
      return
    }
    if (interest === 'Select interest') {
      showToast('error', 'Please select your primary interest')
      return
    }
    const captchaValue = recaptchaRef.current?.getValue()
    if (!captchaValue) {
      showToast('error', 'Please complete the reCAPTCHA')
      return
    }

    setIsLoading(true)
    try {
      const api = (await import('@/utils/api')).default
      const response = await api.post('/waitlist/join', {
        email,
        device,
        interest,
        referredByCode: referralCode || undefined,
      })

      if (response.status === 200 || response.status === 201) {
        setSignupData(response.data.data)
        const rawMsg = response.data?.message ?? response.data?.data?.message
        const msg = typeof rawMsg === 'string' && rawMsg.trim() ? rawMsg.trim() : null
        setSignupMessage(msg)
        setIsSignedUp(true)
        showToast('success', msg || 'Successfully joined the waitlist!')
        setEmail('')
        setReferralCode('')
        setDevice('Choose device')
        setInterest('Select interest')
        recaptchaRef.current?.reset()
      }
    } catch (error: any) {
      showToast('error', error.response?.data?.message || 'Failed to join waitlist. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const dismissJoinSuccess = () => {
    setIsSignedUp(false)
    setSignupData(null)
    setSignupMessage(null)
    recaptchaRef.current?.reset()
  }

  const handleCheckStatus = async () => {
    if (!statusEmail || !statusEmail.includes('@')) {
      showToast('error', 'Please enter your registered email')
      return
    }
    const captchaValue = statusRecaptchaRef.current?.getValue()
    if (!captchaValue) {
      showToast('error', 'Please complete the reCAPTCHA')
      return
    }

    setIsStatusLoading(true)
    try {
      const api = (await import('@/utils/api')).default
      const response = await api.get(`/waitlist/status/${statusEmail}`)
      if (response.data.success) {
        setStatusData(response.data.data)
        showToast('success', 'Waitlist status retrieved!')
      }
    } catch (error: any) {
      showToast('error', error.response?.data?.message || 'Email not found on waitlist.')
    } finally {
      setIsStatusLoading(false)
    }
  }

  return (
    <>
      {showDemoVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowDemoVideo(false)} />
          <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl">
            <button
              onClick={() => setShowDemoVideo(false)}
              className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white"
              aria-label="Close demo"
            >
              <X size={24} />
            </button>
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/yGzF92X8x8M?autoplay=1"
              title="Repvio Fit AI Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <section className="reveal is-visible relative scroll-mt-20 px-4 py-24 sm:px-5 sm:py-32 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400/[0.03] blur-[150px] max-md:hidden" />

        <div className="relative z-10 mx-auto w-full max-w-[88rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0A0A] p-5 shadow-2xl sm:rounded-[3rem] sm:p-8 md:rounded-[3.5rem] md:p-14 xl:p-20 2xl:max-w-[112rem] [@media(min-width:1920px)]:max-w-[132rem] [@media(min-width:2560px)]:max-w-[150rem]">
          <div className="text-center">
            <div className="mb-8 flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.4em] text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Join The Waitlist
            </div>

            <h2 className="mb-10 break-words text-[clamp(2rem,5.2vw,5.2rem)] font-black leading-[1.1] tracking-tight text-white [@media(min-width:1920px)]:text-[clamp(3.2rem,3.4vw,5.8rem)]">
              Be among the first to <br />
              <span className="font-serif italic text-green-400">experience AI movement coaching.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl px-4 text-base leading-relaxed text-white/50 sm:text-xl">
              {isSignedUp
                ? 'Your spot is secured. Invite friends to move up the rank.'
                : 'Early beta users get priority access, exclusive features, and referral rewards.'}
            </p>

            {!isSignedUp && <WaitlistLeaderboard />}

            <div className="mx-auto mt-16 max-w-3xl space-y-6">
              {isSignedUp ? (
                <div className="relative rounded-[2rem] border border-green-400/20 bg-green-400/5 py-14 text-center sm:rounded-[2.5rem] sm:py-20">
                  <button
                    type="button"
                    onClick={dismissJoinSuccess}
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/60 sm:right-6 sm:top-6"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                  <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-400/10 text-green-400">
                    <Award size={40} />
                  </div>
                  <div className="mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-green-400">Spot Secured</div>
                  <h3 className="mb-8 text-[clamp(2rem,4.6vw,4.8rem)] font-black text-white [@media(min-width:1920px)]:text-[clamp(3rem,3.2vw,5.4rem)]">
                    You are #{signupData?.position}
                  </h3>
                  <div className="inline-block rounded-xl border border-white/5 bg-white/5 px-6 py-3 font-mono text-sm tracking-widest text-white/40">
                    REF_CODE: <span className="font-bold text-white">{signupData?.user?.referralCode}</span>
                  </div>
                  {signupMessage ? (
                    <p className="mx-auto mt-6 max-w-xl px-2 text-sm leading-relaxed text-white/60 sm:text-base">{signupMessage}</p>
                  ) : null}
                  <button
                    type="button"
                    onClick={dismissJoinSuccess}
                    className="mt-8 text-sm font-bold uppercase tracking-widest text-white/50"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20">
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setShowRecaptcha(true)}
                      placeholder="Enter your professional email"
                      className="w-full rounded-2xl border border-white/10 bg-black py-5 pl-14 pr-4 text-white outline-none focus:border-green-400/50 sm:py-6 sm:pl-16 sm:pr-6 sm:text-lg"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20">
                      <UserPlus size={20} />
                    </div>
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Referral code (optional)"
                      className="w-full rounded-2xl border border-white/10 bg-black py-5 pl-14 pr-4 text-white outline-none focus:border-green-400/50 sm:py-6 sm:pl-16 sm:pr-6 sm:text-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="relative">
                      <div
                        onClick={() => {
                          setIsDeviceOpen(!isDeviceOpen)
                          setIsInterestOpen(false)
                        }}
                        className={`relative w-full cursor-pointer rounded-2xl border bg-black py-5 pl-14 pr-4 text-white sm:py-6 sm:pl-16 sm:pr-6 sm:text-lg ${isDeviceOpen ? 'border-green-400 ring-1 ring-green-400/20' : 'border-white/10'}`}
                      >
                        <div className={`absolute left-6 top-1/2 -translate-y-1/2 ${isDeviceOpen ? 'text-green-400' : 'text-white/20'}`}>
                          <Smartphone size={20} />
                        </div>
                        <span className={device === 'Choose device' ? 'block truncate pr-8 text-white/30' : 'block truncate pr-8'}>
                          {device}
                        </span>
                        <div className={`absolute right-6 top-1/2 -translate-y-1/2 text-white/20 ${isDeviceOpen ? 'rotate-180' : ''}`}>
                          <ChevronDown size={20} />
                        </div>
                      </div>
                      {isDeviceOpen && (
                        <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl">
                          {['iPhone', 'Android'].map((opt) => (
                            <div
                              key={opt}
                              onClick={() => {
                                setDevice(opt)
                                setIsDeviceOpen(false)
                              }}
                              className="cursor-pointer px-6 py-4 font-bold text-white/70 hover:bg-green-400 hover:text-black"
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <div
                        onClick={() => {
                          setIsInterestOpen(!isInterestOpen)
                          setIsDeviceOpen(false)
                        }}
                        className={`relative w-full cursor-pointer rounded-2xl border bg-black py-5 pl-14 pr-4 text-white sm:py-6 sm:pl-16 sm:pr-6 sm:text-lg ${isInterestOpen ? 'border-green-400 ring-1 ring-green-400/20' : 'border-white/10'}`}
                      >
                        <div className={`absolute left-6 top-1/2 -translate-y-1/2 ${isInterestOpen ? 'text-green-400' : 'text-white/20'}`}>
                          <Target size={20} />
                        </div>
                        <span className={interest === 'Select interest' ? 'block truncate pr-8 text-white/30' : 'block truncate pr-8'}>
                          {interest}
                        </span>
                        <div className={`absolute right-6 top-1/2 -translate-y-1/2 text-white/20 ${isInterestOpen ? 'rotate-180' : ''}`}>
                          <ChevronDown size={20} />
                        </div>
                      </div>
                      {isInterestOpen && (
                        <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl">
                          {['Workout form correction', 'Fitness gaming', 'Recovery & mobility'].map((opt) => (
                            <div
                              key={opt}
                              onClick={() => {
                                setInterest(opt)
                                setIsInterestOpen(false)
                              }}
                              className="cursor-pointer px-6 py-4 font-bold text-white/70 hover:bg-green-400 hover:text-black"
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="-my-2 flex min-h-[4.5rem] justify-center py-6 sm:py-4">
                    <div className="origin-center scale-[0.75] sm:scale-100">
                      {showRecaptcha ? (
                        <RecaptchaWidget
                          ref={recaptchaRef}
                          theme="dark"
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 'your-fallback-key'}
                        />
                      ) : null}
                    </div>
                  </div>

                  <button
                    onClick={handleJoinBeta}
                    disabled={isLoading}
                    className="relative w-full overflow-hidden rounded-2xl disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <div className="relative flex items-center justify-center gap-3 bg-green-400 py-6 text-xl font-black text-black">
                      {isLoading ? <Loader2 className="animate-spin" size={24} /> : <>Get Early Access <Sparkles size={20} /></>}
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowStatusModal(true)
                      setShowStatusRecaptcha(true)
                      setStatusData(null)
                      setStatusEmail('')
                    }}
                    className="flex w-full items-center justify-center gap-2 py-4 text-sm font-bold uppercase tracking-widest text-white/40"
                  >
                    <Search size={14} />
                    Already joined? Check your standing
                  </button>
                </>
              )}

              <div className="flex flex-wrap justify-center gap-6 pt-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-green-400" />
                  Invite 3 friends to move up
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-green-400" />
                  Limited beta access available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showStatusModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowStatusModal(false)} />
          <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-y-auto rounded-3xl border border-white/10 bg-[#0A0A0A] shadow-2xl">
            <button
              onClick={() => setShowStatusModal(false)}
              className="absolute right-5 top-5 z-20 text-white/20"
              aria-label="Close status modal"
            >
              <X size={18} />
            </button>
            <div className="p-6 sm:p-12">
              {!statusData ? (
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-400/10 text-green-400 sm:mb-8 sm:h-16 sm:w-16">
                    <Search size={28} />
                  </div>
                  <h3 className="mb-2 text-2xl font-black text-white sm:mb-4 sm:text-3xl">Check Status</h3>
                  <p className="mb-6 text-sm text-white/40 sm:mb-10 sm:text-base">Enter your email to see your position in line.</p>
                  <div className="space-y-4 text-left sm:space-y-6">
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20">
                        <Mail size={20} />
                      </div>
                      <input
                        type="email"
                        value={statusEmail}
                        onChange={(e) => setStatusEmail(e.target.value)}
                        placeholder="Your registered email"
                        className="w-full rounded-2xl border border-white/10 bg-black py-4 pl-14 pr-4 text-white outline-none focus:border-green-400/50 sm:py-6 sm:pl-16 sm:pr-6 sm:text-lg"
                      />
                    </div>
                    <div className="-my-2 flex min-h-[4.5rem] justify-center py-2 sm:my-0">
                      <div className="origin-center scale-[0.8] sm:scale-100">
                        {showStatusRecaptcha ? (
                          <RecaptchaWidget
                            ref={statusRecaptchaRef}
                            theme="dark"
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 'your-fallback-key'}
                          />
                        ) : null}
                      </div>
                    </div>
                    <button
                      onClick={handleCheckStatus}
                      disabled={isStatusLoading}
                      className="flex w-full items-center justify-center gap-3 rounded-2xl bg-green-400 py-6 text-xl font-black text-black disabled:opacity-50"
                    >
                      {isStatusLoading ? <Loader2 className="animate-spin" size={24} /> : 'Verify Status'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-green-400/10 text-green-400 sm:mb-8 sm:h-20 sm:w-20">
                    <Award size={32} />
                  </div>
                  <h3 className="mb-6 text-2xl font-black text-white sm:mb-10 sm:text-4xl">You&apos;re in the elite.</h3>
                  <div className="mb-6 grid grid-cols-2 gap-3 text-left sm:mb-10 sm:gap-4">
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-4 sm:rounded-3xl sm:p-6">
                      <div className="mb-1 text-[8px] font-black uppercase tracking-widest text-white/20 sm:mb-2 sm:text-[10px]">Waitlist_Rank</div>
                      <div className="text-2xl font-black text-white sm:text-4xl">#{statusData.position}</div>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-4 sm:rounded-3xl sm:p-6">
                      <div className="mb-1 text-[8px] font-black uppercase tracking-widest text-white/20 sm:mb-2 sm:text-[10px]">Referrals</div>
                      <div className="text-2xl font-black text-white sm:text-4xl">{statusData.user?.referralCount || 0}</div>
                    </div>
                  </div>
                  <div className="mb-10 rounded-3xl border border-white/10 bg-black p-5 text-left sm:p-6">
                    <div className="mb-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
                      Unique_Referral_Code
                      <span className="text-green-400">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="break-all pr-4 font-mono text-lg font-bold tracking-[0.2em] text-white sm:text-2xl">
                        {statusData.user?.referralCode}
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(statusData.user?.referralCode)
                          showToast('success', 'Code copied to clipboard!')
                        }}
                        className="rounded-xl bg-white/5 p-3 text-white/40"
                        aria-label="Copy referral code"
                      >
                        <Clipboard size={18} />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => setShowStatusModal(false)} className="text-sm font-black uppercase tracking-widest text-white/40">
                    Close Window
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <LazyToaster />
    </>
  )
}
