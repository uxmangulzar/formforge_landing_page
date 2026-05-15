import fs from 'fs'

const pagePath = 'd:/repvio_landing pag/formforge_landing_page/app/page.tsx'
const snippetPath = 'd:/repvio_landing pag/formforge_landing_page/scripts/solution-steps-block.txt'

let page = fs.readFileSync(pagePath, 'utf8')
const snippet = fs.readFileSync(snippetPath, 'utf8')

if (snippet.includes('motion.')) {
  console.error('snippet has motion tags')
  process.exit(1)
}

if (page.includes('solutionSteps.map')) {
  console.log('already has solution steps')
  process.exit(0)
}

const solutionStart = page.indexOf('<section id="solution"')
const howStart = page.indexOf('<section id="how-it-works"', solutionStart)
const innerStart = page.indexOf('          <motion.div className="max-w-3xl', solutionStart)
const innerStartDiv = page.indexOf('          <div className="max-w-3xl', solutionStart)
const blockStart = innerStartDiv !== -1 ? innerStartDiv : innerStart

const innerEnd = page.lastIndexOf('        </div>', howStart)

page = page.slice(0, blockStart) + snippet + '\n' + page.slice(innerEnd)
fs.writeFileSync(pagePath, page)
console.log('patched solution steps')
