import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import HomeView from './HomeView.vue'

describe('HomeView', () => {
  it('renders the single main section for the homepage', () => {
    const wrapper = mount(HomeView)

    expect(wrapper.text()).toContain('网站介绍')
    expect(wrapper.text()).toContain('你的第一个原生网页APP')
    expect(wrapper.text()).toContain('所有 APP 无需下载，打开网页就能直接使用')
    expect(wrapper.text()).toContain('APP 展示区')
    expect(wrapper.text()).toContain('首个核心应用')
    expect(wrapper.text()).toContain('管理后台')
    expect(wrapper.text()).toContain('App 10')
    expect(wrapper.text()).toContain('/apps/app-01')
    expect(wrapper.text()).toContain('开始使用')
  })
})
