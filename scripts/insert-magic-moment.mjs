import fs from 'fs'

const pagePath = 'd:/repvio_landing pag/formforge_landing_page/app/page.tsx'
const snippetPath = 'd:/repvio_landing pag/formforge_landing_page/scripts/magic-moment-section.txt'

let page = fs.readFileSync(pagePath, 'utf8')
const snippet = fs.readFileSync(snippetPath, 'utf8')

if (snippet.includes('motion.')) {
  console.error('snippet still has motion tags')
  process.exit(1)
}

if (page.includes('id="magic-moment"')) {
  console.log('already inserted')
  process.exit(0)
}

const anchor = '      </section>\n      <section id="features"'
if (!page.includes(anchor)) {
  console.error('anchor not found')
  process.exit(1)
}

page = page.replace(anchor, `      </section>${snippet}\n      <section id="features"`)
fs.writeFileSync(pagePath, page)
console.log('inserted magic moment section')
