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
    expect(wrapper.text()).toContain('正在上线的网页 APP')
    expect(wrapper.text()).toContain('更多无需下载、打开即用的网页 APP 会陆续加入')
    expect(wrapper.text()).toContain('PDF 工具箱')
    expect(wrapper.text()).toContain('图片工具箱')
    expect(wrapper.text()).toContain('合并 PDF')
    expect(wrapper.text()).toContain('裁剪尺寸')
    expect(wrapper.text()).toContain('批量转换')
    expect(wrapper.text()).toContain('口袋写作')
    expect(wrapper.text()).toContain('私密日记')
    expect(wrapper.text()).toContain('App 10')
    expect(wrapper.text()).toContain('开始使用')
  })
})
