import axe from 'axe-core'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import HomeView from './HomeView.vue'
import * as catalog from '../features/catalog/apps'

let wrapper: ReturnType<typeof mount> | null = null
let container: HTMLElement | null = null

const expectedAppTitles = [
  'CCFA · Zotero 出版物简称',
  'title2doi · DOI 补全工作台',
  'Cloudflare IP 候选 · Speed Test',
  '形 · 流 / Manifold',
  'FlowMaster 研究工作区',
  'Dify AI 工作台',
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
    expect(wrapper.text()).toContain('应用与开源项目')
    expect(wrapper.text()).toContain('浏览应用')
    expect(wrapper.text()).toContain('提交建议')

    for (const title of expectedAppTitles) {
      expect(wrapper.text()).toContain(title)
    }

    expect(wrapper.text()).not.toContain('Home Assistant')
    expect(wrapper.findAll('[data-catalog-availability="live"]')).toHaveLength(17)
    expect(wrapper.findAll('[data-display-tier="featured"]')).toHaveLength(1)
    expect(wrapper.findAll('[data-display-tier="standard"]')).toHaveLength(18)
    expect(wrapper.get('[data-display-tier="featured"] h3').text()).toBe('CCFA · Zotero 出版物简称')
    expect(wrapper.get('[data-display-tier="standard"] h3').text()).toBe('title2doi · DOI 补全工作台')
    expect(wrapper.findAll('.home-app-card h3').map((heading) => heading.text())).toEqual(expectedAppTitles)
    const expectedBadges = ['19', '18', '17', '16', '15', '14', '13', '12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
    expect(wrapper.findAll('.home-app-card__badge').map((badge) => badge.text())).toEqual(expectedBadges)
    expect(wrapper.findAll('.home-app-card .panel-label').map((label) => label.text())).toEqual(
      expectedBadges.map((badge) => `App ${badge}`)
    )
    expect(wrapper.findAll('.home-catalog-summary dd')[1]?.text()).toBe('CCFA · Zotero 出版物简称')
    expect(wrapper.findAll('.home-app-entry')).toHaveLength(57)
    expect(wrapper.findAll('[data-catalog-route]')).toHaveLength(0)

    const externalLinks = wrapper.findAll('[data-catalog-link]')
    expect(externalLinks).toHaveLength(19)

    for (const link of externalLinks) {
      expect(link.attributes('href')).toMatch(/^https:\/\//)
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    }

    const releasedCard = wrapper.get('[data-catalog-availability="released"]')
    expect(releasedCard.text()).toContain('Zotero 插件')
    expect(releasedCard.text()).toContain('已发布')
    expect(releasedCard.text()).not.toContain('访问网站')
    expect(releasedCard.get('[data-catalog-link]').attributes('href')).toBe('https://github.com/ThaneJoss/ccfa')
    expect(wrapper.get('[data-catalog-availability="beta"]').text()).toContain('测速与 DNS 写入暂不可用')
    const sourceLinks = wrapper.findAll('[data-catalog-source]')
    expect(sourceLinks).toHaveLength(10)
    for (const link of sourceLinks) {
      expect(link.attributes('href')).toMatch(/^https:\/\/github\.com\/ThaneJoss\//)
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    }

    expect(wrapper.get('[aria-label="访问形 · 流 / Manifold"]').attributes('href')).toBe(
      'https://manifold.thanejoss.com'
    )

    expect(wrapper.get('[aria-label="访问FlowMaster 研究工作区"]').attributes('href')).toBe(
      'https://flow.thanejoss.com'
    )

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
