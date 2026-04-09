import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import HomeView from './HomeView.vue'

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

    expect(wrapper.text()).toContain('网站介绍')
    expect(wrapper.text()).toContain('你的第一个原生网页APP')
    expect(wrapper.text()).toContain('以更纯净清晰的方式逐步呈现完整内容')
    expect(wrapper.text()).toContain('APP 展示区')
    expect(wrapper.text()).toContain('首个核心应用')
    expect(wrapper.text()).toContain('管理后台')
    expect(wrapper.text()).toContain('App 10')
    expect(wrapper.text()).toContain('/apps/app-01')
    expect(wrapper.text()).toContain('前往联系页')
  })
})
