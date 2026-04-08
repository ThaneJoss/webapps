import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import HomeView from './HomeView.vue'

vi.mock('../components/SiteShell.vue', () => ({
  default: {
    template: '<div><slot /></div>'
  }
}))

describe('HomeView', () => {
  it('renders the single main section for the homepage', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>'
          }
        }
      }
    })

    expect(wrapper.text()).toContain('这里会逐步放入完整内容')
    expect(wrapper.text()).toContain('现在先保留一个清晰入口')
    expect(wrapper.text()).toContain('前往联系页')
  })
})
