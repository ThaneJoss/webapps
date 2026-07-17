<template>
  <section
    class="contact-page-hero section-wrap"
    data-page-ready="contact"
  >
    <div class="mx-auto max-w-6xl">
      <div class="contact-hero">
        <div class="contact-hero__layout">
          <div class="contact-hero__content">
            <p class="contact-hero__eyebrow panel-label">
              Contact / Start here
            </p>
            <h1>
              把你的想法，
              <span>讲给我听。</span>
            </h1>
            <p class="contact-hero__copy">
              无论是一条功能建议、一个具体问题，还是尚未成形的产品方向，都可以从这里开始。
            </p>

            <ul
              class="contact-hero__topics"
              aria-label="可以讨论的内容"
            >
              <li>产品建议</li>
              <li>问题反馈</li>
              <li>项目想法</li>
            </ul>
          </div>

          <div
            class="contact-signal"
            aria-hidden="true"
          >
            <div class="contact-signal__ring"></div>
            <div class="contact-signal__card">
              <div class="contact-signal__header">
                <span>NEW BRIEF</span>
                <span class="contact-signal__status"></span>
              </div>
              <p>idea / context / next step</p>
              <div class="contact-signal__steps">
                <span class="is-active">想法</span>
                <span>背景</span>
                <span>下一步</span>
              </div>
              <div class="contact-signal__lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <span class="contact-signal__chip contact-signal__chip--top">需求</span>
            <span class="contact-signal__chip contact-signal__chip--bottom">反馈</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <ContactSection />
</template>

<script setup lang="ts">
import ContactSection from '../sections/ContactSection.vue'
</script>
