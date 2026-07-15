import axe from 'axe-core'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import HomeView from './HomeView.vue'

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
})

describe('HomeView', () => {
  it('only presents unimplemented apps as disabled plans', () => {
    wrapper = mount(HomeView, { attachTo: document.body })

    expect(wrapper.text()).toContain('规划中的原生网页 APP')
    expect(wrapper.text()).toContain('当前没有工具开放使用')
    expect(wrapper.text()).toContain('PDF 工具箱')
    expect(wrapper.text()).toContain('私密日记')
    expect(wrapper.text()).toContain('查看规划')
    expect(wrapper.findAll('[data-catalog-availability="planned"]')).toHaveLength(10)
    expect(wrapper.findAll('.home-app-entry[aria-disabled="true"]')).toHaveLength(35)
    expect(wrapper.findAll('a')).toHaveLength(0)
  })

  it('has no detectable structural accessibility violations', async () => {
    wrapper = mount(HomeView, { attachTo: document.body })
    const results = await axe.run(document.body, {
      rules: {
        'color-contrast': { enabled: false }
      }
    })

    expect(results.violations).toEqual([])
  })
})
