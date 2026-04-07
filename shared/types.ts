export interface ApiError {
  code: string
  message: string
}

export interface ApiSuccess<T> {
  success: true
  data: T
}

export interface ApiFailure {
  success: false
  error: ApiError
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure

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

export interface HealthStatus {
  ok: true
  service: string
  version: string
  runtime: string
  timestamp: string
}

export interface ContactPayload {
  name: string
  email: string
  message: string
}

export interface ContactReceipt {
  submissionId: string
  receivedAt: string
  status: 'queued'
}
