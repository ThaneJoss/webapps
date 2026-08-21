import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('home is statically rendered and links the nine real sub-sites', async ({ page, request }, testInfo) => {
  const sourceResponse = await request.get('/')
  expect(sourceResponse.status()).toBe(200)
  expect(await sourceResponse.text()).toContain('data-page-ready="home"')

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('[data-page-ready="home"]')).toBeVisible()
  await expect(page).toHaveTitle('已上线的网页 APP | Thane Joss')
  await expect(page.locator('[data-catalog-availability="live"]')).toHaveCount(9)
  await expect(page.locator('[data-display-tier="featured"]')).toHaveCount(1)
  await expect(page.locator('[data-display-tier="standard"]')).toHaveCount(8)
  await expect(page.locator('.home-app-entry')).toHaveCount(27)
  await expect(page.getByText('Home Assistant')).toHaveCount(0)

  const externalTargets = await page.locator('[data-catalog-link]').evaluateAll((anchors) => (
    anchors.map((anchor) => ({
      href: anchor.getAttribute('href'),
      rel: anchor.getAttribute('rel'),
      target: anchor.getAttribute('target')
    }))
  ))
  expect(externalTargets).toHaveLength(9)
  expect(new Set(externalTargets.map(({ href }) => href))).toEqual(new Set([
    'https://file.thanejoss.com',
    'https://chat.thanejoss.com',
    'https://cloudflare.thanejoss.com',
    'https://t3.thanejoss.com',
    'https://codex.thanejoss.com',
    'https://uptime.thanejoss.com',
    'https://portainer.thanejoss.com',
    'https://ssh.thanejoss.com',
    'https://vnc.thanejoss.com'
  ]))
  expect(externalTargets.every(({ rel, target }) => (
    rel === 'noopener noreferrer' && target === '_blank'
  ))).toBe(true)

  const scrollbarWidth = await page.locator('html').evaluate((element) => (
    getComputedStyle(element).getPropertyValue('scrollbar-width')
  ))
  expect(scrollbarWidth).toBe('none')

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
