<template>
  <section class="section-wrap home-hero-section pt-6 sm:pt-10">
    <div class="home-hero-shell mx-auto max-w-6xl">
      <div class="home-hero-card surface-card overflow-hidden px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        <div class="max-w-3xl">
          <p class="panel-label text-steel">网站介绍</p>
          <h1 class="mt-4 text-[2.9rem] font-semibold leading-[0.92] tracking-[-0.05em] text-ink sm:text-6xl">
            你的第一个<span class="hero-native-emphasis">原生</span>网页APP
          </h1>
          <p class="mt-6 max-w-2xl text-base leading-8 text-steel sm:text-xl">
            所有 APP 无需下载，打开网页就能直接使用，后续会在这里持续接入和完善。
          </p>

          <button
            type="button"
            class="tech-button mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium"
            @click="scrollToApps"
          >
            开始使用
          </button>
        </div>
      </div>
    </div>
  </section>

  <section
    id="home-apps"
    class="section-wrap scroll-mt-28 pb-12 pt-5 sm:scroll-mt-32 sm:pb-16 sm:pt-8"
  >
    <div class="mx-auto max-w-6xl">
      <div class="max-w-3xl">
        <p class="panel-label text-steel">APP 展示区</p>
        <h2 class="mt-3 text-3xl font-semibold tracking-[-0.05em] text-ink sm:text-[2.7rem]">
          先用 10 个 app 卡位看看首页效果
        </h2>
        <p class="mt-4 max-w-2xl text-sm leading-7 text-steel sm:text-base">
          第一个先做主卡，剩下 9 个按分组卡位，后面再逐步换成真实 app。
        </p>
      </div>

      <div class="home-app-board mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="app in homeApps"
          :key="app.id"
          class="home-app-card surface-card group flex flex-col items-start justify-between rounded-[2rem] border border-[#122540]/18 bg-white/88 p-6 text-left shadow-[0_20px_40px_rgba(10,22,40,0.08)] transition duration-200 hover:border-cyan-500/28 hover:shadow-[0_26px_48px_rgba(10,22,40,0.12)]"
          :class="[app.featured ? 'home-app-card--featured md:col-span-2 xl:col-span-1 sm:p-8' : 'home-app-card--tile', app.boardClass]"
        >
          <div class="w-full">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="panel-label text-steel">{{ app.label }}</p>
                <h3
                  class="mt-3 font-semibold text-ink"
                  :class="app.featured ? 'text-3xl tracking-[-0.05em] sm:text-[2.8rem]' : 'text-2xl'"
                >
                  {{ app.title }}
                </h3>
              </div>

              <div
                class="flex items-center justify-center rounded-2xl border border-[#17304b]/14 bg-[#eff7ff] text-[#123a63] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
                :class="app.featured ? 'h-14 w-14 text-sm font-semibold' : 'h-11 w-11 text-xs font-semibold'"
              >
                {{ app.badge }}
              </div>
            </div>

            <p
              class="mt-4 text-steel"
              :class="app.featured ? 'max-w-[34ch] text-base leading-8 sm:text-lg' : 'max-w-[26ch] text-base leading-7'"
            >
              {{ app.description }}
            </p>

            <div
              v-if="app.featured"
              class="mt-7 rounded-[1.7rem] border border-dashed border-[#17304b]/18 bg-[#0f2036]/[0.03] p-4 sm:p-5"
            >
              <div class="flex items-center justify-between gap-3">
                <span class="text-sm font-medium text-ink">主入口预览</span>
                <span class="rounded-full border border-[#17304b]/14 bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.14em] text-steel">
                  {{ app.path }}
                </span>
              </div>

              <div class="mt-5 grid gap-3 sm:grid-cols-2">
                <div class="rounded-2xl border border-[#17304b]/14 bg-white/80 px-4 py-4">
                  <p class="panel-label text-steel">阶段</p>
                  <p class="mt-3 text-base font-medium text-ink">{{ app.phase }}</p>
                </div>

                <div class="rounded-2xl border border-[#17304b]/14 bg-white/80 px-4 py-4">
                  <p class="panel-label text-steel">建议</p>
                  <p class="mt-3 text-base font-medium text-ink">{{ app.tip }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 flex w-full items-center justify-between gap-4">
            <span class="rounded-full border border-[#17304b]/14 bg-[#0f2036]/[0.03] px-3 py-1 text-xs uppercase tracking-[0.14em] text-steel">
              {{ app.path }}
            </span>
            <span class="inline-flex items-center rounded-full border border-cyan-500/18 bg-cyan-400/8 px-3 py-1 text-sm font-medium text-ink transition group-hover:border-cyan-500/28 group-hover:bg-cyan-400/12">
              {{ app.status }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
function scrollToApps() {
  if (typeof document === 'undefined') {
    return
  }

  const target = document.getElementById('home-apps')

  target?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

const homeApps = [
  {
    id: 'app-01',
    label: 'App 01',
    title: '首个核心应用',
    badge: '01',
    status: '优先开发',
    path: '/apps/app-01',
    description: '把最先要上线的主流程放在这里，首页会优先突出展示它。后面接路由、接口和真实封面时，这块直接替换就够了。',
    phase: '先接真实功能',
    tip: '优先做成可点击入口',
    featured: true,
    boardClass: 'home-app-card--area-feature'
  },
  {
    id: 'app-02',
    label: 'App 02',
    title: '内容采集器',
    badge: '02',
    status: '待开发',
    path: '/apps/app-02',
    description: '适合放第二个独立工具页。',
    phase: '待补业务内容',
    tip: '后续扩展',
    featured: false,
    boardClass: 'home-app-card--area-app02'
  },
  {
    id: 'app-03',
    label: 'App 03',
    title: '数据看板',
    badge: '03',
    status: '待开发',
    path: '/apps/app-03',
    description: '适合展示列表、指标或趋势页。',
    phase: '待定义结构',
    tip: '后续扩展',
    featured: false,
    boardClass: 'home-app-card--area-app03'
  },
  {
    id: 'app-04',
    label: 'App 04',
    title: '灵感草稿箱',
    badge: '04',
    status: '待开发',
    path: '/apps/app-04',
    description: '适合内容输入、记录和整理。',
    phase: '待接表单交互',
    tip: '后续扩展',
    featured: false,
    boardClass: 'home-app-card--area-app04'
  },
  {
    id: 'app-05',
    label: 'App 05',
    title: '文件整理台',
    badge: '05',
    status: '待开发',
    path: '/apps/app-05',
    description: '适合上传、整理或归档文件流。',
    phase: '待接上传流程',
    tip: '后续扩展',
    featured: false,
    boardClass: 'home-app-card--area-app05'
  },
  {
    id: 'app-06',
    label: 'App 06',
    title: 'Prompt 工作台',
    badge: '06',
    status: '待开发',
    path: '/apps/app-06',
    description: '适合放提示词、模板和调试台。',
    phase: '待补工作流',
    tip: '后续扩展',
    featured: false,
    boardClass: 'home-app-card--area-app06'
  },
  {
    id: 'app-07',
    label: 'App 07',
    title: '发布工具箱',
    badge: '07',
    status: '待开发',
    path: '/apps/app-07',
    description: '适合承接发布、导出和投放。',
    phase: '待接操作面板',
    tip: '后续扩展',
    featured: false,
    boardClass: 'home-app-card--area-app07'
  },
  {
    id: 'app-08',
    label: 'App 08',
    title: '实验沙盒',
    badge: '08',
    status: '待开发',
    path: '/apps/app-08',
    description: '适合试验新功能和新组件。',
    phase: '待搭实验区',
    tip: '后续扩展',
    featured: false,
    boardClass: 'home-app-card--area-app08'
  },
  {
    id: 'app-09',
    label: 'App 09',
    title: '管理后台',
    badge: '09',
    status: '待开发',
    path: '/apps/app-09',
    description: '适合内部管理和状态维护。',
    phase: '待补权限逻辑',
    tip: '后续扩展',
    featured: false,
    boardClass: 'home-app-card--area-app09'
  },
  {
    id: 'app-10',
    label: 'App 10',
    title: '留言联动页',
    badge: '10',
    status: '待开发',
    path: '/apps/app-10',
    description: '适合和联系页、表单页联动。',
    phase: '待接联动入口',
    tip: '后续扩展',
    featured: false,
    boardClass: 'home-app-card--area-app10'
  }
] as const
</script>
