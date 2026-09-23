import axe from 'axe-core'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import HomeView from './HomeView.vue'
import * as catalog from '../features/catalog/apps'

let wrapper: ReturnType<typeof mount> | null = null
let container: HTMLElement | null = null

const expectedAppTitles = [
  '叶读 · LeafRead',
  'BGP 路径观测',
  'Fast 反向代理',
  '卡间拾光',
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
  vi.restoreAllMocks()
  wrapper?.unmount()
  container?.remove()
  wrapper = null
  container = null
})

describe('HomeView', () => {
  it('presents the live websites as external application links, newest first', () => {
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
    expect(wrapper.findAll('[data-catalog-availability="live"]')).toHaveLength(13)
    expect(wrapper.findAll('[data-display-tier="featured"]')).toHaveLength(1)
    expect(wrapper.findAll('[data-display-tier="standard"]')).toHaveLength(12)
    expect(wrapper.get('[data-display-tier="featured"] h3').text()).toBe('叶读 · LeafRead')
    expect(wrapper.get('[data-display-tier="standard"] h3').text()).toBe('BGP 路径观测')
    expect(wrapper.findAll('.home-app-card h3').map((heading) => heading.text())).toEqual(expectedAppTitles)
    const expectedBadges = ['13', '12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
    expect(wrapper.findAll('.home-app-card__badge').map((badge) => badge.text())).toEqual(expectedBadges)
    expect(wrapper.findAll('.home-app-card .panel-label').map((label) => label.text())).toEqual(
      expectedBadges.map((badge) => `App ${badge}`)
    )
    expect(wrapper.findAll('.home-catalog-summary dd')[1]?.text()).toBe('叶读 · LeafRead')
    expect(wrapper.findAll('.home-app-entry')).toHaveLength(39)
    expect(wrapper.findAll('[data-catalog-route]')).toHaveLength(0)

    const externalLinks = wrapper.findAll('[data-catalog-link]')
    expect(externalLinks).toHaveLength(13)

    for (const link of externalLinks) {
      expect(link.attributes('href')).toMatch(/^https:\/\//)
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    }

    expect(wrapper.get('[aria-label="访问卡间拾光"]').attributes('href')).toBe(
      'https://card.thanejoss.com'
    )

    expect(wrapper.getComponent(RouterLinkStub).props('to')).toBe('/contact')
  })

  it('keeps the source catalog order and newest-first display stable across mounts', () => {
    const originalCatalogOrder = [...catalog.catalogApps]
    wrapper = mountHomeView()

    expect(catalog.catalogApps).toEqual(originalCatalogOrder)
    expect(wrapper.findAll('.home-app-card h3').map((heading) => heading.text())).toEqual(expectedAppTitles)

    wrapper.unmount()
    container?.remove()
    wrapper = mountHomeView()

    expect(catalog.catalogApps).toEqual(originalCatalogOrder)
    expect(wrapper.findAll('.home-app-card h3').map((heading) => heading.text())).toEqual(expectedAppTitles)
  })

  it('derives the summary, heading description and card from the selected latest entry', () => {
    const next = { ...catalog.catalogApps[0]!, id: 'next-app', title: '下一个应用', description: '新的应用说明' }
    vi.spyOn(catalog, 'getLatestCatalogApp').mockReturnValue(next)
    wrapper = mountHomeView()

    expect(wrapper.findAll('.home-catalog-summary dd')[1]?.text()).toBe(next.title)
    expect(wrapper.get('[data-display-tier="featured"] h3').text()).toBe(next.title)
    expect(wrapper.get('.home-catalog-group--featured .home-catalog-group__heading').text()).toContain(next.description)
    expect(wrapper.get('[data-display-tier="featured"]').text()).toContain(next.description)
  })

  it('omits the latest card when the catalog has no latest entry', () => {
    vi.spyOn(catalog, 'getLatestCatalogApp').mockReturnValue(undefined)
    wrapper = mountHomeView()

    expect(wrapper.find('[data-display-tier="featured"]').exists()).toBe(false)
    expect(wrapper.findAll('.home-catalog-summary dd')[1]?.text()).toBe('暂无应用')
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
