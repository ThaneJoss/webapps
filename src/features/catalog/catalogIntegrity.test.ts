import { describe, expect, it } from 'vitest'

import { routes } from '../../router'
import { catalogApps, interactiveCatalogRoutes } from './apps'

const expectedExternalUrls = [
  'https://file.thanejoss.com',
  'https://chat.thanejoss.com',
  'https://cloudflare.thanejoss.com',
  'https://t3.thanejoss.com',
  'https://codex.thanejoss.com',
  'https://uptime.thanejoss.com',
  'https://portainer.thanejoss.com',
  'https://ssh.thanejoss.com',
  'https://vnc.thanejoss.com',
  'https://card-gallery-joss-projects-83f40f4e.vercel.app'
] as const

describe('catalog integrity', () => {
  it('publishes the ten real websites as unique HTTPS destinations', () => {
    const destinations = catalogApps.flatMap((app) => (
      app.availability === 'planned' ? [] : [app.destination]
    ))
    const externalUrls = destinations.flatMap((destination) => (
      destination.kind === 'external' ? [destination.href] : []
    ))

    expect(catalogApps).toHaveLength(10)
    expect(catalogApps.flatMap((app) => app.features)).toHaveLength(30)
    expect(catalogApps.filter((app) => app.displayTier === 'featured')).toHaveLength(1)
    expect(catalogApps.filter((app) => app.displayTier === 'standard')).toHaveLength(9)
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
