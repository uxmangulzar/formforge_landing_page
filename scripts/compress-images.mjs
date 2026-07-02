import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const publicDir = path.join(process.cwd(), 'public')

const jobs = [
  { input: 'hero.png', output: 'hero-mobile.webp', width: 480, quality: 68 },
  { input: 'hero.png', output: 'hero.webp', width: 828, quality: 75 },
  { input: 'push_up.png', output: 'push_up-mobile.webp', width: 640, quality: 70 },
  { input: 'push_up.png', output: 'push_up.webp', width: 1200, quality: 75 },
  { input: 'right_wrong.png', output: 'right_wrong-mobile.webp', width: 640, quality: 68 },
  { input: 'right_wrong.png', output: 'right_wrong.webp', width: 1200, quality: 75 },
] as const

async function run() {
  for (const job of jobs) {
    const inputPath = path.join(publicDir, job.input)
    const outputPath = path.join(publicDir, job.output)
    await sharp(inputPath).resize(job.width).webp({ quality: job.quality }).toFile(outputPath)
    const stat = await sharp(outputPath).metadata()
    console.log(`${job.output}: ${stat.width}w`)
  }

  const webps = (await readdir(publicDir)).filter((f) => f.endsWith('.webp'))
  console.log(`\n${webps.length} WebP assets in public/`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
