import { flushPromises, mount } from '@vue/test-utils'
import { ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'

import HomeView from './HomeView.vue'

const { useApiHealthStatusMock } = vi.hoisted(() => ({
  useApiHealthStatusMock: vi.fn()
}))

vi.mock('../components/SiteShell.vue', () => ({
  default: {
    template: '<div><slot /></div>'
  }
}))

vi.mock('../composables/useShowcaseData.js', () => {
  return {
    useApiHealthStatus: useApiHealthStatusMock
  }
})

describe('HomeView', () => {
  it('renders online API status when health check succeeds', async () => {
    useApiHealthStatusMock.mockReturnValue({
      apiStatus: ref<'checking' | 'online' | 'offline'>('online'),
      health: ref({
        ok: true,
        service: 'waas-api',
        version: 'v1',
        runtime: 'hono',
        timestamp: '2026-04-07T10:00:00.000Z'
      })
    })

    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>'
          }
        }
      }
    })
    await flushPromises()

    expect(wrapper.text()).toContain('API online')
    expect(wrapper.text()).toContain('Provider-agnostic runtime')
    expect(wrapper.text()).toContain('前往联系页')
  })

  it('renders fallback status when the API is unavailable', async () => {
    useApiHealthStatusMock.mockReturnValue({
      apiStatus: ref<'checking' | 'online' | 'offline'>('offline'),
      health: ref(null)
    })

    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>'
          }
        }
      }
    })
    await flushPromises()

    expect(wrapper.text()).toContain('Fallback mode')
    expect(wrapper.text()).toContain('把导航变成独立页面')
  })
})
