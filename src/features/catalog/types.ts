export type CatalogAvailability = 'live' | 'beta' | 'planned'
export type CatalogRoadmapStage = 'next' | 'later'

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
  roadmapStage: CatalogRoadmapStage
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

export const availabilityLabels: Record<CatalogAvailability, string> = {
  live: '可用',
  beta: '测试中',
  planned: '规划中'
}

export const roadmapStageLabels: Record<CatalogRoadmapStage, string> = {
  next: '优先开发',
  later: '后续规划'
}
