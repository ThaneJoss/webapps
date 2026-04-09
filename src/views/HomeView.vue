<template>
  <section class="section-wrap pt-6 sm:pt-10">
    <div class="mx-auto max-w-6xl">
      <div class="surface-card overflow-hidden px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        <div class="max-w-3xl">
          <p class="panel-label text-steel">网站介绍</p>
          <h1 class="mt-4 text-[2.9rem] font-semibold leading-[0.92] tracking-[-0.05em] text-ink sm:text-6xl">
            你的第一个<span class="hero-native-emphasis">原生</span>网页APP
          </h1>
          <p class="mt-6 max-w-2xl text-base leading-8 text-steel sm:text-xl">
            从这里开始，以更纯净清晰的方式逐步呈现完整内容、联系入口与后续更新。
          </p>

          <RouterLink
            to="/contact"
            class="tech-button mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium"
          >
            前往联系页
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <section class="section-wrap pb-12 pt-5 sm:pb-16 sm:pt-8">
    <div class="mx-auto grid max-w-6xl gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)]">
      <div class="surface-card px-6 py-7 sm:px-8 sm:py-8">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-2xl">
            <p class="panel-label text-steel">APP 预留区</p>
            <h2 class="mt-3 text-3xl font-semibold tracking-[-0.05em] text-ink sm:text-[2.7rem]">
              首页已经预留出开始开发的位置
            </h2>
          </div>

          <p class="max-w-lg text-sm leading-7 text-steel sm:text-base">
            先把入口、状态、路径和预览框架摆好。你开始开发时，直接替换卡片标题、封面、路由和按钮就可以接入真实 app。
          </p>
        </div>

        <div class="mt-8 grid gap-4 lg:grid-cols-3">
          <article
            v-for="slot in appSlots"
            :key="slot.id"
            class="app-slot-card"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="panel-label text-steel">{{ slot.label }}</p>
                <h3 class="mt-3 text-2xl font-semibold text-ink">{{ slot.title }}</h3>
              </div>

              <span class="app-slot-status">
                {{ slot.status }}
              </span>
            </div>

            <div class="app-slot-screen">
              <div class="app-slot-screen-bar">
                <span class="app-slot-dot bg-[#ff8d6b]"></span>
                <span class="app-slot-dot bg-[#8bf0d9]"></span>
                <span class="app-slot-dot bg-[#66e4ff]"></span>
              </div>

              <div class="mt-4 flex items-center justify-between gap-3">
                <span class="text-sm font-medium text-ink">{{ slot.title }}</span>
                <span class="app-slot-route">{{ slot.path }}</span>
              </div>

              <div class="mt-4 space-y-3">
                <div class="app-slot-line app-slot-line--long"></div>
                <div class="app-slot-line app-slot-line--medium"></div>
                <div class="app-slot-line app-slot-line--short"></div>
              </div>
            </div>

            <p class="mt-5 text-sm leading-7 text-steel sm:text-base">
              {{ slot.description }}
            </p>

            <div class="mt-6 flex flex-wrap items-center gap-2">
              <span class="app-slot-meta">
                {{ slot.meta }}
              </span>
              <span class="app-slot-meta">
                {{ slot.phase }}
              </span>
            </div>
          </article>
        </div>
      </div>

      <aside class="surface-card px-6 py-7 sm:px-8 sm:py-8">
        <p class="panel-label text-steel">开发准备</p>
        <h2 class="mt-3 text-3xl font-semibold tracking-[-0.05em] text-ink">
          先从这些预留位开始
        </h2>

        <div class="mt-7 space-y-3">
          <article
            v-for="item in launchChecklist"
            :key="item.step"
            class="app-launch-item"
          >
            <span class="app-launch-step">{{ item.step }}</span>

            <div>
              <h3 class="text-base font-semibold text-ink">
                {{ item.title }}
              </h3>
              <p class="mt-2 text-sm leading-7 text-steel">
                {{ item.description }}
              </p>
            </div>
          </article>
        </div>

        <div class="app-dev-note mt-7">
          <p class="panel-label text-steel">建议起点</p>
          <p class="mt-3 text-base leading-7 text-ink">
            优先把第一张卡片接成真实 app，把首页当作总入口。等第一个流程稳定后，再继续补第二个和第三个 app。
          </p>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const appSlots = [
  {
    id: 'app-01',
    label: 'App 01',
    title: '首个核心应用',
    status: '优先开发',
    path: '/apps/app-01',
    description: '适合先接通你的主流程、接口请求和真实交互，后续可以直接替换成正式标题、封面与按钮。',
    meta: '预留首页主入口',
    phase: '待接入真实路由'
  },
  {
    id: 'app-02',
    label: 'App 02',
    title: '第二个功能模块',
    status: '继续扩展',
    path: '/apps/app-02',
    description: '可以用来承接第二阶段的功能，和第一个 app 共享导航与视觉风格，但保持独立的页面结构。',
    meta: '预留功能延展位',
    phase: '待补业务内容'
  },
  {
    id: 'app-03',
    label: 'App 03',
    title: '实验或工具页',
    status: '后续开放',
    path: '/apps/app-03',
    description: '适合放试验性的工具、单页应用或内部能力验证。现在先保留展示位，方便后面快速填充。',
    meta: '预留实验位',
    phase: '待定义方向'
  }
] as const

const launchChecklist = [
  {
    step: '01',
    title: '先替换第一张卡片',
    description: '把第一个 app 卡位接上真实标题、简介和页面路由，首页就能马上承担导航入口。'
  },
  {
    step: '02',
    title: '补预览封面和状态',
    description: '把模拟预览框换成真实模块截图、封面或组件缩略图，状态标签也可以改成开发中、内测或已发布。'
  },
  {
    step: '03',
    title: '逐步扩展成矩阵',
    description: '等第一个 app 跑通之后，再继续填第二个和第三个卡位，首页就会自然长成你的 app 总览页。'
  }
] as const
</script>
