'use client'
import { useEffect, useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Smartphone, Camera, Activity, Sparkles, Trophy, Shield, Gamepad2, TrendingUp, Zap, Mic2, ChevronDown, Plus, Minus, Mail, Target, Loader2, UserPlus, Search, Award, X, Clipboard, Share2, Crown, Medal, Twitter, Linkedin, Facebook } from 'lucide-react'
import api from '@/utils/api'
import { toast } from 'sonner'

export default function FormForgeAILandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
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
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const statusRecaptchaRef = useRef<ReCAPTCHA>(null)

  const handleJoinBeta = async () => {
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    if (device === 'Choose device') {
      toast.error('Please select your device')
      return
    }

    if (interest === 'Select interest') {
      toast.error('Please select your primary interest')
      return
    }

    const captchaValue = recaptchaRef.current?.getValue()
    if (!captchaValue) {
      toast.error('Please complete the reCAPTCHA')
      return
    }

    setIsLoading(true)
    try {
      const response = await api.post('/users/join', {
        email,
        device,
        interest,
        referredByCode: referralCode || undefined,
      })

      if (response.status === 200 || response.status === 201) {
        setSignupData(response.data.data)
        const rawMsg = response.data?.message ?? response.data?.data?.message
        const msg =
          typeof rawMsg === 'string' && rawMsg.trim()
            ? rawMsg.trim()
            : null
        setSignupMessage(msg)
        setIsSignedUp(true)
        toast.success(msg || 'Successfully joined the waitlist!')

        setEmail('')
        setReferralCode('')
        setDevice('Choose device')
        setInterest('Select interest')
        recaptchaRef.current?.reset()
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to join waitlist. Please try again.'
      toast.error(message)
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
      toast.error('Please enter your registered email')
      return
    }

    const captchaValue = statusRecaptchaRef.current?.getValue()
    if (!captchaValue) {
      toast.error('Please complete the reCAPTCHA')
      return
    }

    setIsStatusLoading(true)
    try {
      const response = await api.get(`/users/status/${statusEmail}`)
      if (response.data.success) {
        setStatusData(response.data.data)
        toast.success('Waitlist status retrieved!')
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Email not found on waitlist.'
      toast.error(message)
    } finally {
      setIsStatusLoading(false)
    }
  }

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get('/users/leaderboard')
      if (response.data.success) {
        setLeaderboard(response.data.data)
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    } finally {
      setIsLeaderboardLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaderboard()

    // Set up 2-second auto-sync for the leaderboard
    const syncInterval = setInterval(fetchLeaderboard, 2000)

    // Automatically capture referral code from URL if present (?ref=ABC123)
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) setReferralCode(ref)

    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll('.reveal')
    sections.forEach((section) => observer.observe(section))

    // Previously: disabled right-click + DevTools shortcuts (F12, Ctrl+Shift+I/J, Ctrl+U)
    // This is now commented out so inspect / browser shortcuts keep working normally.
    //
    // const handleContextMenu = (e: MouseEvent) => e.preventDefault()
    // const handleKeyDown = (e: KeyboardEvent) => {
    //   if (
    //     e.key === 'F12' ||
    //     (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
    //     (e.ctrlKey && e.key === 'u')
    //   ) {
    //     e.preventDefault()
    //   }
    // }
    //
    // document.addEventListener('contextmenu', handleContextMenu)
    // document.addEventListener('keydown', handleKeyDown)

    return () => {
      clearInterval(syncInterval)
      sections.forEach((section) => observer.unobserve(section))
      // Cleanup for the (now disabled) context menu / DevTools handlers is no longer needed:
      // document.removeEventListener('contextmenu', handleContextMenu)
      // document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const features = [
    {
      title: 'Train Mode',
      desc: 'Real-time AI form correction for squats, push-ups, lunges, planks, and more.',
      icon: '⦿',
      img: '/feature_ai_tracking_1777653910366.png'
    },
    {
      title: 'Play Mode',
      desc: 'Turn workouts into motion-controlled gaming experiences powered by your movement.',
      icon: '△',
      img: '/feature_fitness_gaming_1777653927143.png'
    },
    {
      title: 'Recover Mode',
      desc: 'AI-guided mobility and recovery exercises for safer movement and faster progress.',
      icon: '✦',
      img: '/feature_realtime_hud_1777653957669.png'
    },
    {
      title: 'Progress Tracking',
      desc: 'Track movement quality, posture improvement, and performance trends over time.',
      icon: '▣',
      img: '/feature_data_analytics_1777653942709.png'
    },
  ]

  const painPoints = [
    'Not sure if your workout form is correct?',
    'Working out alone without feedback?',
    'Can’t afford a personal trainer?',
    'Bored of repetitive workouts?',
    'Want safer recovery exercises?',
  ]

  const testimonials = [
    {
      name: 'Ariana, Beginner Lifter',
      text: 'It feels like having a trainer watching every rep. I instantly fixed my squat depth.',
    },
    {
      name: 'Jay, Gamer & Fitness Creator',
      text: 'The motion gaming mode is insanely addictive. I actually want to work out now.',
    },
    {
      name: 'Mason, Recovery User',
      text: 'The mobility coaching helped me move confidently again after my knee injury.',
    },
  ]

  const faqs = [
    {
      q: 'Do I need equipment?',
      a: 'No. Repvio Fit AI works using only your smartphone camera.',
    },
    {
      q: 'Does it work on iPhone and Android?',
      a: 'Yes. The beta will support both iPhone and Android devices.',
    },
    {
      q: 'Does it require wearables?',
      a: 'No wearables, sensors, or extra hardware required.',
    },
    {
      q: 'Can beginners use it?',
      a: 'Absolutely. Repvio Fit AI is designed to help beginners train with confidence.',
    },
    {
      q: 'Is it good for home workouts?',
      a: 'Yes. The app is built for home workouts, small spaces, and flexible routines.',
    },
    {
      q: 'How accurate is the AI coaching?',
      a: 'Advanced pose tracking analyzes movement patterns in real time to deliver precise feedback.',
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white selection:bg-green-400 selection:text-black overflow-x-hidden 2xl:text-[17px]">
      {/* Dynamic Background Light System */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-green-400/5 blur-[120px] rounded-full animate-[float-orb_20s_infinite_ease-in-out]" />
        <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-yellow-400/5 blur-[150px] rounded-full animate-[float-orb_25s_infinite_ease-in-out_reverse]" />

        {/* Moving Light Beams */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-green-400/[0.03] to-transparent animate-[light-beam_15s_infinite_linear]" />
        <div className="absolute top-[30%] left-0 w-full h-[500px] bg-gradient-to-br from-yellow-400/[0.02] to-transparent animate-[light-beam_20s_infinite_linear_2s]" />
      </div>


      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-black/60">
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

      {/* Demo Video Modal */}
      {showDemoVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500"
            onClick={() => setShowDemoVideo(false)}
          />
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
            <button
              onClick={() => setShowDemoVideo(false)}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <X size={24} />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/yGzF92X8x8M?autoplay=1"
              title="Repvio Fit AI Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}


      <section className="relative px-4 sm:px-5 lg:px-8 pt-6 pb-10 z-10 reveal">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] xl:grid-cols-2 gap-8 xl:gap-12 items-center max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem] mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              AI movement coaching beta opening soon
            </div>

            <h1 className="text-[clamp(2rem,5.6vw,5.1rem)] [@media(min-width:1920px)]:text-[clamp(3.8rem,4.2vw,6.2rem)] leading-[1.05] font-black tracking-tight">
              Your phone camera can now <span className="text-green-400">fix your workout form.</span>
            </h1>

            <p className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed">
              Real-time AI movement coaching, fitness gaming, and recovery training using only your smartphone camera.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#waitlist" className="bg-green-400 text-black px-8 py-4 rounded-2xl font-black text-lg hover:scale-[1.03] transition-transform shadow-[0_0_30px_rgba(74,222,128,0.4)] text-center">
                Get Early Access
              </a>

              <button
                onClick={() => setShowDemoVideo(true)}
                className="border border-white/15 bg-white/5 px-8 py-4 rounded-2xl font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Watch Demo
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-8 text-sm">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-green-400/20 to-zinc-700" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-black bg-green-400 text-black flex items-center justify-center font-bold text-xs">
                  +12k
                </div>
              </div>

              <div className="text-white/60">
                <div className="flex items-center gap-1 text-yellow-400 mb-0.5">
                  {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <p>Join 12,000+ early testers training with AI</p>
              </div>
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

          <div className="relative flex items-center justify-center lg:justify-end min-h-[320px] sm:min-h-[500px] lg:min-h-[600px] lg:perspective-[2000px] overflow-hidden lg:overflow-visible">
            {/* Ultra-Modern Background Scene */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.15),transparent_70%)]" />
              <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px] [transform:rotateX(60deg)_translateZ(-100px)]" />
              </div>
            </div>

            {/* Glowing Orbs for Depth */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-400/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-400/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />

            {/* The Main 3D Perspective Visual */}
            <div className="relative z-10 w-full max-w-[680px] xl:max-w-[760px] 2xl:max-w-[900px] [@media(min-width:1920px)]:max-w-[1100px] [@media(min-width:2560px)]:max-w-[1300px] transition-all duration-700 lg:[transform-style:preserve-3d] lg:hover:[transform:rotateY(-5deg)_rotateX(5deg)] group">

              {/* Reflection/Glow underneath */}
              <div className="absolute -inset-4 bg-green-400/20 blur-2xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Main Frame */}
              <div className="relative rounded-xl border border-white/20 bg-zinc-950 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] ring-1 ring-white/10">
                <img src="/hero.png" alt="FormForge AI Pro" className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105" />

                {/* High-End Glass Overlays */}
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/60 via-transparent to-white/5" />

                {/* Top-Right HUD Element */}
                <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-3 flex flex-col gap-2 [transform:translateZ(50px)]">
                  <div className="flex gap-0.5 h-6 items-end">
                    {[30, 60, 40, 80, 55, 70].map((h, i) => (
                    <div
                      key={i}
                      className="w-0.5 bg-green-400/40 rounded-full animate-[grow_2s_ease-in-out_infinite]"
                      style={{ height: h + '%', animationDelay: i * 0.2 + 's' }}
                    />
                    ))}
                  </div>
                </div>



                {/* Bottom Stats Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-950 to-transparent">
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

      <section className="px-4 sm:px-5 lg:px-8 py-8 sm:py-12 reveal">
        <div className="relative group max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem] mx-auto">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-yellow-400/5 blur-3xl opacity-50" />

          <div className="relative rounded-3xl border border-white/10 bg-zinc-950 overflow-hidden shadow-2xl">
            <img
              src="/push_up.png"
              alt="AI Push Up Coaching"
              className="w-full h-auto min-h-[300px] object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
            />

            {/* Floating Info Tag */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2 sm:gap-3">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] sm:text-[10px] font-black text-white/80 uppercase tracking-widest">Push-Up Analysis Active</span>
            </div>

            {/* Bottom Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 bg-gradient-to-t from-black via-black/60 to-transparent">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">Full Body Motion Tracking</h3>
                  <p className="text-white/60 text-sm mt-1">AI monitors 17 joint points simultaneously for perfect execution.</p>
                </div>
                <div className="flex gap-3 sm:gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-center flex-1 sm:flex-none">
                    <div className="text-[8px] text-white/40 uppercase font-black">Joint Precision</div>
                    <div className="text-base sm:text-lg font-black text-green-400">99.8%</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-center flex-1 sm:flex-none">
                    <div className="text-[8px] text-white/40 uppercase font-black">Latency</div>
                    <div className="text-base sm:text-lg font-black text-yellow-400">12ms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-5 lg:px-8 py-10 sm:py-14 reveal overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-yellow-500/5 to-transparent blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 uppercase tracking-[0.2em] text-[10px] font-black mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            The Problem
          </div>
          <h2 className="text-[clamp(1.9rem,5.2vw,4.2rem)] [@media(min-width:1920px)]:text-[clamp(3.2rem,3.4vw,5.2rem)] font-black leading-[1.1] tracking-tight text-white">
            Most people train <span className="text-white/40 italic font-serif">blindly</span> without knowing if their form is correct.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem] mx-auto">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="group relative bg-zinc-900/40 border border-white/5 rounded-2xl p-8 hover:bg-zinc-900/60 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all duration-500 bg-yellow-500/30 group-hover:bg-yellow-500" />

              <div className="flex flex-col h-full">
                <div className="text-4xl font-black text-white/10 mb-6 group-hover:text-white/20 transition-colors">
                  0{index + 1}
                </div>
                <p className="text-lg font-medium text-white/70 group-hover:text-white transition-colors leading-relaxed">
                  {point}
                </p>
                <div className="mt-auto pt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="w-8 h-[1px] bg-white/20" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Challenge</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="relative py-20 sm:py-24 reveal scroll-mt-20 overflow-hidden">
        {/* Cinematic Scrolling Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/how_it_works.png"
            alt="Background"
            className="w-full h-[125%] object-cover object-center  [animation-timeline:scroll()] [animation-range:0%_100%] animate-[pan-bg_linear_both]"
            style={{
              animationTimeline: 'scroll()',
              animationRange: '0% 100%'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 px-4 sm:px-5 lg:px-8 max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem] mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-6">
            <div className="text-green-400 uppercase tracking-[0.3em] text-xs mb-4">How It Works</div>
            <h2 className="text-[clamp(2rem,5.1vw,4.2rem)] [@media(min-width:1920px)]:text-[clamp(3.2rem,3.2vw,5rem)] font-black">
              AI coaching in seconds.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { title: 'Open app', desc: 'No gear needed, just your phone.', icon: Smartphone },
              { title: 'Point camera', desc: 'Prop it up and step back.', icon: Camera },
              { title: 'Start moving', desc: 'AI tracks your every rep.', icon: Activity },
              { title: 'Get live coaching', desc: 'Instant form corrections.', icon: Sparkles },
              { title: 'Level up', desc: 'Share scores & beat records.', icon: Trophy },
            ].map((step, index) => (
              <div key={step.title} className="group relative bg-zinc-900/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:bg-zinc-900/80 transition-all duration-500 hover:-translate-y-2 hover:border-green-400/30 shadow-2xl">
                {/* Step Connector Line (Desktop) */}
                {index < 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-gradient-to-r from-green-400/30 to-transparent z-0" />
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-500 text-black flex items-center justify-center font-black text-xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-[0_0_20px_rgba(74,222,128,0.3)]">
                    {index + 1}
                  </div>

                  <h3 className="font-black text-2xl mb-3 tracking-tight text-white group-hover:text-green-400 transition-colors">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-8">{step.desc}</p>

                  <div className="h-28 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden group-hover:border-green-400/20 transition-colors">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.1),transparent_70%)]" />
                    {/* Technical HUD Elements */}
                    <div className="absolute top-2 right-2 flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-green-400/40 animate-pulse" />
                      <div className="w-1 h-1 rounded-full bg-green-400/20" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                      <step.icon size={48} className="text-green-400" />
                    </div>
                    <div className="absolute bottom-2 left-3 text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">Tracking_Active</div>

                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-green-400/10 to-transparent animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="px-4 sm:px-5 lg:px-8 py-6 sm:py-10 reveal scroll-mt-20">
        <div className="relative z-10 max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem] mx-auto">
          <div className="max-w-3xl mb-8">
          <div className="text-green-400 uppercase tracking-[0.3em] text-xs mb-4">Core Features</div>
          <h2 className="text-[clamp(2rem,5.1vw,4.2rem)] [@media(min-width:1920px)]:text-[clamp(3.2rem,3.2vw,5rem)] font-black">
            Train. Play. Recover. Level up.
          </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 min-h-[360px] sm:min-h-[400px] flex flex-col justify-between overflow-hidden transition-all duration-700 hover:bg-zinc-900/60 hover:border-green-400/20 shadow-2xl"
              >
              {/* Internal Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top_right,rgba(74,222,128,0.1),transparent_50%)]" />

              <div className="relative z-10">
                <div className="text-5xl sm:text-6xl [@media(min-width:1920px)]:text-7xl text-green-400 mb-8 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3 drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                  {feature.icon}
                </div>
                <h3 className="text-4xl font-black mb-4 tracking-tight text-white group-hover:text-green-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-lg sm:text-xl [@media(min-width:1920px)]:text-2xl leading-relaxed max-w-lg">
                  {feature.desc}
                </p>
              </div>

              <div className="relative z-10 mt-10 h-64 sm:h-72 rounded-3xl bg-black border border-white/5 overflow-hidden group-hover:border-green-400/30 transition-colors duration-700 shadow-inner">
                {/* Visual Background */}
                <img src={feature.img} alt={feature.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.08),transparent_70%)]" />

                {/* Animated Scanner Beam */}
                <div className="absolute inset-0 bg-gradient-to-b from-green-400/20 to-transparent h-1/2 w-full -translate-y-full animate-[scan_3s_infinite_linear] opacity-20 pointer-events-none" />

                {/* Technical HUD Data */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5">
                  <span className="text-[8px] font-mono text-white/50 uppercase tracking-widest">System_Online</span>
                  <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 p-3 sm:p-4 flex items-center">
                  <div className="text-[10px] sm:text-xs font-black text-white/70 uppercase tracking-widest flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    AI Motion Analysis Active
                  </div>
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="challenges" className="relative px-4 sm:px-5 lg:px-8 py-24 sm:py-32 reveal scroll-mt-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem] mx-auto">
          <div className="relative">
            <div className="text-green-400 font-black text-xs uppercase tracking-[0.4em] mb-6">Viral Challenges</div>
            <h2 className="text-[clamp(2.2rem,5.4vw,5.1rem)] [@media(min-width:1920px)]:text-[clamp(3.4rem,3.6vw,5.8rem)] font-black leading-[1.05] tracking-tighter text-white mb-8">
              Compete. Share.<br />
              <span className="text-green-400">Beat your score.</span>
            </h2>

            <p className="text-white/50 text-lg sm:text-xl [@media(min-width:1920px)]:text-2xl leading-relaxed max-w-lg mb-12">
              Turn workouts into competitive challenges with score sharing, rankings, and motion-based achievements.
            </p>

            <div className="flex flex-col gap-6">
              {[
                { label: 'Global Rankings', icon: Activity },
                { label: 'Exclusive Badges', icon: Trophy }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-green-400 group-hover:bg-green-400 group-hover:text-black transition-all duration-500">
                    <item.icon size={22} />
                  </div>
                  <span className="text-white/80 font-semibold tracking-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Ambient Background Aura */}
            <div className="absolute -inset-20 bg-green-400/5 blur-[120px] rounded-full opacity-50" />

            <div className="relative space-y-8">
              {/* Sleek Form Benchmark Card */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>

                <div className="mb-12">
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-4">Benchmark_Result</div>
                  <h3 className="text-4xl font-black text-white">Perfect Squat</h3>
                </div>

                <div className="flex items-end justify-between mb-6">
                  <div className="text-5xl sm:text-6xl [@media(min-width:1920px)]:text-7xl font-black text-white tracking-tighter">91<span className="text-2xl text-white/20">/100</span></div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold text-sm tracking-widest uppercase">Rank_A+</div>
                    <div className="text-[10px] text-white/20 uppercase tracking-widest mt-1">Accuracy_Metric</div>
                  </div>
                </div>

                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[91%] bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]" />
                </div>
              </div>

              {/* Minimal Leaderboard */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 lg:p-10 shadow-2xl">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-bold text-white">Top Performers</h3>
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Global_League</span>
                </div>

                <div className="space-y-2">
                  {[
                    { name: 'Marcus Thorne', score: '98', rank: '01' },
                    { name: 'Sarah Jenkins', score: '91', rank: '02' },
                    { name: 'Elena Rodriguez', score: '87', rank: '03' }
                  ].map((item) => (
                    <div key={item.name} className={`flex items-center justify-between p-5 rounded-2xl transition-all ${item.name === 'Sarah Jenkins' ? 'bg-white/5 border border-white/10' : 'hover:bg-white/[0.02]'}`}>
                      <div className="flex items-center gap-6">
                        <span className="font-mono text-xs text-white/20">{item.rank}</span>
                        <span className={`text-lg font-bold ${item.name === 'Sarah Jenkins' ? 'text-green-400' : 'text-white/80'}`}>{item.name}</span>
                      </div>
                      <span className={`font-black text-xl ${item.name === 'Sarah Jenkins' ? 'text-green-400' : 'text-white/20'}`}>{item.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-5 lg:px-8 py-24 sm:py-32 reveal overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]" />
        {/* Cinematic Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-400/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-400/5 blur-[100px] rounded-full" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem] mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-400/10 border border-green-400/20 text-green-400 uppercase tracking-[0.3em] text-[10px] font-black mb-8">
              User Experience
            </div>
            <h2 className="text-[clamp(2.2rem,5.8vw,6rem)] [@media(min-width:1920px)]:text-[clamp(3.6rem,3.8vw,6.6rem)] font-black leading-[0.9] tracking-tighter text-white mb-10">
              Feel coached <br />
              <span className="text-green-400 italic font-serif">every rep.</span>
            </h2>

            <p className="mt-8 text-white/50 text-lg sm:text-xl [@media(min-width:1920px)]:text-2xl leading-relaxed max-w-xl">
              Experience a new era of training where AI watches, listens, and guides you through every single movement. No more guesswork—just pure, guided progress that feels like a world-class trainer in your pocket.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { text: 'Train with confidence.', icon: Shield, desc: 'Know you are doing it right.' },
              { text: 'Turn workouts into play.', icon: Gamepad2, desc: 'Gaming meets fitness.' },
              { text: 'Improve every session.', icon: TrendingUp, desc: 'Data-driven progress.' },
              { text: 'Real-time AI feedback.', icon: Zap, desc: 'Instant form corrections.' }
            ].map((item) => (
              <div key={item.text} className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-green-400/30 transition-all duration-500 hover:-translate-y-2">
                <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center text-green-400 mb-6 group-hover:bg-green-400 group-hover:text-black transition-all duration-500 shadow-xl">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-white mb-2 leading-tight">{item.text}</h3>
                <p className="text-white/40 text-xs leading-relaxed uppercase tracking-widest font-bold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="feedback" className="px-4 sm:px-5 lg:px-8 py-6 sm:py-10 reveal scroll-mt-20">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <div className="text-green-400 uppercase tracking-[0.3em] text-xs mb-4">Beta Feedback</div>
          <h2 className="text-[clamp(2rem,5.1vw,4.2rem)] [@media(min-width:1920px)]:text-[clamp(3.2rem,3.2vw,5rem)] font-black">
            Early users are obsessed.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem] mx-auto">
          {testimonials.map((item) => (
            <div key={item.name} className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
              <div className="text-green-400 text-4xl mb-5">★★★★★</div>
              <p className="text-white/80 text-lg leading-relaxed">
                “{item.text}”
              </p>
              <div className="mt-6 text-white/50">{item.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="waitlist" className="relative px-4 sm:px-5 lg:px-8 py-24 sm:py-32 reveal scroll-mt-20">
        {/* Cinematic Background Atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-green-400/[0.03] blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-[88rem] 2xl:max-w-[112rem] [@media(min-width:1920px)]:max-w-[132rem] [@media(min-width:2560px)]:max-w-[150rem] mx-auto bg-[#0A0A0A] border border-white/10 rounded-[2rem] sm:rounded-[3rem] md:rounded-[3.5rem] p-5 sm:p-8 md:p-14 xl:p-20 shadow-2xl overflow-hidden group">
          {/* Internal Glowing Border Accent */}
          <div className="absolute inset-0 border border-green-400/10 rounded-[3.5rem] pointer-events-none group-hover:border-green-400/30 transition-colors duration-700" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-green-400/40 to-transparent" />

          <div className="text-center">
            <div className="text-green-400 font-black text-xs uppercase tracking-[0.4em] mb-8 flex items-center justify-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Join The Waitlist
            </div>

            <h2 className="text-[clamp(2rem,5.2vw,5.2rem)] [@media(min-width:1920px)]:text-[clamp(3.2rem,3.4vw,5.8rem)] font-black tracking-tight text-white mb-10 leading-[1.1] break-words">
              Be among the first to <br />
              <span className="text-green-400 italic font-serif">experience AI movement coaching.</span>
            </h2>

            <p className="mt-6 text-white/50 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed px-4">
              {isSignedUp
                ? 'Your spot is secured. Invite friends to move up the rank.'
                : 'Early beta users get priority access, exclusive features, and referral rewards.'}
            </p>

            {/* Global Leaderboard Section */}
            {!isSignedUp && (
              <div className="mt-16 mb-12">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-2">
                  <div className="flex items-center gap-3">
                    <Trophy className="text-green-400 shrink-0" size={18} />
                    <h3 className="text-sm font-black text-white uppercase tracking-[0.3em]">Waitlist Elite</h3>
                  </div>
                  <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                    Priority Queue
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden">
                  {isLeaderboardLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4 text-white/20">
                      <Loader2 className="animate-spin" size={24} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Loading Rankings...</span>
                    </div>
                  ) : leaderboard.length > 0 ? (
                    <div className="divide-y divide-white/5">
                      {leaderboard.slice(0, 5).map((user, idx) => (
                        <div key={idx} className="flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-white/[0.02] transition-colors group gap-4">
                          <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${idx === 0 ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.3)]' :
                              idx === 1 ? 'bg-zinc-300 text-black' :
                                idx === 2 ? 'bg-amber-600 text-white' : 'bg-white/5 text-white/40'
                              }`}>
                              {idx + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-white/80 flex items-center gap-2">
                                <span className="truncate">{user.email.replace(/(.{2})(.*)(?=@)/, (gp1: string, gp2: string, gp3: string) => gp2 + '*'.repeat(gp3.length))}</span>
                                {idx < 3 && <Medal size={12} className={idx === 0 ? 'text-yellow-400 shrink-0' : 'text-white/40 shrink-0'} />}
                              </div>
                              <div className="text-[10px] font-mono text-white/20 tracking-widest truncate">{user.referralCode}</div>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-sm font-black text-white group-hover:text-green-400 transition-colors">{user.referralCount}</div>
                            <div className="text-[8px] font-bold text-white/10 uppercase tracking-tighter">Priority Points</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-white/20 text-[10px] font-bold uppercase tracking-widest">
                      Leaderboard empty. Be the first to lead!
                    </div>
                  )}
                </div>

                {leaderboard.length > 5 && (
                  <div className="mt-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] text-center">
                    + {leaderboard.length - 5} more elite members in the top rank
                  </div>
                )}
              </div>
            )}

            <div className="mt-16 max-w-3xl mx-auto space-y-6">
              {isSignedUp ? (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                  <div className="relative bg-green-400/5 border border-green-400/20 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 text-center py-14 sm:py-20">
                    <button
                      type="button"
                      onClick={dismissJoinSuccess}
                      className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 rounded-full border border-white/10 bg-black/50 text-white/60 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                      aria-label="Close"
                    >
                      <X size={18} />
                    </button>
                    <div className="w-20 h-20 rounded-3xl bg-green-400/10 flex items-center justify-center text-green-400 mx-auto mb-8 animate-bounce">
                      <Award size={40} />
                    </div>
                    <div className="text-[10px] font-black text-green-400 uppercase tracking-[0.4em] mb-4">Spot Secured</div>
                    <h3 className="text-[clamp(2rem,4.6vw,4.8rem)] [@media(min-width:1920px)]:text-[clamp(3rem,3.2vw,5.4rem)] font-black text-white mb-8">You are #{signupData?.position}</h3>
                    <div className="text-sm font-mono text-white/40 tracking-widest bg-white/5 inline-block px-6 py-3 rounded-xl border border-white/5">
                      REF_CODE: <span className="text-white font-bold">{signupData?.user?.referralCode}</span>
                    </div>
                    {signupMessage ? (
                      <p className="mt-6 text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed px-2">
                        {signupMessage}
                      </p>
                    ) : null}
                    <button
                      type="button"
                      onClick={dismissJoinSuccess}
                      className="mt-8 text-white/50 hover:text-green-400 text-sm font-bold uppercase tracking-widest"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative group/input">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-green-400 transition-colors">
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your professional email"
                      className="w-full bg-black border border-white/10 rounded-2xl pl-14 sm:pl-16 pr-4 sm:pr-6 py-5 sm:py-6 text-white outline-none focus:border-green-400/50 focus:bg-white/[0.02] transition-all text-sm sm:text-lg"
                    />
                  </div>

                  {/* Referral Code Input (Optional) */}
                  <div className="relative group/input">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-green-400 transition-colors">
                      <UserPlus size={20} />
                    </div>
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Referral code (optional)"
                      className="w-full bg-black border border-white/10 rounded-2xl pl-14 sm:pl-16 pr-4 sm:pr-6 py-5 sm:py-6 text-white outline-none focus:border-green-400/50 focus:bg-white/[0.02] transition-all text-sm sm:text-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Custom Device Dropdown */}
                    <div className="relative">
                      <div
                        onClick={() => { setIsDeviceOpen(!isDeviceOpen); setIsInterestOpen(false); }}
                        className={`relative w-full bg-black border rounded-2xl pl-14 sm:pl-16 pr-4 sm:pr-6 py-5 sm:py-6 text-white text-sm sm:text-lg cursor-pointer transition-all ${isDeviceOpen ? 'border-green-400 ring-1 ring-green-400/20' : 'border-white/10'}`}
                      >
                        <div className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${isDeviceOpen ? 'text-green-400' : 'text-white/20'}`}>
                          <Smartphone size={20} />
                        </div>
                        <span className={device === 'Choose device' ? 'text-white/30 truncate block pr-8' : 'text-white truncate block pr-8'}>{device}</span>
                        <div className={`absolute right-6 top-1/2 -translate-y-1/2 text-white/20 transition-transform duration-300 ${isDeviceOpen ? 'rotate-180' : ''}`}>
                          <ChevronDown size={20} />
                        </div>
                      </div>

                      {isDeviceOpen && (
                        <div className="absolute z-50 top-full left-0 w-full mt-2 bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2">
                          {['iPhone', 'Android'].map((opt) => (
                            <div
                              key={opt}
                              onClick={() => { setDevice(opt); setIsDeviceOpen(false); }}
                              className="px-6 py-4 hover:bg-green-400 hover:text-black transition-colors cursor-pointer text-white/70 font-bold"
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Custom Interest Dropdown */}
                    <div className="relative">
                      <div
                        onClick={() => { setIsInterestOpen(!isInterestOpen); setIsDeviceOpen(false); }}
                        className={`relative w-full bg-black border rounded-2xl pl-14 sm:pl-16 pr-4 sm:pr-6 py-5 sm:py-6 text-white text-sm sm:text-lg cursor-pointer transition-all ${isInterestOpen ? 'border-green-400 ring-1 ring-green-400/20' : 'border-white/10'}`}
                      >
                        <div className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${isInterestOpen ? 'text-green-400' : 'text-white/20'}`}>
                          <Target size={20} />
                        </div>
                        <span className={interest === 'Select interest' ? 'text-white/30 truncate block pr-8' : 'text-white truncate block pr-8'}>{interest}</span>
                        <div className={`absolute right-6 top-1/2 -translate-y-1/2 text-white/20 transition-transform duration-300 ${isInterestOpen ? 'rotate-180' : ''}`}>
                          <ChevronDown size={20} />
                        </div>
                      </div>

                      {isInterestOpen && (
                        <div className="absolute z-50 top-full left-0 w-full mt-2 bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2">
                          {['Workout form correction', 'Fitness gaming', 'Recovery & mobility'].map((opt) => (
                            <div
                              key={opt}
                              onClick={() => { setInterest(opt); setIsInterestOpen(false); }}
                              className="px-6 py-4 hover:bg-green-400 hover:text-black transition-colors cursor-pointer text-white/70 font-bold"
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Google reCAPTCHA Integration */}
                  <div className="flex justify-center py-6 sm:py-4 scale-[0.75] sm:scale-100 origin-center -my-2">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      theme="dark"
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 'your-fallback-key'}
                    />
                  </div>

                  <button
                    onClick={handleJoinBeta}
                    disabled={isLoading}
                    className="w-full relative group/btn overflow-hidden rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-green-400 transition-transform duration-500 group-hover:scale-105" />
                    <div className="relative bg-green-400 text-black py-6 font-black text-xl flex items-center justify-center gap-3">
                      {isLoading ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        <>
                          Join Beta
                          <Sparkles size={20} />
                        </>
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => { setShowStatusModal(true); setStatusData(null); setStatusEmail(''); }}
                    className="w-full py-4 text-white/40 hover:text-green-400 transition-colors text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <Search size={14} />
                    Already joined? Check your standing
                  </button>
                </>
              )}

              <div className="pt-8 flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-green-400" />
                  Invite 3 friends to move up
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-green-400" />
                  Limited beta spots remaining
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="relative px-4 sm:px-5 lg:px-8 py-24 sm:py-32 reveal scroll-mt-20">
        {/* Background Subtle Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-green-400/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center mb-16 max-w-5xl 2xl:max-w-6xl [@media(min-width:1920px)]:max-w-[110rem] [@media(min-width:2560px)]:max-w-[130rem] mx-auto">
          <div className="text-green-400 font-black text-xs uppercase tracking-[0.4em] mb-6">FAQ</div>
          <h2 className="text-[clamp(2.2rem,5.4vw,5rem)] [@media(min-width:1920px)]:text-[clamp(3.2rem,3.4vw,5.6rem)] font-black tracking-tight text-white">
            Common <span className="text-green-400 italic font-serif">Questions.</span>
          </h2>
        </div>

        <div className="relative z-10 space-y-4 max-w-5xl 2xl:max-w-6xl [@media(min-width:1920px)]:max-w-[110rem] [@media(min-width:2560px)]:max-w-[130rem] mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group border rounded-3xl transition-all duration-500 overflow-hidden ${openFaq === index ? 'bg-white/10 border-white/20 shadow-2xl scale-[1.02]' : 'bg-white/5 border-white/5 hover:border-white/15'}`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-5 sm:px-8 py-5 sm:py-7 flex items-center justify-between text-left transition-colors gap-4"
              >
                <span className={`text-base sm:text-xl font-bold tracking-tight ${openFaq === index ? 'text-green-400' : 'text-white/80'}`}>{faq.q}</span>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${openFaq === index ? 'bg-green-400 border-green-400 text-black rotate-180' : 'bg-white/5 border-white/10 text-white/40'}`}>
                  <ChevronDown size={18} />
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-5 sm:px-8 pb-6 sm:pb-8 text-base sm:text-lg text-white/50 leading-relaxed border-t border-white/5 pt-5 sm:pt-6">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 bg-black px-5 py-20 mt-20 relative overflow-hidden">
        {/* Status Modal Overlay */}
        {showStatusModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowStatusModal(false)} />

            <div className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col max-h-[92vh] overflow-y-auto">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400/40 to-transparent" />

              <button
                onClick={() => setShowStatusModal(false)}
                className="absolute top-5 right-5 text-white/20 hover:text-white transition-colors z-20"
              >
                <X size={18} />
              </button>

              <div className="p-6 sm:p-12">

                {!statusData ? (
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-green-400/10 flex items-center justify-center text-green-400 mx-auto mb-4 sm:mb-8">
                      <Search size={28} />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 sm:mb-4">Check Status</h3>
                    <p className="text-white/40 mb-6 sm:mb-10 text-sm sm:text-base">Enter your email to see your position in line.</p>

                    <div className="space-y-4 sm:space-y-6 text-left">
                      <div className="relative group/input">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-green-400 transition-colors">
                          <Mail size={20} />
                        </div>
                        <input
                          type="email"
                          value={statusEmail}
                          onChange={(e) => setStatusEmail(e.target.value)}
                          placeholder="Your registered email"
                          className="w-full bg-black border border-white/10 rounded-2xl pl-14 sm:pl-16 pr-4 sm:pr-6 py-4 sm:py-6 text-white outline-none focus:border-green-400/50 focus:bg-white/[0.02] transition-all text-base sm:text-lg"
                        />
                      </div>

                      <div className="flex justify-center py-2 scale-[0.8] sm:scale-100 -my-2 sm:my-0">
                        <ReCAPTCHA
                          ref={statusRecaptchaRef}
                          theme="dark"
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 'your-fallback-key'}
                        />
                      </div>

                      <button
                        onClick={handleCheckStatus}
                        disabled={isStatusLoading}
                        className="w-full bg-green-400 text-black py-6 rounded-2xl font-black text-xl hover:scale-[1.01] transition-transform disabled:opacity-50 flex items-center justify-center gap-3"
                      >
                        {isStatusLoading ? <Loader2 className="animate-spin" size={24} /> : 'Verify Status'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-3xl bg-green-400/10 flex items-center justify-center text-green-400 mx-auto mb-4 sm:mb-8">
                      <Award size={32} />
                    </div>

                    <div className="text-[8px] sm:text-[10px] font-black text-green-400 uppercase tracking-[0.4em] mb-2 sm:mb-4">Verification Successful</div>
                    <h3 className="text-2xl sm:text-4xl font-black text-white mb-6 sm:mb-10">You're in the elite.</h3>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-10 text-left">
                      <div className="bg-white/5 border border-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
                        <div className="text-[8px] sm:text-[10px] font-black text-white/20 uppercase tracking-widest mb-1 sm:mb-2">Waitlist_Rank</div>
                        <div className="text-2xl sm:text-4xl font-black text-white">#{statusData.position}</div>
                      </div>
                      <div className="bg-white/5 border border-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
                        <div className="text-[8px] sm:text-[10px] font-black text-white/20 uppercase tracking-widest mb-1 sm:mb-2">Referrals</div>
                        <div className="text-2xl sm:text-4xl font-black text-white">{statusData.user?.referralCount || 0}</div>
                      </div>
                    </div>

                    <div className="bg-black border border-white/10 rounded-3xl p-5 sm:p-6 text-left mb-10">
                      <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4 flex items-center justify-between">
                        Unique_Referral_Code
                        <span className="text-green-400">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-lg sm:text-2xl font-mono font-bold text-white tracking-[0.2em] break-all pr-4">{statusData.user?.referralCode}</div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(statusData.user?.referralCode);
                            toast.success('Code copied to clipboard!');
                          }}
                          className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white/40"
                        >
                          <Clipboard size={18} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowStatusModal(false)}
                      className="text-white/40 hover:text-white transition-colors text-sm font-black uppercase tracking-widest"
                    >
                      Close Window
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Background Subtle Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-green-400/[0.02] to-transparent pointer-events-none" />

        <div className="max-w-[90rem] 2xl:max-w-[120rem] [@media(min-width:1920px)]:max-w-[140rem] [@media(min-width:2560px)]:max-w-[160rem] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
            <div className="lg:col-span-2">
              <div className="text-2xl font-black tracking-tighter mb-6">
                Repvio <span className="text-green-400">Fit</span>
              </div>
              <p className="text-white/40 text-lg leading-relaxed max-w-sm mb-8">
                The world's most advanced AI-powered movement coaching platform. Professional form analysis using only your phone.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-green-400 transition-all hover:border-green-400/30 hover:-translate-y-1">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-green-400 transition-all hover:border-green-400/30 hover:-translate-y-1">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-green-400 transition-all hover:border-green-400/30 hover:-translate-y-1">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-green-400 transition-all hover:border-green-400/30 hover:-translate-y-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.5 13.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zm-4.5 0c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zm9 0c0 2.485-2.015 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-4.5-9c-3.314 0-6 2.686-6 6 0 .341.028.675.083 1 .15.894.49 1.714.977 2.41 1.05 1.503 2.872 2.59 4.94 2.59s3.89-1.087 4.94-2.59c.487-.696.827-1.516.977-2.41.055-.325.083-.659.083-1 0-3.314-2.686-6-6-6z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <div className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Social</div>
              <ul className="space-y-4 text-white/40 text-sm font-medium">
                <li className="hover:text-green-400 transition-colors cursor-pointer">Twitter (X)</li>
                <li className="hover:text-green-400 transition-colors cursor-pointer">LinkedIn</li>
                <li className="hover:text-green-400 transition-colors cursor-pointer">Facebook</li>
                <li className="hover:text-green-400 transition-colors cursor-pointer">Reddit</li>
                <li className="hover:text-green-400 transition-colors cursor-pointer">Instagram</li>
              </ul>
            </div>

            <div>
              <div className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Legal</div>
              <ul className="space-y-4 text-white/40 text-sm font-medium">
                <li className="hover:text-green-400 transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-green-400 transition-colors cursor-pointer">Terms of Service</li>
              </ul>
            </div>

            <div>
              <div className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Contact</div>
              <ul className="space-y-4 text-white/40 text-sm font-medium mb-8">
                <li className="hover:text-green-400 transition-colors cursor-pointer">hello@repviofit.ai</li>
              </ul>
              <a href="#waitlist" className="inline-flex items-center justify-center bg-green-400 text-black px-8 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(74,222,128,0.2)] whitespace-nowrap">
                Join Waitlist
              </a>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
              © 2026 <a href="https://codesteem.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-400 transition-colors">Codesteem</a>. All rights reserved.
            </div>
            {/* <div className="flex gap-8 text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
               <span>v0.12.0_Beta</span>
               <span>Status: Operational</span>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  )
}
