import { describe, expect, it } from 'vitest'

import { routes } from '../../router'
import { catalogApps, getCatalogAppsNewestFirst, getCatalogGroups, getLatestCatalogApp, interactiveCatalogRoutes } from './apps'

const expectedExternalUrls = [
  'https://title2doi.thanejoss.com',
  'https://cf-speed-test.thanejoss.com',
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
  'https://bgp.thanejoss.com',
  'https://epub.thanejoss.com',
  'https://dify.thanejoss.com',
  'https://flow.thanejoss.com',
  'https://manifold.thanejoss.com'
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

  it('publishes verified website and released project destinations with accurate states', () => {
    const destinations = catalogApps.flatMap((app) => (
      app.availability === 'planned' ? [] : [app.destination]
    ))
    const externalUrls = destinations.flatMap((destination) => (
      destination.kind === 'external' ? [destination.href] : []
    ))

    expect(catalogApps).toHaveLength(19)
    expect(catalogApps.filter((app) => app.availability === 'live')).toHaveLength(17)
    expect(catalogApps.find((app) => app.id === 'cloudflare-speed-test')?.availability).toBe('beta')
    const ccfa = catalogApps.find((app) => app.id === 'ccfa')!
    expect(ccfa.availability).toBe('released')
    expect(ccfa.destination).toEqual({ kind: 'repository', href: 'https://github.com/ThaneJoss/ccfa' })
    expect(externalUrls).toEqual(expectedExternalUrls)
    expect(new Set(externalUrls).size).toBe(expectedExternalUrls.length)
    expect(externalUrls).not.toContain('https://ha.thanejoss.com')
    expect(interactiveCatalogRoutes).toEqual([])
  })

  it('links only verified public source repositories and classifies every entry', () => {
    const repositoryUrls = catalogApps.flatMap((app) => (
      app.availability === 'released' ? [app.destination.href] : app.repositoryUrl ? [app.repositoryUrl] : []
    ))

    expect(new Set(repositoryUrls)).toEqual(new Set([
      'https://github.com/ThaneJoss/ccfa',
      'https://github.com/ThaneJoss/title2doi',
      'https://github.com/ThaneJoss/cloudflare-speed-test',
      'https://github.com/ThaneJoss/card-gallery',
      'https://github.com/ThaneJoss/file-transfer',
      'https://github.com/ThaneJoss/cloudflare-usage-guard',
      'https://github.com/ThaneJoss/fast',
      'https://github.com/ThaneJoss/bgp',
      'https://github.com/ThaneJoss/epub',
      'https://github.com/ThaneJoss/flowmaster',
      'https://github.com/ThaneJoss/manifold'
    ]))
    expect(repositoryUrls).toHaveLength(11)
    expect(catalogApps.every((app) => app.category.trim().length > 0)).toBe(true)
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

describe('catalog purpose groups', () => {
  it('assigns every project exactly once to its intended section', () => {
    const groups = getCatalogGroups(catalogApps)

    expect(groups.map(({ id, title, apps }) => ({ id, title, apps: apps.map((app) => app.id) }))).toEqual([
      { id: 'research', title: '研究与实验', apps: ['ccfa', 'title2doi', 'manifold', 'flowmaster'] },
      { id: 'ai', title: 'AI 应用', apps: ['dify', 'ai-api-gateway'] },
      { id: 'development', title: '开发与远程', apps: ['t3-code', 'codex-workbench', 'webssh', 'remote-desktop'] },
      { id: 'network', title: '网络工具', apps: ['cloudflare-speed-test', 'bgp', 'fast'] },
      { id: 'operations', title: '运维管理', apps: ['cloudflare-usage-guard', 'service-status', 'portainer'] },
      { id: 'everyday', title: '日常与收藏', apps: ['leafread', 'card-gallery', 'file-transfer'] }
    ])
    const groupedIds = groups.flatMap((group) => group.apps.map((app) => app.id))
    expect(groupedIds).toHaveLength(catalogApps.length)
    expect(new Set(groupedIds)).toEqual(new Set(catalogApps.map((app) => app.id)))
  })

  it('omits empty groups and sorts each group without changing the source', () => {
    const fast = catalogApps.find((app) => app.id === 'fast')!
    const bgp = catalogApps.find((app) => app.id === 'bgp')!
    const file = catalogApps.find((app) => app.id === 'file-transfer')!
    const apps = Object.freeze([file, fast, bgp])

    expect(getCatalogGroups(apps).map(({ id, apps: grouped }) => ({ id, apps: grouped }))).toEqual([
      { id: 'network', apps: [bgp, fast] },
      { id: 'everyday', apps: [file] }
    ])
    expect(apps).toEqual([file, fast, bgp])
    expect(getCatalogGroups([])).toEqual([])
  })

  it('retains stable ordering for equal timestamps within the same group', () => {
    const t3 = catalogApps.find((app) => app.id === 't3-code')!
    const codex = catalogApps.find((app) => app.id === 'codex-workbench')!

    expect(Date.parse(t3.addedAt)).toBe(Date.parse(codex.addedAt))
    expect(getCatalogGroups([codex, t3])[0]?.apps).toEqual([codex, t3])
    expect(getCatalogGroups([t3, codex])[0]?.apps).toEqual([t3, codex])
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
    const originalApps = catalogApps.filter((app) => !['ccfa', 'title2doi', 'cloudflare-speed-test', 'card-gallery', 'fast', 'bgp', 'leafread', 'dify', 'flowmaster', 'manifold'].includes(app.id))

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
