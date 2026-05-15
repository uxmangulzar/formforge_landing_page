import fs from 'fs'

const pagePath = 'd:/repvio_landing pag/formforge_landing_page/app/page.tsx'
const snippetPath = 'd:/repvio_landing pag/formforge_landing_page/scripts/competition-section-block.txt'

let page = fs.readFileSync(pagePath, 'utf8')
const snippet = fs.readFileSync(snippetPath, 'utf8')

if (snippet.includes('motion.')) {
  console.error('snippet has motion tags')
  process.exit(1)
}

const start = page.indexOf('<section id="challenges"')
const end = page.indexOf('<section className="relative px-4 sm:px-5 lg:px-8 py-24 sm:py-32 reveal overflow-hidden">', start + 1)

if (start === -1 || end === -1) {
  console.error('markers not found', start, end)
  process.exit(1)
}

if (page.includes('Compete with your') && page.indexOf('Compete with your', start) < end) {
  console.log('already patched')
  process.exit(0)
}

page = page.slice(0, start) + snippet + '\n\n      ' + page.slice(end)
fs.writeFileSync(pagePath, page)
console.log('patched competition section')
