<template>
  <section
    class="section-wrap not-found-section"
    data-page-ready="not-found"
  >
    <div class="not-found-shell mx-auto flex max-w-6xl items-center py-8 sm:py-10 lg:py-12">
      <div class="not-found-card surface-card relative grid w-full overflow-hidden px-6 py-8 sm:px-10 sm:py-10 lg:min-h-[34rem] lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-center lg:gap-12 lg:px-12 lg:py-12">
        <div class="relative z-10 max-w-3xl">
          <p class="panel-label text-steel">404 Not Found</p>
          <h1 class="mt-4 text-[2.45rem] font-semibold leading-[1.02] text-ink sm:text-[4rem] lg:text-[4.4rem]">
            页面<span class="hero-native-emphasis">不存在</span>
          </h1>
          <p class="mt-5 max-w-2xl text-base leading-8 text-steel sm:text-lg">
            你访问的入口不存在。规划中的工具不会提前创建空页面，请从首页查看当前规划。
          </p>

          <div class="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <RouterLink
              to="/"
              class="tech-button inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium sm:flex-none"
            >
              <HomeIcon
                class="h-5 w-5"
                aria-hidden="true"
              />
              返回首页
            </RouterLink>

            <RouterLink
              to="/contact"
              class="secondary-action inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium sm:flex-none"
            >
              <ChatIcon
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
            <MapRemoveIcon class="h-5 w-5" />
          </div>
          <div class="not-found-chip not-found-chip--bottom">
            <CompassIcon class="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ChatIcon from '~icons/solar/chat-round-line-bold-duotone'
import CompassIcon from '~icons/solar/compass-bold-duotone'
import HomeIcon from '~icons/solar/home-2-bold-duotone'
import MapRemoveIcon from '~icons/solar/map-point-remove-bold-duotone'
</script>
