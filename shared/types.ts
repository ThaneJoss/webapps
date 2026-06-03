export interface ServiceItem {
  id: string
  title: string
  description: string
  tags: string[]
}

export type AppStatus = 'Research' | 'In Design' | 'Prototype'

export interface AppItem {
  id: string
  name: string
  status: AppStatus
  summary: string
  tags: string[]
}

export interface BuildStep {
  id: string
  title: string
  description: string
  marker: string
}

export interface TechPillar {
  id: string
  title: string
  summary: string
  details: string[]
}

export interface SignalMetric {
  id: string
  label: string
  value: string
  tone: 'neutral' | 'good' | 'accent'
}
