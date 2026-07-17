import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('home is statically rendered and has no phantom app links', async ({ page, request }) => {
  const sourceResponse = await request.get('/')
  expect(sourceResponse.status()).toBe(200)
  expect(await sourceResponse.text()).toContain('data-page-ready="home"')

  await page.goto('/')
  await expect(page.locator('[data-page-ready="home"]')).toBeVisible()
  await expect(page).toHaveTitle('规划中的原生网页 APP | Thane Joss')
  await expect(page.locator('[data-catalog-availability="planned"]')).toHaveCount(10)
  await expect(page.locator('[data-roadmap-stage="next"]')).toHaveCount(1)
  await expect(page.locator('[data-roadmap-stage="later"]')).toHaveCount(9)
  await expect(page.locator('.home-app-entry[aria-disabled="true"]')).toHaveCount(35)

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
