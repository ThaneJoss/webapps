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
              class="home-app-feature-panel mt-7 rounded-[1.7rem] p-4 sm:p-5"
            >
              <div class="home-app-quick-grid grid gap-3 sm:grid-cols-2">
                <a
                  v-for="entry in app.quickEntries"
                  :key="entry.path"
                  :href="entry.path"
                  class="home-app-quick-card rounded-2xl border border-[#17304b]/14 bg-white/84 px-4 py-4 transition duration-200"
                >
                  <span class="home-app-quick-card__icon">
                    <Icon
                      :icon="entry.icon"
                      class="h-5 w-5"
                    />
                  </span>
                  <span class="home-app-quick-card__label">{{ entry.label }}</span>
                </a>
              </div>
            </div>

            <div
              v-else-if="app.secondaryStyle === 'medium'"
              class="home-app-medium-entries mt-5 grid gap-3 sm:grid-cols-2"
            >
              <a
                v-for="entry in app.quickEntries"
                :key="entry.path"
                :href="entry.path"
                class="home-app-medium-entry rounded-[1.35rem] border border-[#17304b]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(244,249,255,0.92))] px-4 py-4 transition duration-200"
              >
                <span class="home-app-medium-entry__icon">
                  <Icon
                    :icon="entry.icon"
                    class="h-4.5 w-4.5"
                  />
                </span>
                <span class="home-app-medium-entry__label">{{ entry.label }}</span>
              </a>
            </div>

            <div
              v-else
              class="home-app-mini-entries mt-5 flex flex-wrap gap-2.5"
            >
              <a
                v-for="entry in app.quickEntries"
                :key="entry.path"
                :href="entry.path"
                class="home-app-mini-entry inline-flex items-center rounded-full border border-[#17304b]/14 bg-[#0f2036]/[0.03] px-3 py-2 text-sm text-ink transition duration-200"
              >
                <span class="home-app-mini-entry__icon">
                  <Icon
                    :icon="entry.icon"
                    class="h-4 w-4 shrink-0"
                  />
                </span>
                <span>{{ entry.label }}</span>
              </a>
            </div>
          </div>

          <div class="mt-8 flex w-full items-center justify-end">
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
import { Icon } from '@iconify/vue'

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
    description: '把拆分、合并、压缩和页面整理这些高频 PDF 操作集中到一个顺手可用的网页入口。',
    quickEntries: [
      {
        label: '合并 PDF',
        path: '/pdf/merge',
        icon: 'solar:document-add-bold-duotone'
      },
      {
        label: '拆分页面',
        path: '/pdf/split',
        icon: 'solar:documents-bold-duotone'
      },
      {
        label: '压缩体积',
        path: '/pdf/compress',
        icon: 'solar:minimize-square-3-bold-duotone'
      },
      {
        label: '图片转 PDF',
        path: '/pdf/image-to-pdf',
        icon: 'solar:gallery-wide-bold-duotone'
      },
      {
        label: '提取页面',
        path: '/pdf/extract',
        icon: 'solar:sidebar-code-bold-duotone'
      },
      {
        label: '添加水印',
        path: '/pdf/watermark',
        icon: 'solar:sticker-smile-circle-2-bold-duotone'
      }
    ],
    secondaryStyle: 'large',
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
    description: '集中处理裁剪、压缩、尺寸调整和格式导出这些高频图片操作。',
    quickEntries: [
      {
        label: '裁剪尺寸',
        path: '/image/crop',
        icon: 'solar:crop-minimalistic-bold-duotone'
      },
      {
        label: '批量压缩',
        path: '/image/compress',
        icon: 'solar:layers-bold-duotone'
      },
      {
        label: '格式导出',
        path: '/image/convert',
        icon: 'solar:refresh-square-bold-duotone'
      }
    ],
    secondaryStyle: 'small',
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
    quickEntries: [
      {
        label: '提取音频',
        path: '/media/extract-audio',
        icon: 'solar:music-note-bold-duotone'
      },
      {
        label: '剪辑片段',
        path: '/media/trim',
        icon: 'solar:scissors-bold-duotone'
      },
      {
        label: '视频转 GIF',
        path: '/media/gif',
        icon: 'solar:videocamera-record-bold-duotone'
      }
    ],
    secondaryStyle: 'small',
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
    quickEntries: [
      {
        label: '文档互转',
        path: '/convert/document',
        icon: 'solar:document-text-bold-duotone'
      },
      {
        label: '表格互转',
        path: '/convert/table',
        icon: 'solar:widget-2-bold-duotone'
      },
      {
        label: '数据格式',
        path: '/convert/data',
        icon: 'solar:code-square-bold-duotone'
      },
      {
        label: '批量转换',
        path: '/convert/batch',
        icon: 'solar:repeat-bold-duotone'
      }
    ],
    secondaryStyle: 'medium',
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
    quickEntries: [
      {
        label: 'EPUB 阅读',
        path: '/ebook/read',
        icon: 'solar:book-bookmark-bold-duotone'
      },
      {
        label: 'TXT 导入',
        path: '/ebook/import',
        icon: 'solar:import-bold-duotone'
      },
      {
        label: '目录整理',
        path: '/ebook/chapters',
        icon: 'solar:list-check-bold-duotone'
      }
    ],
    secondaryStyle: 'small',
    featured: false,
    boardClass: 'home-app-card--area-app05'
  },
  {
    id: 'app-06',
    label: 'App 06',
    title: '口袋写作',
    badge: '06',
    status: '规划中',
    path: '/markdown',
    description: '用最轻的方式打开就写，适合 Markdown 草稿、文章整理和快速导出。',
    quickEntries: [
      {
        label: '即时预览',
        path: '/markdown/preview',
        icon: 'solar:eye-bold-duotone'
      },
      {
        label: '专注模式',
        path: '/markdown/focus',
        icon: 'solar:target-bold-duotone'
      },
      {
        label: '导出 HTML',
        path: '/markdown/export',
        icon: 'solar:export-bold-duotone'
      }
    ],
    secondaryStyle: 'small',
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
    quickEntries: [
      {
        label: '自由绘图',
        path: '/whiteboard/draw',
        icon: 'solar:pen-2-bold-duotone'
      },
      {
        label: '便签贴纸',
        path: '/whiteboard/sticky',
        icon: 'solar:notes-bold-duotone'
      },
      {
        label: '脑图草稿',
        path: '/whiteboard/map',
        icon: 'solar:diagram-up-bold-duotone'
      }
    ],
    secondaryStyle: 'small',
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
    description: '在网页里调试接口、组织请求和查看响应，把常用的接口测试动作收进同一个工作台。',
    quickEntries: [
      {
        label: '快速请求',
        path: '/api-workbench/request',
        icon: 'solar:rocket-bold-duotone'
      },
      {
        label: '响应格式化',
        path: '/api-workbench/format',
        icon: 'solar:magic-stick-3-bold-duotone'
      },
      {
        label: '请求历史',
        path: '/api-workbench/history',
        icon: 'solar:history-bold-duotone'
      }
    ],
    secondaryStyle: 'small',
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
    quickEntries: [
      {
        label: '今日清单',
        path: '/tasks/today',
        icon: 'solar:checklist-bold-duotone'
      },
      {
        label: '项目分组',
        path: '/tasks/projects',
        icon: 'solar:folder-with-files-bold-duotone'
      },
      {
        label: '专注计时',
        path: '/tasks/focus',
        icon: 'solar:clock-circle-bold-duotone'
      }
    ],
    secondaryStyle: 'small',
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
    quickEntries: [
      {
        label: '今天一页',
        path: '/diary/today',
        icon: 'solar:calendar-mark-bold-duotone'
      },
      {
        label: '情绪标签',
        path: '/diary/mood',
        icon: 'solar:smile-circle-bold-duotone'
      },
      {
        label: '本地锁定',
        path: '/diary/lock',
        icon: 'solar:lock-keyhole-bold-duotone'
      },
      {
        label: '回顾日历',
        path: '/diary/calendar',
        icon: 'solar:calendar-search-bold-duotone'
      }
    ],
    secondaryStyle: 'medium',
    featured: false,
    boardClass: 'home-app-card--area-app10'
  }
] as const
</script>
