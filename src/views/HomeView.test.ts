import axe from 'axe-core'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import HomeView from './HomeView.vue'
import * as catalog from '../features/catalog/apps'

let wrapper: ReturnType<typeof mount> | null = null
let container: HTMLElement | null = null

const expectedGroups = [
  { id: 'research', title: '研究与实验', apps: ['ccfa', 'title2doi', 'manifold', 'flowmaster'] },
  { id: 'ai', title: 'AI 应用', apps: ['dify', 'ai-api-gateway'] },
  { id: 'development', title: '开发与远程', apps: ['t3-code', 'codex-workbench', 'webssh', 'remote-desktop'] },
  { id: 'network', title: '网络工具', apps: ['cloudflare-speed-test', 'bgp', 'fast'] },
  { id: 'operations', title: '运维管理', apps: ['cloudflare-usage-guard', 'service-status', 'portainer'] },
  { id: 'everyday', title: '日常与收藏', apps: ['leafread', 'card-gallery', 'file-transfer'] }
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
  it('presents all 19 projects once in six named sections, newest first within each section', () => {
    wrapper = mountHomeView()

    expect(wrapper.text()).toContain('我的网页 APP')
    expect(wrapper.text()).toContain('应用与开源项目')
    expect(wrapper.text()).toContain('浏览应用')
    expect(wrapper.text()).toContain('提交建议')

    const groups = wrapper.findAll('[data-catalog-group]')
    expect(groups.map((group) => group.attributes('data-catalog-group'))).toEqual(
      expectedGroups.map((group) => group.id)
    )
    for (const expected of expectedGroups) {
      const group = wrapper.get(`[data-catalog-group="${expected.id}"]`)
      expect(group.element.tagName).toBe('SECTION')
      expect(group.attributes('aria-labelledby')).toBe(`catalog-group-${expected.id}`)
      expect(group.get(`#catalog-group-${expected.id}`).text()).toBe(expected.title)
      expect(group.findAll('[data-catalog-id]').map((app) => app.attributes('data-catalog-id'))).toEqual(expected.apps)
    }

    const ids = wrapper.findAll('[data-catalog-id]').map((app) => app.attributes('data-catalog-id'))
    expect(ids).toHaveLength(19)
    expect(new Set(ids).size).toBe(19)
    expect(new Set(ids)).toEqual(new Set(catalog.catalogApps.map((app) => app.id)))
    expect(wrapper.findAll('.home-app-card h4')).toHaveLength(19)
    expect(wrapper.findAll('.home-catalog-summary dd').map((item) => item.text())).toEqual([
      '19', '6', 'CCFA · Zotero 出版物简称'
    ])
  })

  it('keeps website and repository destinations and their publication states accurate', () => {
    wrapper = mountHomeView()

    expect(wrapper.text()).not.toContain('Home Assistant')
    expect(wrapper.findAll('[data-catalog-availability="live"]')).toHaveLength(17)
    expect(wrapper.findAll('[data-catalog-route]')).toHaveLength(0)

    const externalLinks = wrapper.findAll('[data-catalog-link]')
    expect(externalLinks).toHaveLength(19)
    for (const link of externalLinks) {
      expect(link.attributes('href')).toMatch(/^https:\/\//)
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    }

    const releasedCard = wrapper.get('[data-catalog-availability="released"]')
    expect(releasedCard.text()).toContain('已发布')
    expect(releasedCard.text()).not.toContain('访问网站')
    expect(releasedCard.get('[data-catalog-link]').attributes('href')).toBe('https://github.com/ThaneJoss/ccfa')
    const betaCard = wrapper.get('[data-catalog-availability="beta"]')
    expect(betaCard.text()).toContain('测试中')
    expect(betaCard.text()).toContain('测速与 DNS 写入暂不可用')

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
    expect(wrapper.getComponent(RouterLinkStub).props('to')).toBe('/contact')
  })

  it('uses section structure without search, tags, numbered cards or access-condition labels', () => {
    wrapper = mountHomeView()

    expect(wrapper.find('input, [role="search"], [role="tablist"]').exists()).toBe(false)
    expect(wrapper.find('.home-app-entry, .home-app-card__badge, [data-display-tier]').exists()).toBe(false)
    expect(wrapper.find('.home-app-card .panel-label').exists()).toBe(false)
    expect(wrapper.text()).not.toMatch(/需 Access 登录|访问需要 Token|IP 白名单/)
  })

  it('keeps source catalog order and grouped display stable across mounts', () => {
    const originalCatalogOrder = [...catalog.catalogApps]
    const expectedIds = expectedGroups.flatMap((group) => [...group.apps])
    wrapper = mountHomeView()

    expect(catalog.catalogApps).toEqual(originalCatalogOrder)
    expect(wrapper.findAll('[data-catalog-id]').map((app) => app.attributes('data-catalog-id'))).toEqual(expectedIds)

    wrapper.unmount()
    container?.remove()
    wrapper = mountHomeView()

    expect(catalog.catalogApps).toEqual(originalCatalogOrder)
    expect(wrapper.findAll('[data-catalog-id]').map((app) => app.attributes('data-catalog-id'))).toEqual(expectedIds)
  })

  it('keeps the newest project in the summary without duplicating a project card', () => {
    const next = { ...catalog.catalogApps[0]!, id: 'next-app', title: '下一个应用', description: '新的应用说明' }
    vi.spyOn(catalog, 'getLatestCatalogApp').mockReturnValue(next)
    wrapper = mountHomeView()

    expect(wrapper.findAll('.home-catalog-summary dd')[2]?.text()).toBe(next.title)
    expect(wrapper.findAll('[data-catalog-id]')).toHaveLength(19)
    expect(wrapper.find('[data-catalog-id="next-app"]').exists()).toBe(false)
  })

  it('uses an empty summary fallback when the catalog has no latest entry', () => {
    vi.spyOn(catalog, 'getLatestCatalogApp').mockReturnValue(undefined)
    wrapper = mountHomeView()

    expect(wrapper.findAll('.home-catalog-summary dd')[2]?.text()).toBe('暂无应用')
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
