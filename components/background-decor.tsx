export function BackgroundDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
      <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-green-400/5 blur-[120px] rounded-full max-md:opacity-60 md:animate-[float-orb_20s_infinite_ease-in-out]" />
      <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-yellow-400/5 blur-[150px] rounded-full max-md:opacity-50 md:animate-[float-orb_25s_infinite_ease-in-out_reverse]" />
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-green-400/[0.03] to-transparent max-md:opacity-80 md:animate-[light-beam_15s_infinite_linear]" />
      <div className="absolute top-[30%] left-0 w-full h-[500px] bg-gradient-to-br from-yellow-400/[0.02] to-transparent max-md:hidden md:animate-[light-beam_20s_infinite_linear_2s]" />
    </div>
  )
}
