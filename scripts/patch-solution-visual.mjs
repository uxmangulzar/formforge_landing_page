import fs from 'fs'

const pagePath = 'd:/repvio_landing pag/formforge_landing_page/app/page.tsx'
const snippetPath = 'd:/repvio_landing pag/formforge_landing_page/scripts/solution-visual-snippet.txt'

let page = fs.readFileSync(pagePath, 'utf8')
let snippet = fs.readFileSync(snippetPath, 'utf8')

if (snippet.includes('motion.')) {
  console.error('snippet still contains motion.* tags')
  process.exit(1)
}

const marker = 'src="/solution-split.png"'
if (!page.includes(marker)) {
  if (page.includes('PushUpSkeleton variant="wrong"')) {
    console.log('already patched')
    process.exit(0)
  }
  console.error('solution-split block not found')
  process.exit(1)
}

const imgStart = page.lastIndexOf('<img', page.indexOf(marker))
const afterImg = page.indexOf('className="w-full h-auto block"', imgStart)
const imgEnd = page.indexOf('/>', afterImg) + 2

let scan = imgEnd
let removeEnd = imgEnd
for (let i = 0; i < 2; i++) {
  const next = page.indexOf('<div className="absolute inset-0', scan)
  removeEnd = page.indexOf('/>', next) + 2
  scan = removeEnd
}

page = page.slice(0, imgStart) + snippet + page.slice(removeEnd)
fs.writeFileSync(pagePath, page)
console.log('patched solution visual')
