export type CatalogAvailability = 'live' | 'beta' | 'released' | 'planned'

export type CatalogDestination =
  | {
      kind: 'internal'
      href: `/${string}`
    }
  | {
      kind: 'external'
      href: `https://${string}`
    }
  | {
      kind: 'repository'
      href: `https://github.com/ThaneJoss/${string}`
    }

interface CatalogAppBase {
  id: string
  /** 首次加入目录的时间，使用带时区的 ISO 8601 格式。 */
  addedAt: string
  label: string
  title: string
  category: string
  badge: string
  description: string
  features: readonly string[]
  repositoryUrl?: `https://github.com/ThaneJoss/${string}`
}

export type CatalogApp = CatalogAppBase & (
  | {
      availability: 'live' | 'beta'
      destination: Exclude<CatalogDestination, { kind: 'repository' }>
    }
  | {
      availability: 'released'
      destination: Extract<CatalogDestination, { kind: 'repository' }>
    }
  | {
      availability: 'planned'
      destination: null
    }
)

export const availabilityLabels: Record<CatalogAvailability, string> = {
  live: '已上线',
  beta: '测试中',
  released: '已发布',
  planned: '规划中'
}
