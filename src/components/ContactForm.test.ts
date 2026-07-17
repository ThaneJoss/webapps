import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ContactForm from './ContactForm.vue'

describe('ContactForm', () => {
  it('generates a mail draft and preserves the form values', async () => {
    const wrapper = mount(ContactForm)

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
