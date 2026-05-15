import fs from 'fs'

const p = 'd:/repvio_landing pag/formforge_landing_page/app/page.tsx'
let c = fs.readFileSync(p, 'utf8')

const start = c.indexOf('<motion.div className="relative aspect-[16/10]')
const startDiv = c.indexOf('<div className="relative aspect-[16/10]')
const blockStart = startDiv !== -1 ? startDiv : start

if (blockStart === -1) {
  if (c.includes('/right_wrong.png')) {
    console.log('already using right_wrong.png')
    process.exit(0)
  }
  console.error('block not found')
  process.exit(1)
}

const ringLine = '                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10 sm:rounded-[2.5rem]" />'
const ringIdx = c.indexOf(ringLine, blockStart)
if (ringIdx === -1) {
  console.error('ring line not found')
  process.exit(1)
}

const replacement = `                <img
                  src="/right_wrong.png"
                  alt="Wrong form versus AI-corrected form comparison"
                  className="w-full h-auto block"
                />
${ringLine}`

c = c.slice(0, blockStart) + replacement + c.slice(ringIdx + ringLine.length)
fs.writeFileSync(p, c)
console.log('done')
