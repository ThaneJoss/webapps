import { mkdir, writeFile } from 'node:fs/promises'

const baseUrl = (process.env.BASE_URL ?? 'https://thanejoss.com').replace(/\/$/, '')
const browserlessEndpoint = (process.env.BROWSERLESS_ENDPOINT ?? 'https://browserless.thanejoss.com').replace(/\/$/, '')
const browserlessToken = process.env.BROWSERLESS_TOKEN || process.env.TOKEN
const artifactDirectory = new URL('../test-results/browserless/', import.meta.url)

const targets = [
  { path: '/', status: 200, marker: 'data-page-ready="home"', name: 'home' },
  { path: '/contact', status: 200, marker: 'data-page-ready="contact"', name: 'contact' },
  { path: '/browserless-smoke-missing-route', status: 404, marker: 'data-page-ready="not-found"', name: 'not-found' }
]

const assertHttpStatus = async (target) => {
  const response = await fetch(`${baseUrl}${target.path}`, {
    redirect: 'manual',
    headers: { 'cache-control': 'no-cache' }
  })

  if (response.status !== target.status) {
    throw new Error(`${target.path} HTTP 状态应为 ${target.status}，实际为 ${response.status}。`)
  }
}

const saveFailureEvidence = async (target, html) => {
  await mkdir(artifactDirectory, { recursive: true })
  await writeFile(new URL(`${target.name}.html`, artifactDirectory), html)

  const screenshotResponse = await fetch(
    `${browserlessEndpoint}/screenshot?token=${encodeURIComponent(browserlessToken)}`,
    {
      method: 'POST',
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        url: `${baseUrl}${target.path}`,
        options: { type: 'png', fullPage: true },
        gotoOptions: { waitUntil: 'domcontentloaded', timeout: 30_000 }
      })
    }
  )

  if (screenshotResponse.ok) {
    await writeFile(
      new URL(`${target.name}.png`, artifactDirectory),
      Buffer.from(await screenshotResponse.arrayBuffer())
    )
  }
}

const renderWithBrowserless = async (target) => {
  const response = await fetch(
    `${browserlessEndpoint}/content?token=${encodeURIComponent(browserlessToken)}`,
    {
      method: 'POST',
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        url: `${baseUrl}${target.path}`,
        gotoOptions: { waitUntil: 'domcontentloaded', timeout: 30_000 }
      })
    }
  )

  if (!response.ok) {
    const sanitizedBody = (await response.text()).slice(0, 300)
    throw new Error(`Browserless /content 返回 ${response.status}：${sanitizedBody}`)
  }

  const html = await response.text()

  if (!html.includes(target.marker)) {
    await saveFailureEvidence(target, html)
    throw new Error(`${target.path} 未出现语义标记 ${target.marker}。`)
  }
}

for (const target of targets) {
  await assertHttpStatus(target)
}

if (!browserlessToken) {
  console.warn('未配置 BROWSERLESS_TOKEN；HTTP 状态检查已完成，Browserless 语义检查已跳过。')
  process.exit(0)
}

for (const target of targets) {
  await renderWithBrowserless(target)
}

console.log(`Browserless 语义检查通过：${baseUrl}`)
