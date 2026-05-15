import fs from 'fs'

const path = 'app/page.tsx'
let s = fs.readFileSync(path, 'utf8')

s = s.replace(
  /(<p className="mt-3 text-sm text-white\/50">Early access for limited users<\/p>\n\s*)<\/motion\.div>/,
  '$1</div>',
)

const blockRe =
  /\s*(?:<REMOVE_SOCIAL_PROOF_START>\s*)?<div className="mt-4 flex flex-wrap items-center gap-8 text-sm">[\s\S]*?Join 12,000\+ early testers training with AI<\/p>\s*<\/motion.div>\s*<\/motion.div>\s*\n/

if (!blockRe.test(s)) {
  const blockRe2 =
    /\s*(?:<REMOVE_SOCIAL_PROOF_START>\s*)?<div className="mt-4 flex flex-wrap items-center gap-8 text-sm">[\s\S]*?Join 12,000\+ early testers training with AI<\/p>\s*<\/div>\s*<\/div>\s*\n/
  if (!blockRe2.test(s)) {
    console.error('social proof block not found')
    process.exit(1)
  }
  s = s.replace(blockRe2, '\n')
} else {
  s = s.replace(blockRe, '\n')
}

fs.writeFileSync(path, s)
console.log('removed social proof')
