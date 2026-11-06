import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('home statically renders six colored sections with complete project links', async ({ page, request }, testInfo) => {
  const sourceResponse = await request.get('/')
  expect(sourceResponse.status()).toBe(200)
  const source = await sourceResponse.text()
  expect(source).toContain('data-page-ready="home"')
  expect(source.match(/data-catalog-group=/g)).toHaveLength(6)
  expect(source.match(/data-catalog-id=/g)).toHaveLength(19)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('[data-page-ready="home"]')).toBeVisible()
  await expect(page).toHaveTitle('应用与开源项目 | Thane Joss')
  await expect(page.locator('[data-catalog-availability="live"]')).toHaveCount(17)
  const expectedGroups = [
    { id: 'research', title: '研究与实验', count: 4 },
    { id: 'ai', title: 'AI 应用', count: 2 },
    { id: 'development', title: '开发与远程', count: 4 },
    { id: 'network', title: '网络工具', count: 3 },
    { id: 'operations', title: '运维管理', count: 3 },
    { id: 'everyday', title: '日常与收藏', count: 3 }
  ]
  const groups = page.locator('[data-catalog-group]')
  await expect(groups).toHaveCount(6)
  for (const { id, title, count } of expectedGroups) {
    const group = page.locator(`[data-catalog-group="${id}"]`)
    await expect(group).toHaveAttribute('aria-labelledby', `catalog-group-${id}`)
    await expect(group.getByRole('heading', { level: 3, name: title, exact: true })).toBeVisible()
    await expect(group.locator('.home-app-card')).toHaveCount(count)
  }
  const sectionColors = await groups.evaluateAll((sections) => sections.map((section) => (
    getComputedStyle(section).backgroundColor
  )))
  expect(new Set(sectionColors).size).toBe(6)
  expect(sectionColors).not.toContain('rgba(0, 0, 0, 0)')
  await expect(page.locator('.home-catalog-summary dd')).toHaveText(['19', '6', 'CCFA · Zotero 出版物简称'])
  await expect(page.locator('input, [role="search"], [role="tablist"]')).toHaveCount(0)
  await expect(page.locator('.home-app-entry, .home-app-card__badge, [data-display-tier]')).toHaveCount(0)
  await expect(page.locator('#home-apps')).not.toContainText('需 Access 登录')
  await expect(page.locator('#home-apps')).not.toContainText('访问需要 Token')
  await expect(page.locator('#home-apps')).not.toContainText('IP 白名单')
  await expect(page.getByText('Home Assistant')).toHaveCount(0)

  const externalTargets = await page.locator('[data-catalog-link]').evaluateAll((anchors) => (
    anchors.map((anchor) => ({
      href: anchor.getAttribute('href'),
      rel: anchor.getAttribute('rel'),
      target: anchor.getAttribute('target')
    }))
  ))
  expect(externalTargets).toHaveLength(19)
  expect(externalTargets.map(({ href }) => href)).toEqual([
    'https://github.com/ThaneJoss/ccfa',
    'https://title2doi.thanejoss.com',
    'https://manifold.thanejoss.com',
    'https://flow.thanejoss.com',
    'https://dify.thanejoss.com',
    'https://chat.thanejoss.com',
    'https://t3.thanejoss.com',
    'https://codex.thanejoss.com',
    'https://ssh.thanejoss.com',
    'https://vnc.thanejoss.com',
    'https://cf-speed-test.thanejoss.com',
    'https://bgp.thanejoss.com',
    'https://fast.thanejoss.com',
    'https://cloudflare.thanejoss.com',
    'https://uptime.thanejoss.com',
    'https://portainer.thanejoss.com',
    'https://epub.thanejoss.com',
    'https://card.thanejoss.com',
    'https://file.thanejoss.com'
  ])
  expect(new Set(externalTargets.map(({ href }) => href)).size).toBe(19)
  expect(externalTargets.every(({ rel, target }) => (
    rel === 'noopener noreferrer' && target === '_blank'
  ))).toBe(true)

  const releasedCard = page.locator('[data-catalog-availability="released"]')
  await expect(releasedCard).toHaveCount(1)
  await expect(releasedCard.getByRole('link', { name: '查看CCFA · Zotero 出版物简称项目' })).toHaveAttribute(
    'href', 'https://github.com/ThaneJoss/ccfa'
  )
  await expect(releasedCard.getByText('已发布', { exact: true })).toBeVisible()
  await expect(releasedCard.getByText('访问网站', { exact: true })).toHaveCount(0)
  await expect(page.locator('[data-catalog-availability="beta"]')).toContainText('测速与 DNS 写入暂不可用')
  const sourceLinks = page.locator('[data-catalog-source]')
  await expect(sourceLinks).toHaveCount(10)
  expect(await sourceLinks.evaluateAll((anchors) => anchors.every((anchor) => (
    anchor.getAttribute('href')?.startsWith('https://github.com/ThaneJoss/') &&
    anchor.getAttribute('rel') === 'noopener noreferrer' && anchor.getAttribute('target') === '_blank'
  )))).toBe(true)

  // Keep navigation and cards usable on both configured viewport sizes.
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  const browseApps = page.getByRole('button', { name: '浏览应用' })
  await browseApps.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('#catalog-title')).toBeInViewport()
  await expect(page.locator('#catalog-title')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.locator('[data-catalog-link]').first()).toBeFocused()

  const internalTargets = await page.locator('a[href^="/"]').evaluateAll((anchors) => (
    anchors.map((anchor) => anchor.getAttribute('href'))
  ))
  expect(new Set(internalTargets)).toEqual(new Set(['/', '/contact']))

  const accessibility = await new AxeBuilder({ page }).analyze()
  expect(accessibility.violations).toEqual([])

  await testInfo.attach('homepage-full-page', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png'
  })

  await page.getByRole('link', { name: '联系', exact: true }).click()
  await expect(page.locator('#main-content')).toBeFocused()
})

