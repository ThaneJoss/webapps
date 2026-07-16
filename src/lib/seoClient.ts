import { getPageMetadata, siteOrigin } from './seo'

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
