import fs from 'fs'

const p = 'd:/repvio_landing pag/formforge_landing_page/app/page.tsx'
let c = fs.readFileSync(p, 'utf8')

const startMarker = '              <div className="relative border-r border-white/10 overflow-hidden">'
const endMarker = '                <span className="text-green-400 font-black text-lg">→</span>'

const start = c.indexOf(startMarker)
if (start === -1) {
  console.error('start marker not found')
  process.exit(1)
}

const endTag = '\n            </div>'
const end = c.indexOf(endTag, c.indexOf(endMarker, start))
if (end === -1) {
  console.error('end not found')
  process.exit(1)
}

c = c.slice(0, start) + c.slice(end + endTag.length)
fs.writeFileSync(p, c)
console.log('removed old split visual block')
