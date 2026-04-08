<template>
  <SiteShell>
    <section class="section-wrap pt-6 sm:pt-10">
      <div class="mx-auto max-w-6xl">
        <div class="surface-card flex flex-col gap-4 px-6 py-6 sm:px-8 sm:py-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p class="panel-label text-steel">开始联系</p>
            <h1 class="mt-3 text-4xl font-semibold tracking-[-0.05em] text-ink sm:text-[3.4rem]">
              联系入口
            </h1>
          </div>

          <p class="max-w-xl text-sm leading-7 text-steel sm:text-base">
            选一个入口，直接开始。
          </p>
        </div>
      </div>
    </section>

    <ContactSection />
  </SiteShell>
</template>

<script setup lang="ts">
import SiteShell from '../components/SiteShell.vue'
import ContactSection from '../sections/ContactSection.vue'
</script>
