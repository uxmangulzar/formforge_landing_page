import fs from 'fs'

const p = 'd:/repvio_landing pag/formforge_landing_page/app/page.tsx'
let c = fs.readFileSync(p, 'utf8')

const newInner = `              <motion.div className="mb-4 text-green-400 tracking-wide">★★★★★</motion.div>
              <p className="flex-1 text-white/80 text-base sm:text-lg leading-relaxed">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="font-bold text-white">{item.name}</p>
                <p className="mt-1 text-sm font-semibold text-green-400">{item.type}</p>
              </motion.div>`

const newInnerFixed = newInner.replaceAll('<motion.div', '<div').replaceAll('</motion.div>', '</div>')

const marker = 'text-4xl mb-5">★★★★★'
if (!c.includes(marker)) {
  if (c.includes('item.type}')) {
    console.log('already has type field in cards')
    process.exit(0)
  }
  console.error('marker not found')
  process.exit(1)
}

const start = c.indexOf(marker)
const cardStart = c.lastIndexOf('<div', start - 200)
const blockStart = c.lastIndexOf('              <', start)

const endMarker = '{item.name}</div>'
const end = c.indexOf(endMarker, start) + endMarker.length

c = c.slice(0, blockStart) + newInnerFixed + c.slice(end)
fs.writeFileSync(p, c)
console.log('patched testimonial cards')
