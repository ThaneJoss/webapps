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
