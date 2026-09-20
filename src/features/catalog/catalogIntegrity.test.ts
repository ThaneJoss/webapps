import { describe, expect, it } from 'vitest'

import { routes } from '../../router'
import { catalogApps, getLatestCatalogApp, interactiveCatalogRoutes } from './apps'

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
  'https://fast.thanejoss.com'
] as const

describe('catalog integrity', () => {
  it('publishes the live websites as unique HTTPS destinations', () => {
    const destinations = catalogApps.flatMap((app) => (
      app.availability === 'planned' ? [] : [app.destination]
    ))
    const externalUrls = destinations.flatMap((destination) => (
      destination.kind === 'external' ? [destination.href] : []
    ))

    expect(catalogApps).toHaveLength(11)
    expect(catalogApps.flatMap((app) => app.features)).toHaveLength(33)
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

describe('latest catalog app', () => {
  it('uses the last entry without changing catalog order', () => {
    const previous = catalogApps[0]!
    const next = { ...previous, id: 'next-app', title: '下一个应用' }
    const apps = [previous, next]

    expect(getLatestCatalogApp(apps)).toBe(next)
    expect(apps).toEqual([previous, next])
    expect(getLatestCatalogApp([previous])).toBe(previous)
  })

  it('handles an empty catalog', () => {
    expect(getLatestCatalogApp([])).toBeUndefined()
  })
})
