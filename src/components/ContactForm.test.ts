import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createSSRApp, nextTick } from 'vue'
import { renderToString } from 'vue/server-renderer'

import ContactForm from './ContactForm.vue'

describe('ContactForm', () => {
  it('does not serialize contact details before hydration', async () => {
    const container = document.createElement('div')
    container.innerHTML = await renderToString(createSSRApp(ContactForm))
    const form = container.querySelector('form')!
    const controls = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>(
      'input, textarea, button'
    )

    expect(controls).toHaveLength(4)
    for (const control of controls) {
      expect(control.disabled).toBe(true)
    }

    // Even restored or autofilled values must not enter a native form submission.
    form.querySelector<HTMLInputElement>('[name="name"]')!.value = 'Private name'
    form.querySelector<HTMLInputElement>('[name="email"]')!.value = 'private@example.com'
    form.querySelector<HTMLTextAreaElement>('[name="message"]')!.value = 'Private message'
    expect(Array.from(new window.FormData(form).entries())).toEqual([])
    expect(form.querySelector('[data-contact-form-fallback] a')?.getAttribute('href')).toBe(
      'mailto:support@thanejoss.com?subject=Web%20Apps%20Inquiry'
    )
  })

  it('enables the form and removes the fallback after mounting', async () => {
    const wrapper = mount(ContactForm)
    await nextTick()

    for (const control of wrapper.findAll('input, textarea, button')) {
      expect(control.attributes('disabled')).toBeUndefined()
    }
    expect(wrapper.find('[data-contact-form-fallback]').exists()).toBe(false)

    wrapper.unmount()
  })

  it('generates a mail draft and preserves the form values', async () => {
    const wrapper = mount(ContactForm)
    await nextTick()

    await wrapper.get('input[name="name"]').setValue('Codex')
    await wrapper.get('input[name="email"]').setValue('codex@thanejoss.com')
    await wrapper.get('textarea[name="message"]').setValue('Need a launch page')
    await wrapper.get('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('已生成邮件草稿，请在邮件客户端里确认并发送。')
    expect(wrapper.get('[data-form-feedback]').attributes('role')).toBe('status')
    expect(wrapper.get('[data-form-feedback]').attributes('aria-live')).toBe('polite')
    expect(wrapper.get('a').attributes('href')).toContain('mailto:support@thanejoss.com')
    expect(wrapper.get('a').attributes('href')).toContain('Codex')
    expect(wrapper.get('a').attributes('href')).toContain('codex%40thanejoss.com')
    expect((wrapper.get('input[name="name"]').element as HTMLInputElement).value).toBe('Codex')
    expect((wrapper.get('input[name="email"]').element as HTMLInputElement).value).toBe('codex@thanejoss.com')
    expect((wrapper.get('textarea[name="message"]').element as HTMLTextAreaElement).value).toBe('Need a launch page')
  })

  it('shows validation errors without clearing the form', async () => {
    const wrapper = mount(ContactForm, { attachTo: document.body })
    await nextTick()

    await wrapper.get('input[name="name"]').setValue('Codex')
    await wrapper.get('input[name="email"]').setValue('bad-email')
    await wrapper.get('textarea[name="message"]').setValue('Need a launch page')
    await wrapper.get('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('请检查邮箱格式，并确认姓名、邮箱和项目需求都已经填写完整。')
    expect(wrapper.get('[data-form-feedback]').attributes('role')).toBe('alert')
    expect(wrapper.get('input[name="email"]').attributes('aria-invalid')).toBe('true')
    expect(wrapper.get('input[name="email"]').attributes('aria-describedby')).toBeTruthy()
    expect(document.activeElement).toBe(wrapper.get('input[name="email"]').element)
    expect((wrapper.get('input[name="name"]').element as HTMLInputElement).value).toBe('Codex')
    expect((wrapper.get('input[name="email"]').element as HTMLInputElement).value).toBe('bad-email')
    expect((wrapper.get('textarea[name="message"]').element as HTMLTextAreaElement).value).toBe('Need a launch page')

    await wrapper.get('input[name="email"]').setValue('codex@thanejoss.com')
    expect(wrapper.find('[data-form-feedback]').exists()).toBe(false)
    expect(wrapper.get('input[name="email"]').attributes('aria-invalid')).toBeUndefined()

    wrapper.unmount()
  })
})
