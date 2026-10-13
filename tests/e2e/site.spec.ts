import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('home is statically rendered and links websites and published projects newest first', async ({ page, request }, testInfo) => {
  const sourceResponse = await request.get('/')
  expect(sourceResponse.status()).toBe(200)
  expect(await sourceResponse.text()).toContain('data-page-ready="home"')

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('[data-page-ready="home"]')).toBeVisible()
  await expect(page).toHaveTitle('应用与开源项目 | Thane Joss')
  await expect(page.locator('[data-catalog-availability="live"]')).toHaveCount(17)
  await expect(page.locator('[data-display-tier="featured"]')).toHaveCount(1)
  await expect(page.locator('[data-display-tier="standard"]')).toHaveCount(18)
  await expect(page.locator('[data-display-tier="featured"] h3')).toHaveText('CCFA · Zotero 出版物简称')
  await expect(page.locator('[data-display-tier="standard"] h3').first()).toHaveText('title2doi · DOI 补全工作台')
  const expectedBadges = ['19', '18', '17', '16', '15', '14', '13', '12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
  await expect(page.locator('.home-app-card__badge')).toHaveText(expectedBadges)
  await expect(page.locator('.home-app-card .panel-label')).toHaveText(
    expectedBadges.map((badge) => `App ${badge}`)
  )
  await expect(page.locator('.home-catalog-summary dd').nth(1)).toHaveText('CCFA · Zotero 出版物简称')
  await expect(page.locator('.home-app-entry')).toHaveCount(57)
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
    'https://cf-speed-test.thanejoss.com',
    'https://manifold.thanejoss.com',
    'https://flow.thanejoss.com',
    'https://dify.thanejoss.com',
    'https://epub.thanejoss.com',
    'https://bgp.thanejoss.com',
    'https://fast.thanejoss.com',
    'https://card.thanejoss.com',
    'https://file.thanejoss.com',
    'https://chat.thanejoss.com',
    'https://cloudflare.thanejoss.com',
    'https://t3.thanejoss.com',
    'https://codex.thanejoss.com',
    'https://uptime.thanejoss.com',
    'https://portainer.thanejoss.com',
    'https://ssh.thanejoss.com',
    'https://vnc.thanejoss.com'
  ])
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
