import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { fetchApps, fetchHealth, fetchServices } from '../lib/api.js'
import HomeView from './HomeView.vue'

vi.mock('../lib/api.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../lib/api.js')>()

  return {
    ...actual,
    fetchHealth: vi.fn(),
    fetchServices: vi.fn(),
    fetchApps: vi.fn()
  }
})

const mockedFetchHealth = vi.mocked(fetchHealth)
const mockedFetchServices = vi.mocked(fetchServices)
const mockedFetchApps = vi.mocked(fetchApps)

describe('HomeView', () => {
  it('renders live API data when requests succeed', async () => {
    mockedFetchHealth.mockResolvedValue({
      ok: true,
      service: 'waas-api',
      version: 'v1',
      runtime: 'hono',
      timestamp: '2026-04-07T10:00:00.000Z'
    })
    mockedFetchServices.mockResolvedValue([
      {
        id: 'signal-service',
        title: 'Signal Service',
        description: 'A live service from the API.',
        tags: ['API', 'Live']
      }
    ])
    mockedFetchApps.mockResolvedValue([
      {
        id: 'signal-desk',
        name: 'Signal Desk',
        status: 'Prototype',
        summary: 'A live app from the API.',
        tags: ['Dashboard']
      }
    ])

    const wrapper = mount(HomeView)
    await flushPromises()

    expect(document.title).toBe('Web Apps as a Service')
    expect(wrapper.text()).toContain('API online')
    expect(wrapper.text()).toContain('Signal Service')
    expect(wrapper.text()).toContain('Signal Desk')
  })

  it('keeps fallback content when the API is unavailable', async () => {
    mockedFetchHealth.mockRejectedValue(new Error('offline'))
    mockedFetchServices.mockRejectedValue(new Error('offline'))
    mockedFetchApps.mockRejectedValue(new Error('offline'))

    const wrapper = mount(HomeView)
    await flushPromises()

    expect(wrapper.text()).toContain('Fallback mode')
    expect(wrapper.text()).toContain('Launch Sites')
    expect(wrapper.text()).toContain('Client Intake Hub')
  })
})
