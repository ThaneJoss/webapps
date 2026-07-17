import { nextTick } from 'vue'
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

  it('expands the form, preserves its draft, and restores trigger focus', async () => {
    const wrapper = mount(ContactSection, {
      attachTo: document.body
    })

    const trigger = wrapper.get('[data-contact-form-trigger]')
    const panel = wrapper.get('[data-contact-form-panel]')
    const nameInput = wrapper.get('input[name="name"]')

    await trigger.trigger('click')
    await nextTick()
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(panel.attributes('aria-hidden')).toBe('false')
    expect(document.activeElement).toBe(nameInput.element)

    await nameInput.setValue('Codex')

    document.body.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
    await nextTick()
    expect(trigger.attributes('aria-expanded')).toBe('false')

    await trigger.trigger('click')
    await nextTick()
    expect((nameInput.element as HTMLInputElement).value).toBe('Codex')

    await panel.trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(trigger.element)

    wrapper.unmount()
  })
})
