import { expect, test, type Page } from '@playwright/test'

const expectSafeFallback = async (page: Page) => {
  const form = page.locator('[data-contact-form]')
  await expect(form).toBeVisible()
  await expect(form.locator('input[name="name"]')).toBeDisabled()
  await expect(form.locator('input[name="email"]')).toBeDisabled()
  await expect(form.locator('textarea[name="message"]')).toBeDisabled()
  await expect(form.getByRole('button', { name: '生成邮件草稿' })).toBeDisabled()
  await expect(form.getByRole('link', { name: '直接发送邮件', exact: true })).toHaveAttribute(
    'href', 'mailto:support@thanejoss.com?subject=Web%20Apps%20Inquiry'
  )

  // Playwright evaluation still works when page scripts are disabled.
  // Simulate restored values and check the browser's native submission data.
  const entries = await form.evaluate((element) => {
    const contactForm = element as HTMLFormElement
    contactForm.querySelector<HTMLInputElement>('[name="name"]')!.value = 'Private name'
    contactForm.querySelector<HTMLInputElement>('[name="email"]')!.value = 'private@example.com'
    contactForm.querySelector<HTMLTextAreaElement>('[name="message"]')!.value = 'Private message'
    return Array.from(new FormData(contactForm).entries())
  })
  expect(entries).toEqual([])
  await expect(page).toHaveURL('/contact')
}

test.describe('contact without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('keeps private fields out of native form submissions', async ({ page }, testInfo) => {
    await page.goto('/contact')
    await expectSafeFallback(page)

    await testInfo.attach('contact-without-javascript', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png'
    })
  })
})

test('keeps contact details inert when application scripts fail to load', async ({ page }) => {
  let blockedScripts = 0
  await page.route('**/*', async (route) => {
    if (route.request().resourceType() === 'script') {
      blockedScripts += 1
      await route.abort()
    } else {
      await route.continue()
    }
  })

  await page.goto('/contact')
  expect(blockedScripts).toBeGreaterThan(0)
  await expectSafeFallback(page)
})

test('generates a mail draft after hydration without navigating', async ({ page }) => {
  await page.goto('/contact')
  const form = page.locator('[data-contact-form]')
  await expect(form.locator('input[name="name"]')).toBeEnabled()
  await expect(form.locator('[data-contact-form-fallback]')).toHaveCount(0)

  await form.locator('input[name="name"]').fill('Reader')
  await form.locator('input[name="email"]').fill('reader@example.com')
  await form.locator('textarea[name="message"]').fill('Private project details')
  await form.getByRole('button', { name: '生成邮件草稿' }).click()

  const draft = form.getByRole('link', { name: '打开邮件草稿' })
  await expect(draft).toBeVisible()
  const href = await draft.getAttribute('href')
  expect(href).not.toBeNull()
  const mailto = new URL(href!)
  expect(mailto.protocol).toBe('mailto:')
  expect(mailto.pathname).toBe('support@thanejoss.com')
  expect(mailto.searchParams.get('body')).toBe(
    '姓名：Reader\n邮箱：reader@example.com\n\nPrivate project details'
  )
  await expect(page).toHaveURL('/contact')
})
