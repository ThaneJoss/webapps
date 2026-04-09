import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ContactSection from './ContactSection.vue'

describe('ContactSection', () => {
  it('flips cards open and keeps only one active at a time', async () => {
    const wrapper = mount(ContactSection, {
      attachTo: document.body,
      global: {
        stubs: {
          Icon: {
            template: '<span />'
          }
        }
      }
    })

    await wrapper.get('[data-contact-card-front="email"]').trigger('click')
    expect(wrapper.get('[data-contact-card="email"]').classes()).toContain('is-flipped')

    await wrapper.get('[data-contact-card-front="form"]').trigger('click')
    expect(wrapper.get('[data-contact-card="email"]').classes()).not.toContain('is-flipped')
    expect(wrapper.get('[data-contact-card="form"]').classes()).toContain('is-flipped')

    document.body.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
    await nextTick()
    expect(wrapper.get('[data-contact-card="form"]').classes()).not.toContain('is-flipped')

    wrapper.unmount()
  })
})
