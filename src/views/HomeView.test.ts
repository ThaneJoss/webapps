import axe from 'axe-core'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import HomeView from './HomeView.vue'

let wrapper: ReturnType<typeof mount> | null = null
let container: HTMLElement | null = null

const expectedAppTitles = [
  '文件中转站',
  'AI API 网关',
  'Cloudflare 用量卫士',
  'T3 Code',
  'Codex 工作台',
  '服务状态',
  'Portainer',
  'WebSSH',
  '远程桌面'
] as const

const mountHomeView = () => {
  container = document.createElement('main')
  document.body.append(container)
  wrapper = mount(HomeView, {
    attachTo: container,
    global: {
      stubs: {
        RouterLink: RouterLinkStub
      }
    }
  })
  return wrapper
}

afterEach(() => {
  wrapper?.unmount()
  container?.remove()
  wrapper = null
  container = null
})

describe('HomeView', () => {
  it('presents the nine live sub-sites as external application links', () => {
    wrapper = mountHomeView()

    expect(wrapper.text()).toContain('我的网页 APP')
    expect(wrapper.text()).toContain('已经上线的用户应用')
    expect(wrapper.text()).toContain('已上线的网页 APP')
    expect(wrapper.text()).toContain('浏览应用')
    expect(wrapper.text()).toContain('提交建议')

    for (const title of expectedAppTitles) {
      expect(wrapper.text()).toContain(title)
    }

    expect(wrapper.text()).not.toContain('Home Assistant')
    expect(wrapper.findAll('[data-catalog-availability="live"]')).toHaveLength(9)
    expect(wrapper.findAll('[data-display-tier="featured"]')).toHaveLength(1)
    expect(wrapper.findAll('[data-display-tier="standard"]')).toHaveLength(8)
    expect(wrapper.findAll('.home-app-entry')).toHaveLength(27)
    expect(wrapper.findAll('[data-catalog-route]')).toHaveLength(0)

    const externalLinks = wrapper.findAll('[data-catalog-link]')
    expect(externalLinks).toHaveLength(9)

    for (const link of externalLinks) {
      expect(link.attributes('href')).toMatch(/^https:\/\/[a-z0-9.-]+\.thanejoss\.com$/)
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    }

    expect(wrapper.getComponent(RouterLinkStub).props('to')).toBe('/contact')
  })

  it('has no detectable structural accessibility violations', async () => {
    wrapper = mountHomeView()
    const results = await axe.run(document.body, {
      rules: {
        'color-contrast': { enabled: false }
      }
    })

    expect(results.violations).toEqual([])
  })
})
