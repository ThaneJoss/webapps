<template>
  <section class="section-wrap not-found-section">
    <div class="not-found-shell mx-auto flex max-w-6xl items-center py-8 sm:py-12">
      <div class="not-found-card surface-card relative grid w-full overflow-hidden px-6 py-8 sm:px-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-10 lg:px-14 lg:py-14">
        <div class="relative z-10 max-w-3xl">
          <p class="panel-label text-steel">404 Not Found</p>
          <h1 class="mt-4 text-[2.8rem] font-semibold leading-[0.95] text-ink sm:text-6xl">
            这个页面还没有
            <span class="hero-native-emphasis">上线</span>
          </h1>
          <p class="mt-6 max-w-2xl text-base leading-8 text-steel sm:text-xl">
            你访问的入口暂时不存在，可能是工具还在规划中，也可能是链接已经变更。
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <RouterLink
              to="/"
              class="tech-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              <Icon
                icon="solar:home-2-bold-duotone"
                class="h-5 w-5"
                aria-hidden="true"
              />
              返回首页
            </RouterLink>

            <RouterLink
              to="/contact"
              class="not-found-secondary-link inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition duration-200"
            >
              <Icon
                icon="solar:chat-round-line-bold-duotone"
                class="h-5 w-5"
                aria-hidden="true"
              />
              联系我
            </RouterLink>
          </div>
        </div>

        <div
          class="not-found-orbit relative z-10 mt-10 hidden min-h-72 items-center justify-center lg:flex"
          aria-hidden="true"
        >
          <div class="not-found-code">404</div>
          <div class="not-found-chip not-found-chip--top">
            <Icon
              icon="solar:map-point-remove-bold-duotone"
              class="h-5 w-5"
            />
          </div>
          <div class="not-found-chip not-found-chip--bottom">
            <Icon
              icon="solar:compass-bold-duotone"
              class="h-5 w-5"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
</script>
