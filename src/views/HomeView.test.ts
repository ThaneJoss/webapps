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

    expect(wrapper.text()).toContain('网站简介')
    expect(wrapper.text()).toContain('一个持续整理中的个人网站')
    expect(wrapper.text()).toContain('这里会逐步整理内容、更新与联系方式')
    expect(wrapper.text()).toContain('前往联系页')
  })
})
