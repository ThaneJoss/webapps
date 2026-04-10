<template>
  <section class="section-wrap home-hero-section">
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
    class="section-wrap home-apps-section pb-12 pt-5 sm:pb-16 sm:pt-8"
  >
    <div class="mx-auto max-w-6xl">
      <div class="max-w-3xl">
        <p class="panel-label text-steel">APP 展示区</p>
        <h2 class="mt-3 text-3xl font-semibold tracking-[-0.05em] text-ink sm:text-[2.7rem]">
          正在上线的网页 APP
        </h2>
        <p class="mt-4 max-w-2xl text-sm leading-7 text-steel sm:text-base">
          首个应用会作为主入口持续更新，更多无需下载、打开即用的网页 APP 会陆续加入。
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
    title: 'PDF 工具箱',
    badge: '01',
    status: '优先上线',
    path: '/pdf',
    description: '把拆分、合并、压缩和页面整理这类原本要装软件才能做的 PDF 操作，直接放到浏览器里完成。',
    phase: '首发应用',
    tip: '优先接入常用处理流程',
    featured: true,
    boardClass: 'home-app-card--area-feature'
  },
  {
    id: 'app-02',
    label: 'App 02',
    title: '图片工具箱',
    badge: '02',
    status: '规划中',
    path: '/image',
    description: '集中处理裁剪、压缩、尺寸调整、格式导出这些高频图片操作，不再依赖桌面软件。',
    phase: '待补编辑能力',
    tip: '先做最常用图片处理',
    featured: false,
    boardClass: 'home-app-card--area-app02'
  },
  {
    id: 'app-03',
    label: 'App 03',
    title: '音视频工具箱',
    badge: '03',
    status: '规划中',
    path: '/media',
    description: '面向音频和视频的轻量处理入口，适合做截取、提取、转码前的快速操作。',
    phase: '待接处理引擎',
    tip: '优先覆盖基础剪裁转换',
    featured: false,
    boardClass: 'home-app-card--area-app03'
  },
  {
    id: 'app-04',
    label: 'App 04',
    title: '在线格式转换',
    badge: '04',
    status: '规划中',
    path: '/convert',
    description: '提供文件与内容格式之间的快速转换，把零散的转换需求统一收进一个网页入口。',
    phase: '待补格式支持',
    tip: '先做最常见格式互转',
    featured: false,
    boardClass: 'home-app-card--area-app04'
  },
  {
    id: 'app-05',
    label: 'App 05',
    title: '口袋电子书',
    badge: '05',
    status: '规划中',
    path: '/ebook',
    description: '在浏览器里整理、阅读和转换常见电子书内容，适合作为随手打开就能用的轻阅读工具。',
    phase: '待接阅读器能力',
    tip: '先完成阅读与导入',
    featured: false,
    boardClass: 'home-app-card--area-app05'
  },
  {
    id: 'app-06',
    label: 'App 06',
    title: '口袋写作（Markdown）',
    badge: '06',
    status: '规划中',
    path: '/markdown',
    description: '用最轻的方式打开就写，适合 Markdown 草稿、文章整理和快速导出。',
    phase: '待接编辑器能力',
    tip: '优先完成写作与预览',
    featured: false,
    boardClass: 'home-app-card--area-app06'
  },
  {
    id: 'app-07',
    label: 'App 07',
    title: '桌面白板',
    badge: '07',
    status: '规划中',
    path: '/whiteboard',
    description: '把随手画、随手写和结构梳理搬到浏览器里，适合做轻量协作或个人思路整理。',
    phase: '待接画布交互',
    tip: '先做基础画写能力',
    featured: false,
    boardClass: 'home-app-card--area-app07'
  },
  {
    id: 'app-08',
    label: 'App 08',
    title: 'API 工作台',
    badge: '08',
    status: '规划中',
    path: '/api-workbench',
    description: '在网页里调试接口、组织请求和查看响应，减少为了试接口额外安装工具的麻烦。',
    phase: '待补请求调试能力',
    tip: '优先完成请求与历史记录',
    featured: false,
    boardClass: 'home-app-card--area-app08'
  },
  {
    id: 'app-09',
    label: 'App 09',
    title: '任务列表',
    badge: '09',
    status: '规划中',
    path: '/tasks',
    description: '一个打开就能记录和整理事项的轻任务页，适合个人待办与短周期安排。',
    phase: '待接列表与筛选',
    tip: '先完成新增与勾选闭环',
    featured: false,
    boardClass: 'home-app-card--area-app09'
  },
  {
    id: 'app-10',
    label: 'App 10',
    title: '私密日记',
    badge: '10',
    status: '规划中',
    path: '/diary',
    description: '面向个人记录的私密写作空间，适合把每天的想法、感受和片段安全地收起来。',
    phase: '待接本地存储与锁定',
    tip: '优先做好隐私感和写作体验',
    featured: false,
    boardClass: 'home-app-card--area-app10'
  }
] as const
</script>
