import { describe, expect, it } from 'vitest'

import { routes } from '../../router'
import { catalogApps, interactiveCatalogRoutes } from './apps'

describe('catalog integrity', () => {
  it('does not expose planned apps or entries as routes', () => {
    const entries = catalogApps.flatMap((app) => app.quickEntries)

    expect(catalogApps).toHaveLength(10)
    expect(entries).toHaveLength(35)
    expect(catalogApps.every((app) => app.availability === 'planned' && app.route === null)).toBe(true)
    expect(entries.every((entry) => entry.availability === 'planned' && entry.route === null)).toBe(true)
    expect(interactiveCatalogRoutes).toEqual([])
  })

  it('requires every future interactive catalog route to exist in the router', () => {
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
