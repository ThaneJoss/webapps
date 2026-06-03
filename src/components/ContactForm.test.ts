import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ContactForm from './ContactForm.vue'

describe('ContactForm', () => {
  it('generates a mail draft and clears the form', async () => {
    const wrapper = mount(ContactForm)

    await wrapper.get('input[name="name"]').setValue('Codex')
    await wrapper.get('input[name="email"]').setValue('codex@thanejoss.com')
    await wrapper.get('textarea[name="message"]').setValue('Need a launch page')
    await wrapper.get('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain('已生成邮件草稿，请在邮件客户端里确认并发送。')
    expect(wrapper.get('a').attributes('href')).toContain('mailto:support@thanejoss.com')
    expect(wrapper.get('a').attributes('href')).toContain('Codex')
    expect(wrapper.get('a').attributes('href')).toContain('codex%40thanejoss.com')
    expect((wrapper.get('input[name="name"]').element as HTMLInputElement).value).toBe('')
    expect((wrapper.get('input[name="email"]').element as HTMLInputElement).value).toBe('')
    expect((wrapper.get('textarea[name="message"]').element as HTMLTextAreaElement).value).toBe('')
  })

  it('shows validation errors without clearing the form', async () => {
    const wrapper = mount(ContactForm)

    await wrapper.get('input[name="name"]').setValue('Codex')
    await wrapper.get('input[name="email"]').setValue('bad-email')
    await wrapper.get('textarea[name="message"]').setValue('Need a launch page')
    await wrapper.get('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain('请检查邮箱格式，并确认姓名、邮箱和项目需求都已经填写完整。')
    expect((wrapper.get('input[name="name"]').element as HTMLInputElement).value).toBe('Codex')
    expect((wrapper.get('input[name="email"]').element as HTMLInputElement).value).toBe('bad-email')
    expect((wrapper.get('textarea[name="message"]').element as HTMLTextAreaElement).value).toBe('Need a launch page')
  })
})