test('contact workspace keeps channels direct and the project brief available', async ({ page, request }, testInfo) => {
  const sourceResponse = await request.get('/contact')
  expect(sourceResponse.status()).toBe(200)
  expect(await sourceResponse.text()).toContain('data-page-ready="contact"')

  await page.goto('/contact')
  await expect(page.locator('[data-page-ready="contact"]')).toBeVisible()
  await expect(page).toHaveTitle('联系 | Thane Joss')

  const emailChannel = page.locator('[data-contact-card="email"]')
  await expect(emailChannel).toHaveAttribute('href', /mailto:support@thanejoss\.com/)
  await expect(page.locator('[data-contact-card="issues"]')).toHaveAttribute('target', '_blank')

  if (!testInfo.project.use.isMobile) {
    expect(await emailChannel.evaluate((element) => getComputedStyle(element).transform)).toBe('none')
    await emailChannel.hover()
    await expect.poll(() => emailChannel.evaluate((element) => getComputedStyle(element).transform)).not.toBe('none')
  }

  const formPanel = page.locator('[data-contact-form-panel]')
  const nameInput = page.locator('[data-contact-form-panel] input[name="name"]')
  await expect(formPanel).toBeVisible()
  await expect(page.locator('[data-contact-form-trigger]')).toHaveCount(0)
  await nameInput.fill('Codex')

  await page.locator('[data-page-ready="contact"] h1').click()
  await expect(nameInput).toHaveValue('Codex')

  await nameInput.fill('')
  await page.locator('[data-contact-card="form"] button[type="submit"]').click()
  await expect(page.locator('[data-contact-card="form"] [role="alert"]')).toBeVisible()
  await expect(page.locator('[data-contact-card="form"] input[name="name"]')).toHaveAttribute('aria-invalid', 'true')
  await expect(page.locator('[data-contact-card="form"] input[name="name"]')).toBeFocused()

  const accessibility = await new AxeBuilder({ page }).analyze()
  expect(accessibility.violations).toEqual([])
})

test('generated 404 is semantic and excluded from indexing', async ({ page, request }) => {
  const sourceResponse = await request.get('/404.html')
  expect(sourceResponse.status()).toBe(200)
  const source = await sourceResponse.text()
  expect(source).toContain('data-page-ready="not-found"')
  expect(source).toContain('content="noindex, nofollow"')

  await page.goto('/404.html')
  await expect(page.locator('[data-page-ready="not-found"]')).toBeVisible()
  await expect(page).toHaveTitle('页面未找到 | Thane Joss')

  const accessibility = await new AxeBuilder({ page }).analyze()
  expect(accessibility.violations).toEqual([])
})

test('the light contact action stays readable when hovered', async ({ page, isMobile }, testInfo) => {
  test.skip(isMobile, 'Touch devices do not use the desktop hover state')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/contact')
  const submit = page.getByRole('button', { name: '生成邮件草稿' })
  await submit.hover()
  const colors = await submit.evaluate(async (element) => {
    await Promise.all(element.getAnimations().map((animation) => animation.finished))
    const { color, backgroundColor } = getComputedStyle(element)
    return { color, backgroundColor }
  })

  await testInfo.attach('contact-action-hover', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png'
  })

  // axe may consider text matching its background hidden and skip contrast checks.
  expect(colors.color).not.toBe(colors.backgroundColor)
  const accessibility = await new AxeBuilder({ page }).include('.contact-submit').analyze()
  expect(accessibility.violations).toEqual([])
})

test('narrow navigation keeps the keyboard focus outline inside its scroll area', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 320, height: 720 })
  await page.goto('/')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: '跳到主要内容' })).toBeFocused()
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')

  const homeLink = page.getByRole('navigation').getByRole('link', { name: '首页', exact: true })
  await expect(homeLink).toBeFocused()
  const outline = await homeLink.evaluate((element) => {
    const style = getComputedStyle(element)
    const link = element.getBoundingClientRect()
    const container = element.closest('nav')!.getBoundingClientRect()
    const width = Number.parseFloat(style.outlineWidth)
    const extent = width + Number.parseFloat(style.outlineOffset)
    return {
      width,
      style: style.outlineStyle,
      inside: link.top - extent >= container.top && link.bottom + extent <= container.bottom &&
        link.left - extent >= container.left && link.right + extent <= container.right
    }
  })
  expect(outline.width).toBeGreaterThanOrEqual(2)
  expect(outline.style).toBe('solid')
  expect(outline.inside).toBe(true)

  await testInfo.attach('narrow-navigation-focus', {
    body: await page.screenshot(),
    contentType: 'image/png'
  })
})
