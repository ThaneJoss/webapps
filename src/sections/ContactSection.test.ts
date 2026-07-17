import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ContactSection from './ContactSection.vue'

describe('ContactSection', () => {
  it('uses direct links for simple contact actions', () => {
    const wrapper = mount(ContactSection)

    expect(wrapper.get('[data-contact-card="email"]').element.tagName).toBe('A')
    expect(wrapper.get('[data-contact-card="email"]').attributes('href')).toContain('mailto:support@thanejoss.com')
    expect(wrapper.get('[data-contact-card="issues"]').attributes('href')).toBe('https://github.com/ThaneJoss/webapps/issues/new')
    expect(wrapper.get('[data-contact-card="issues"]').attributes('target')).toBe('_blank')

    wrapper.unmount()
  })

  it('keeps the project brief form visible without disclosure state', async () => {
    const wrapper = mount(ContactSection)
    const panel = wrapper.get('[data-contact-form-panel]')
    const nameInput = wrapper.get('input[name="name"]')

    expect(wrapper.find('[data-contact-form-trigger]').exists()).toBe(false)
    expect(wrapper.get('[data-contact-card="form"]').element.tagName).toBe('SECTION')
    expect(panel.attributes('aria-hidden')).toBeUndefined()
    expect(panel.get('form').attributes('data-contact-form')).toBeDefined()

    await nameInput.setValue('Codex')
    expect((nameInput.element as HTMLInputElement).value).toBe('Codex')

    wrapper.unmount()
  })
})
