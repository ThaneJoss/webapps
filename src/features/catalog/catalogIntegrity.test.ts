import { describe, expect, it } from 'vitest'

import { routes } from '../../router'
import { catalogApps, getCatalogAppsNewestFirst, getLatestCatalogApp, interactiveCatalogRoutes } from './apps'

const expectedExternalUrls = [
  'https://card.thanejoss.com',
  'https://file.thanejoss.com',
  'https://chat.thanejoss.com',
  'https://cloudflare.thanejoss.com',
  'https://t3.thanejoss.com',
  'https://codex.thanejoss.com',
  'https://uptime.thanejoss.com',
  'https://portainer.thanejoss.com',
  'https://ssh.thanejoss.com',
  'https://vnc.thanejoss.com',
  'https://fast.thanejoss.com',
  'https://bgp.thanejoss.com'
] as const

describe('catalog integrity', () => {
  it('records a valid ISO addition timestamp with an explicit timezone for every app', () => {
    for (const app of catalogApps) {
      expect(app.addedAt, `${app.id} addition timestamp`).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})$/
      )
      expect(Number.isFinite(Date.parse(app.addedAt)), `${app.id} addition timestamp is valid`).toBe(true)
    }
  })

  it('publishes the live websites as unique HTTPS destinations', () => {
    const destinations = catalogApps.flatMap((app) => (
      app.availability === 'planned' ? [] : [app.destination]
    ))
    const externalUrls = destinations.flatMap((destination) => (
      destination.kind === 'external' ? [destination.href] : []
    ))

    expect(catalogApps).toHaveLength(12)
    expect(catalogApps.flatMap((app) => app.features)).toHaveLength(36)
    expect(catalogApps.every((app) => app.availability === 'live')).toBe(true)
    expect(externalUrls).toEqual(expectedExternalUrls)
    expect(new Set(externalUrls).size).toBe(expectedExternalUrls.length)
    expect(externalUrls).not.toContain('https://ha.thanejoss.com')
    expect(interactiveCatalogRoutes).toEqual([])
  })

  it('requires every future internal catalog destination to exist in the router', () => {
    const applicationRoutes = new Set(
      routes
        .map((route) => route.path)
        .filter((path) => !path.includes(':pathMatch'))
    )

    for (const path of interactiveCatalogRoutes) {
      expect(applicationRoutes.has(path), `Catalog route ${path} is not registered`).toBe(true)
    }
  })
})

describe('catalog addition time ordering', () => {
  it('sorts by addition time and selects the latest independently of source position', () => {
    const original = catalogApps.find((app) => app.id === 'file-transfer')!
    const card = catalogApps.find((app) => app.id === 'card-gallery')!
    const fast = catalogApps.find((app) => app.id === 'fast')!
    const bgp = catalogApps.find((app) => app.id === 'bgp')!
    const apps = Object.freeze([fast, original, bgp, card])

    expect(getCatalogAppsNewestFirst(apps)).toEqual([bgp, fast, card, original])
    expect(getLatestCatalogApp(apps)).toBe(bgp)
    expect(apps).toEqual([fast, original, bgp, card])
  })

  it('compares timezone-aware instants and preserves source order for equal times', () => {
    const fast = catalogApps.find((app) => app.id === 'fast')!
    const utcEntry = { ...fast, id: 'fast-utc', addedAt: new Date(fast.addedAt).toISOString() }
    const offsetEntry = { ...fast, id: 'fast-offset' }
    const apps = Object.freeze([utcEntry, offsetEntry])

    expect(utcEntry.addedAt).not.toBe(offsetEntry.addedAt)
    expect(Date.parse(utcEntry.addedAt)).toBe(Date.parse(offsetEntry.addedAt))
    expect(getCatalogAppsNewestFirst(apps)).toEqual([utcEntry, offsetEntry])
    expect(getCatalogAppsNewestFirst([offsetEntry, utcEntry])).toEqual([offsetEntry, utcEntry])
    expect(getLatestCatalogApp(apps)).toBe(utcEntry)
    expect(apps).toEqual([utcEntry, offsetEntry])
  })

  it('keeps applications added in the same commit in their existing order', () => {
    const originalApps = catalogApps.filter((app) => !['card-gallery', 'fast', 'bgp'].includes(app.id))

    expect(new Set(originalApps.map((app) => Date.parse(app.addedAt))).size).toBe(1)
    expect(getCatalogAppsNewestFirst(originalApps)).toEqual(originalApps)
    expect(getLatestCatalogApp(originalApps)).toBe(originalApps[0])
  })

  it('handles a single entry without changing its input', () => {
    const app = catalogApps[0]!
    const apps = Object.freeze([app])

    expect(getCatalogAppsNewestFirst(apps)).toEqual([app])
    expect(getLatestCatalogApp(apps)).toBe(app)
    expect(apps).toEqual([app])
  })

  it('handles an empty catalog', () => {
    expect(getCatalogAppsNewestFirst([])).toEqual([])
    expect(getLatestCatalogApp([])).toBeUndefined()
  })
})
