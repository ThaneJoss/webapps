const baseUrl = (process.env.BASE_URL ?? 'https://thanejoss.com').replace(/\/$/, '')

const targets = [
  { path: '/', status: 200, marker: 'data-page-ready="home"' },
  { path: '/contact', status: 200, marker: 'data-page-ready="contact"' },
  { path: '/production-http-smoke-missing-route', status: 404, marker: 'data-page-ready="not-found"' }
]

const assertHttpResponse = async (target) => {
  const response = await fetch(`${baseUrl}${target.path}`, {
    redirect: 'manual',
    headers: { 'cache-control': 'no-cache' }
  })

  if (response.status !== target.status) {
    throw new Error(`${target.path} HTTP 状态应为 ${target.status}，实际为 ${response.status}。`)
  }

  const html = await response.text()

  if (!html.includes(target.marker)) {
    throw new Error(`${target.path} 未出现语义标记 ${target.marker}。`)
  }
}

for (const target of targets) {
  await assertHttpResponse(target)
}

console.log(`生产 HTTP 语义检查通过：${baseUrl}`)
