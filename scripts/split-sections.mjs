import fs from 'fs'

const pagePath = 'd:/repvio_landing pag/formforge_landing_page/app/page.tsx'
const snippetPath = 'd:/repvio_landing pag/formforge_landing_page/scripts/split-solution-howitworks.txt'

let page = fs.readFileSync(pagePath, 'utf8')
let snippet = fs.readFileSync(snippetPath, 'utf8')

if (snippet.includes('motion.')) {
  console.error('fix motion tags in snippet first')
  process.exit(1)
}

const start = page.indexOf('<section id="how-it-works"')
const end = page.indexOf('<section id="magic-moment"')

if (start === -1 || end === -1) {
  console.error('markers not found', start, end)
  process.exit(1)
}

if (page.includes('id="solution"')) {
  console.log('already split')
  process.exit(0)
}

page = page.slice(0, start) + snippet + '\n      ' + page.slice(end)
fs.writeFileSync(pagePath, page)
console.log('split solution + how-it-works')
