export type PageKey = 'home' | 'contact' | 'notFound'

export interface PageMetadata {
  key: PageKey
  title: string
  description: string
  path: string
  canonical: string | null
  robots: 'index, follow' | 'noindex, nofollow'
}

export const siteName = 'Thane Joss'
export const siteOrigin = 'https://thanejoss.com'

const pageMetadata = {
  home: {
    key: 'home',
    title: `规划中的原生网页 APP | ${siteName}`,
    description: '查看 Thane Joss 正在规划的浏览器工具。所有尚未交付的 APP 都会明确标记为规划中，不提供无效入口。',
    path: '/',
    canonical: `${siteOrigin}/`,
    robots: 'index, follow'
  },
  contact: {
    key: 'contact',
    title: `联系 | ${siteName}`,
    description: '通过邮件、网页表单或 GitHub 联系 Thane Joss，提交网页 APP 建议与项目反馈。',
    path: '/contact',
    canonical: `${siteOrigin}/contact`,
    robots: 'index, follow'
  },
  notFound: {
    key: 'notFound',
    title: `页面未找到 | ${siteName}`,
    description: '你访问的页面不存在，可以返回首页查看规划，或前往联系页面。',
    path: '/404',
    canonical: null,
    robots: 'noindex, nofollow'
  }
} as const satisfies Record<PageKey, PageMetadata>

const normalisePath = (path: string) => {
  const withoutQuery = path.split(/[?#]/, 1)[0] || '/'

  if (withoutQuery === '/') {
    return withoutQuery
  }

  return withoutQuery.replace(/\/$/, '')
}

export const getPageMetadata = (path: string): PageMetadata => {
  const normalisedPath = normalisePath(path)

  if (normalisedPath === pageMetadata.home.path) {
    return pageMetadata.home
  }

  if (normalisedPath === pageMetadata.contact.path) {
    return pageMetadata.contact
  }

  return pageMetadata.notFound
}

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

const replaceMetaTag = (
  html: string,
  attribute: 'name' | 'property',
  key: string,
  content: string
) => {
  const expression = new RegExp(`<meta\\s+[^>]*${attribute}=["']${key}["'][^>]*>`, 'i')
  const replacement = `<meta ${attribute}="${key}" content="${escapeHtml(content)}">`

  return expression.test(html)
    ? html.replace(expression, replacement)
    : html.replace('</head>', `${replacement}</head>`)
}

export const applyPageMetadataToHtml = (html: string, path: string) => {
  const metadata = getPageMetadata(path)
  let output = html.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${escapeHtml(metadata.title)}</title>`
  )

  output = replaceMetaTag(output, 'name', 'description', metadata.description)
  output = replaceMetaTag(output, 'name', 'robots', metadata.robots)
  output = replaceMetaTag(output, 'property', 'og:title', metadata.title)
  output = replaceMetaTag(output, 'property', 'og:description', metadata.description)
  output = replaceMetaTag(output, 'property', 'og:type', 'website')
  output = replaceMetaTag(
    output,
    'property',
    'og:url',
    metadata.canonical ?? `${siteOrigin}${metadata.path}`
  )
  output = replaceMetaTag(output, 'name', 'twitter:card', 'summary')
  output = replaceMetaTag(output, 'name', 'twitter:title', metadata.title)
  output = replaceMetaTag(output, 'name', 'twitter:description', metadata.description)

  const canonicalExpression = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i

  if (metadata.canonical) {
    const canonicalTag = `<link rel="canonical" href="${escapeHtml(metadata.canonical)}">`
    output = canonicalExpression.test(output)
      ? output.replace(canonicalExpression, canonicalTag)
      : output.replace('</head>', `${canonicalTag}</head>`)
  } else {
    output = output.replace(canonicalExpression, '')
  }

  return output
}

const upsertMetaTag = (
  attribute: 'name' | 'property',
  key: string,
  content: string
) => {
  const selector = `meta[${attribute}="${key}"]`
  const existing = document.head.querySelector<HTMLMetaElement>(selector)
  const element = existing ?? document.createElement('meta')

  element.setAttribute(attribute, key)
  element.content = content

  if (!existing) {
    document.head.append(element)
  }
}

export const applyPageMetadata = (path: string) => {
  if (typeof document === 'undefined') {
    return
  }

  const metadata = getPageMetadata(path)
  document.title = metadata.title
  upsertMetaTag('name', 'description', metadata.description)
  upsertMetaTag('name', 'robots', metadata.robots)
  upsertMetaTag('property', 'og:title', metadata.title)
  upsertMetaTag('property', 'og:description', metadata.description)
  upsertMetaTag('property', 'og:type', 'website')
  upsertMetaTag('property', 'og:url', metadata.canonical ?? `${siteOrigin}${metadata.path}`)
  upsertMetaTag('name', 'twitter:card', 'summary')
  upsertMetaTag('name', 'twitter:title', metadata.title)
  upsertMetaTag('name', 'twitter:description', metadata.description)

  const existingCanonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!metadata.canonical) {
    existingCanonical?.remove()
    return
  }

  const canonical = existingCanonical ?? document.createElement('link')
  canonical.rel = 'canonical'
  canonical.href = metadata.canonical

  if (!existingCanonical) {
    document.head.append(canonical)
  }
}
