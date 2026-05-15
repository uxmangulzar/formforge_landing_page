'use client'

import { useEffect, useRef, useState } from 'react'
import { Trophy, Loader2, Medal } from 'lucide-react'
import api from '@/utils/api'

const LEADERBOARD_SYNC_MS = 30_000

export function WaitlistLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true)
  const inViewRef = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchLeaderboard = async () => {
      if (!inViewRef.current || document.hidden) return
      try {
        const response = await api.get('/waitlist/leaderboard')
        if (!cancelled && response.data.success) {
          setLeaderboard(response.data.data)
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error)
      } finally {
        if (!cancelled) setIsLeaderboardLoading(false)
      }
    }

    const startPolling = () => {
      if (intervalRef.current) return
      fetchLeaderboard()
      intervalRef.current = setInterval(fetchLeaderboard, LEADERBOARD_SYNC_MS)
    }

    const stopPolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    const onVisibility = () => {
      if (document.hidden) stopPolling()
      else if (inViewRef.current) startPolling()
    }

    const section = document.getElementById('waitlist')
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
        if (entry.isIntersecting && !document.hidden) startPolling()
        else stopPolling()
      },
      { rootMargin: '200px 0px' },
    )

    if (section) observer.observe(section)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      stopPolling()
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
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
              <div
                key={`${user.referralCode}-${idx}`}
                className="flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-white/[0.02] transition-colors group gap-4"
              >
                <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                      idx === 0
                        ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgb(var(--repvio-secondary-rgb) /0.3)]'
                        : idx === 1
                          ? 'bg-zinc-300 text-black'
                          : idx === 2
                            ? 'bg-amber-600 text-white'
                            : 'bg-white/5 text-white/40'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white/80 flex items-center gap-2">
                      <span className="truncate">
                        {user.email.replace(/(.{2})(.*)(?=@)/, (gp1: string, gp2: string, gp3: string) => gp2 + '*'.repeat(gp3.length))}
                      </span>
                      {idx < 3 && (
                        <Medal size={12} className={idx === 0 ? 'text-yellow-400 shrink-0' : 'text-white/40 shrink-0'} />
                      )}
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
  )
}
