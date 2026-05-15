import fs from 'fs'

const path = 'app/page.tsx'
let s = fs.readFileSync(path, 'utf8')

const magicRe =
  /          <div className="relative max-w-5xl mx-auto">[\s\S]*?          <\/div>\n\n          <p className="mt-12 sm:mt-14/

if (!magicRe.test(s)) {
  console.error('magic block not found')
  process.exit(1)
}
s = s.replace(
  magicRe,
  '          <MagicMomentDemo />\n\n          <p className="mt-12 sm:mt-14',
)

const lbRe =
  /            \{\/\* Global Leaderboard Section \*\/\}\n            \{\!isSignedUp && \([\s\S]*?            \)\}\n\n            <motion.div className="mt-16 max-w-3xl/
if (!lbRe.test(s)) {
  const lbRe2 =
    /            \{\/\* Global Leaderboard Section \*\/\}\n            \{\!isSignedUp && \([\s\S]*?            \)\}\n\n            <div className="mt-16 max-w-3xl/
  if (!lbRe2.test(s)) {
    console.error('leaderboard block not found')
    process.exit(1)
  }
  s = s.replace(
    lbRe2,
    '            {!isSignedUp && <WaitlistLeaderboard />}\n\n            <div className="mt-16 max-w-3xl',
  )
} else {
  s = s.replace(
    lbRe,
    '            {!isSignedUp && <WaitlistLeaderboard />}\n\n            <div className="mt-16 max-w-3xl',
  )
}

s = s.replaceAll('<ReCAPTCHA\n', '<RecaptchaWidget\n')

s = s.replace(
  '<img\n              src="/push_up.png"',
  '<Image\n              src="/push_up.png"\n              width={1920}\n              height={1080}\n              loading="lazy"',
)
s = s.replace(
  '<img\n                  src="/right_wrong.png"',
  '<Image\n                  src="/right_wrong.png"\n                  width={1200}\n                  height={800}\n                  loading="lazy"',
)
s = s.replace(
  '<img src="/hero.png"',
  '<Image src="/hero.png" width={800} height={600} priority',
)

fs.writeFileSync(path, s)
console.log('patched page.tsx')
