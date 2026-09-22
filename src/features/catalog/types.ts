export type CatalogAvailability = 'live' | 'beta' | 'planned'

export type CatalogDestination =
  | {
      kind: 'internal'
      href: `/${string}`
    }
  | {
      kind: 'external'
      href: `https://${string}`
    }

interface CatalogAppBase {
  id: string
  /** 首次加入目录的时间，使用带时区的 ISO 8601 格式。 */
  addedAt: string
  label: string
  title: string
  badge: string
  description: string
  features: readonly string[]
}

export type CatalogApp = CatalogAppBase & (
  | {
      availability: 'live' | 'beta'
      destination: CatalogDestination
    }
  | {
      availability: 'planned'
      destination: null
    }
)

export const availabilityLabels: Record<CatalogAvailability, string> = {
  live: '已上线',
  beta: '测试中',
  planned: '规划中'
}
