export type CatalogAvailability = 'live' | 'beta' | 'planned'

interface CatalogItemBase {
  id: string
  label: string
}

export type CatalogEntry = CatalogItemBase & (
  | {
      availability: 'live' | 'beta'
      route: `/${string}`
    }
  | {
      availability: 'planned'
      route: null
    }
)

interface CatalogAppBase extends CatalogItemBase {
  title: string
  badge: string
  description: string
  quickEntries: readonly CatalogEntry[]
  featured: boolean
  secondaryStyle: 'large' | 'medium' | 'small'
  boardClass: string
}

export type CatalogApp = CatalogAppBase & (
  | {
      availability: 'live' | 'beta'
      route: `/${string}`
    }
  | {
      availability: 'planned'
      route: null
    }
)

export type InteractiveCatalogItem = CatalogItemBase & {
  availability: 'live' | 'beta'
  route: `/${string}`
}

export const isCatalogItemInteractive = (
  item: CatalogEntry | CatalogApp
): item is InteractiveCatalogItem & (CatalogEntry | CatalogApp) => (
  item.availability !== 'planned' && item.route !== null
)

export const availabilityLabels: Record<CatalogAvailability, string> = {
  live: '可用',
  beta: '测试中',
  planned: '规划中'
}
