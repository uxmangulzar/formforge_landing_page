import fs from 'fs'

const pagePath = 'd:/repvio_landing pag/formforge_landing_page/app/page.tsx'
const snippetPath = 'd:/repvio_landing pag/formforge_landing_page/scripts/features-section-block.txt'

let page = fs.readFileSync(pagePath, 'utf8')
const snippet = fs.readFileSync(snippetPath, 'utf8')

if (snippet.includes('motion.')) {
  console.error('snippet has motion')
  process.exit(1)
}

const start = page.indexOf('          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">')
const alt = page.indexOf('          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">')
if (alt !== -1 && start === -1) {
  console.log('already patched')
  process.exit(0)
}
if (start === -1) {
  console.error('start not found')
  process.exit(1)
}

const end = page.indexOf('          </div>\n        </div>\n      </section>\n\n      <section id="challenges"', start)
if (end === -1) {
  console.error('end not found')
  process.exit(1)
}

page = page.slice(0, start) + snippet + page.slice(end)
fs.writeFileSync(pagePath, page)
console.log('patched features section')
