import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  ApiRequestError,
  fetchApps,
  fetchHealth,
  fetchServices,
  submitContact
} from './api.js'

const fetchMock = vi.fn()

describe('api client', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    fetchMock.mockReset()
    vi.unstubAllGlobals()
  })

  it('returns typed data for successful requests', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        success: true,
        data: {
          ok: true,
          service: 'waas-api',
          version: 'v1',
          runtime: 'hono',
          timestamp: '2026-04-07T10:00:00.000Z'
        }
      })
    })

    await expect(fetchHealth()).resolves.toEqual({
      ok: true,
      service: 'waas-api',
      version: 'v1',
      runtime: 'hono',
      timestamp: '2026-04-07T10:00:00.000Z'
    })
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/health',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    )
  })

  it('throws a typed error when the API returns a failure envelope', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Please provide a valid email address.'
        }
      })
    })

    await expect(
      submitContact({
        name: 'Codex',
        email: 'bad-email',
        message: 'Need a launch page'
      })
    ).rejects.toEqual(
      expect.objectContaining<ApiRequestError>({
        name: 'ApiRequestError',
        code: 'VALIDATION_ERROR',
        status: 400,
        message: 'Please provide a valid email address.'
      })
    )
  })

  it('throws a typed error when the response body is invalid', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => null
    })

    await expect(fetchServices()).rejects.toEqual(
      expect.objectContaining<ApiRequestError>({
        name: 'ApiRequestError',
        code: 'INVALID_RESPONSE',
        status: 200,
        message: 'Invalid API response.'
      })
    )
  })

  it('sends JSON payloads for contact submissions', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 202,
      json: async () => ({
        success: true,
        data: {
          submissionId: '6ef0fe1b-8c2a-44a7-8f76-4a6da7808f81',
          receivedAt: '2026-04-07T10:00:00.000Z',
          status: 'queued'
        }
      })
    })

    await submitContact({
      name: 'Codex',
      email: 'codex@thanejoss.com',
      message: 'Need a launch page'
    })

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          name: 'Codex',
          email: 'codex@thanejoss.com',
          message: 'Need a launch page'
        }),
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    )
  })

  it('fetches services and apps from their dedicated routes', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        success: true,
        data: []
      })
    })

    await fetchServices()
    await fetchApps()

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      '/api/services',
      expect.any(Object)
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      '/api/apps',
      expect.any(Object)
    )
  })
})
