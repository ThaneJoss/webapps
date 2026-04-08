import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const distDir = join(process.cwd(), 'dist')
const htmlPath = join(distDir, 'index.html')

const stylesheetPattern = /<link rel="stylesheet" crossorigin href="([^"]+)">/g

const html = await readFile(htmlPath, 'utf8')
const matches = [...html.matchAll(stylesheetPattern)]

if (matches.length === 0) {
  process.exit(0)
}

let nextHtml = html

for (const match of matches) {
  const [fullTag, href] = match
  const cssPath = join(distDir, href.replace(/^\//, ''))
  const css = await readFile(cssPath, 'utf8')
  const inlineTag = `<style data-inline-critical>${css}</style>`

  nextHtml = nextHtml.replace(fullTag, inlineTag)
}

await writeFile(htmlPath, nextHtml)
