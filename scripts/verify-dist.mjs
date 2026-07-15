import { readdir, readFile } from 'node:fs/promises'
import { basename, join } from 'node:path'
import { gzipSync } from 'node:zlib'

const distDirectory = new URL('../dist/', import.meta.url)

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message)
  }
}

const readDistFile = (file) => readFile(new URL(file, distDirectory), 'utf8')

const [indexHtml, contactHtml, notFoundHtml, sitemap, robots] = await Promise.all([
  readDistFile('index.html'),
  readDistFile('contact.html'),
  readDistFile('404.html'),
  readDistFile('sitemap.xml'),
  readDistFile('robots.txt')
])

const pages = [
  ['index.html', indexHtml],
  ['contact.html', contactHtml],
  ['404.html', notFoundHtml]
]

assert(indexHtml.includes('data-page-ready="home"'), '首页缺少静态渲染的语义内容。')
assert(contactHtml.includes('data-page-ready="contact"'), '联系页缺少静态渲染的语义内容。')
assert(notFoundHtml.includes('data-page-ready="not-found"'), '404 页面缺少静态渲染的语义内容。')

assert(indexHtml.includes('<title>规划中的原生网页 APP | Thane Joss</title>'), '首页 title 不正确。')
assert(contactHtml.includes('<title>联系 | Thane Joss</title>'), '联系页 title 不正确。')
assert(notFoundHtml.includes('<title>页面未找到 | Thane Joss</title>'), '404 title 不正确。')
assert(indexHtml.includes('href="https://thanejoss.com/"'), '首页 canonical 缺失。')
assert(contactHtml.includes('href="https://thanejoss.com/contact"'), '联系页 canonical 缺失。')
assert(!/rel=["']canonical["']/i.test(notFoundHtml), '404 不应包含 canonical。')
assert(/name=["']robots["'] content=["']noindex, nofollow["']/i.test(notFoundHtml), '404 缺少 noindex。')

assert(sitemap.includes('<loc>https://thanejoss.com/</loc>'), 'sitemap 缺少首页。')
assert(sitemap.includes('<loc>https://thanejoss.com/contact</loc>'), 'sitemap 缺少联系页。')
assert(!sitemap.toLowerCase().includes('404'), 'sitemap 不得包含 404。')
assert(robots.includes('Sitemap: https://thanejoss.com/sitemap.xml'), 'robots.txt 缺少 sitemap 地址。')

for (const [file, html] of pages) {
  assert(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/i.test(html), `${file} 缺少外链样式表。`)
  assert(!/<style\b/i.test(html), `${file} 意外内联了样式表。`)
  assert(!/api\.iconify\.design|@iconify\/vue/i.test(html), `${file} 仍依赖 Iconify 运行时。`)

  const scriptTags = html.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) ?? []

  for (const script of scriptTags) {
    assert(/\ssrc=/i.test(script), `${file} 包含不符合 CSP 的内联脚本。`)

    if (/\btype=["']module["']/i.test(script)) {
      const dataAttributeIndex = script.search(/\bdata-cfasync=["']false["']/i)
      const sourceIndex = script.search(/\bsrc=/i)
      assert(dataAttributeIndex >= 0 && dataAttributeIndex < sourceIndex, `${file} 的模块脚本没有正确排除 Rocket Loader。`)
    }
  }

  const internalAnchorPaths = [...html.matchAll(/<a\b[^>]*href=["'](\/[^"'#?]*)/gi)]
    .map((match) => match[1].replace(/\/$/, '') || '/')
  const allowedInternalPaths = new Set(['/', '/contact'])

  for (const path of internalAnchorPaths) {
    assert(allowedInternalPaths.has(path), `${file} 包含未实现的内部链接：${path}`)
  }
}

const assetDirectory = new URL('assets/', distDirectory)
const assets = await readdir(assetDirectory)
const measuredAssets = assets.filter((file) => /\.(?:css|js)$/.test(file))
let totalGzipBytes = 0

for (const asset of measuredAssets) {
  const content = await readFile(join(assetDirectory.pathname, asset))
  const gzipBytes = gzipSync(content).byteLength
  totalGzipBytes += gzipBytes

  const perAssetBudget = asset.endsWith('.css') ? 50_000 : 120_000
  assert(gzipBytes <= perAssetBudget, `${basename(asset)} 超出单文件 gzip 预算。`)
}

assert(totalGzipBytes <= 220_000, '首版静态资源总 gzip 体积超出 220 KB 预算。')
console.log(`构建产物验证通过：${measuredAssets.length} 个 CSS/JS 资源，gzip 合计 ${totalGzipBytes} 字节。`)
