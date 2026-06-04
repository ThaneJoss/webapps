import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const distDir = join(process.cwd(), 'dist')
const htmlPath = join(distDir, 'index.html')
const notFoundHtmlPath = join(distDir, '404.html')

const stylesheetPattern = /<link rel="stylesheet" crossorigin href="([^"]+)">/g
const viewportMetaPattern = /(<meta\s+name="viewport"[\s\S]*?\/>)/u
const descriptionMetaPattern = /<meta\s+name="description"[\s\S]*?\/>/u
const titlePattern = /<title>[\s\S]*?<\/title>/u
const notFoundDescription = '你访问的页面暂时不存在，可以返回首页或联系页面继续浏览。'

const html = await readFile(htmlPath, 'utf8')
const matches = [...html.matchAll(stylesheetPattern)]

let nextHtml = html

for (const match of matches) {
  const [fullTag, href] = match
  const cssPath = join(distDir, href.replace(/^\//, ''))
  const css = await readFile(cssPath, 'utf8')
  const inlineTag = `<style data-inline-critical>${css}</style>`

  nextHtml = nextHtml.replace(fullTag, inlineTag)
}

await writeFile(htmlPath, nextHtml)

const notFoundHtml = nextHtml
  .replace(
    viewportMetaPattern,
    '$1\n    <meta\n      name="robots"\n      content="noindex"\n    />'
  )
  .replace(
    descriptionMetaPattern,
    `<meta\n      name="description"\n      content="${notFoundDescription}"\n    />`
  )
  .replace(titlePattern, '<title>页面未找到 | Thane Joss</title>')

await writeFile(notFoundHtmlPath, notFoundHtml)
