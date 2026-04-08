import type {
  ApiFailure,
  ApiResponse,
  ContactPayload,
  ContactReceipt,
  HealthStatus
} from '../../shared/types.js'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '/api').replace(/\/$/, '')

export class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly status: number
  ) {
    super(message)
    this.name = 'ApiRequestError'
  }
}

const isFailure = <T>(payload: ApiResponse<T>): payload is ApiFailure => !payload.success

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    },
    ...init
  })

  const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null

  if (!payload) {
    throw new ApiRequestError('Invalid API response.', 'INVALID_RESPONSE', response.status)
  }

  if (!response.ok || isFailure(payload)) {
    throw new ApiRequestError(
      payload.success ? 'Request failed.' : payload.error.message,
      payload.success ? 'REQUEST_FAILED' : payload.error.code,
      response.status
    )
  }

  return payload.data
}

export const fetchHealth = () => request<HealthStatus>('/health')

export const submitContact = (payload: ContactPayload) =>
  request<ContactReceipt>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
