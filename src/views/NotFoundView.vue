<template>
  <section class="section-wrap not-found-section">
    <div class="not-found-shell mx-auto flex max-w-6xl items-center py-8 sm:py-10 lg:py-12">
      <div class="not-found-card surface-card relative grid w-full overflow-hidden px-6 py-8 sm:px-10 sm:py-10 lg:min-h-[34rem] lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-center lg:gap-12 lg:px-12 lg:py-12">
        <div class="relative z-10 max-w-3xl">
          <p class="panel-label text-steel">404 Not Found</p>
          <h1 class="mt-4 text-[2.45rem] font-semibold leading-[1.02] text-ink sm:text-[4rem] lg:text-[4.4rem]">
            页面<span class="hero-native-emphasis">暂未上线</span>
          </h1>
          <p class="mt-5 max-w-2xl text-base leading-8 text-steel sm:text-lg">
            你访问的入口暂时不存在，可能是工具还在规划中，也可能是链接已经变更。
          </p>

          <div class="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <RouterLink
              to="/"
              class="tech-button inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium sm:flex-none"
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
              class="not-found-secondary-link inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition duration-200 sm:flex-none"
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
          class="not-found-orbit relative z-10 mt-10 flex min-h-72 items-center justify-center sm:min-h-80 lg:mt-0"
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
