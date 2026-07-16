import type { CatalogApp } from './types'

export const catalogApps: readonly CatalogApp[] = [
  {
    id: 'app-01',
    label: 'App 01',
    title: 'PDF 工具箱',
    badge: '01',
    availability: 'planned',
    route: null,
    description: '规划集中处理拆分、合并、压缩和页面整理等高频 PDF 操作。',
    quickEntries: [
      { id: 'pdf-merge', label: '合并 PDF', availability: 'planned', route: null },
      { id: 'pdf-split', label: '拆分页面', availability: 'planned', route: null },
      { id: 'pdf-compress', label: '压缩体积', availability: 'planned', route: null },
      { id: 'pdf-image', label: '图片转 PDF', availability: 'planned', route: null },
      { id: 'pdf-extract', label: '提取页面', availability: 'planned', route: null },
      { id: 'pdf-watermark', label: '添加水印', availability: 'planned', route: null }
    ],
    featured: true,
    boardClass: 'home-app-card--area-feature'
  },
  {
    id: 'app-02',
    label: 'App 02',
    title: '图片工具箱',
    badge: '02',
    availability: 'planned',
    route: null,
    description: '规划集中处理裁剪、压缩、尺寸调整和格式导出等高频图片操作。',
    quickEntries: [
      { id: 'image-crop', label: '裁剪尺寸', availability: 'planned', route: null },
      { id: 'image-compress', label: '批量压缩', availability: 'planned', route: null },
      { id: 'image-convert', label: '格式导出', availability: 'planned', route: null }
    ],
    featured: false,
    boardClass: 'home-app-card--area-app02'
  },
  {
    id: 'app-03',
    label: 'App 03',
    title: '音视频工具箱',
    badge: '03',
    availability: 'planned',
    route: null,
    description: '规划提供音频和视频的截取、提取与轻量转码入口。',
    quickEntries: [
      { id: 'media-audio', label: '提取音频', availability: 'planned', route: null },
      { id: 'media-trim', label: '剪辑片段', availability: 'planned', route: null },
      { id: 'media-gif', label: '视频转 GIF', availability: 'planned', route: null }
    ],
    featured: false,
    boardClass: 'home-app-card--area-app03'
  },
  {
    id: 'app-04',
    label: 'App 04',
    title: '在线格式转换',
    badge: '04',
    availability: 'planned',
    route: null,
    description: '规划统一常见文件、表格和数据格式之间的转换入口。',
    quickEntries: [
      { id: 'convert-document', label: '文档互转', availability: 'planned', route: null },
      { id: 'convert-table', label: '表格互转', availability: 'planned', route: null },
      { id: 'convert-data', label: '数据格式', availability: 'planned', route: null },
      { id: 'convert-batch', label: '批量转换', availability: 'planned', route: null }
    ],
    featured: false,
    boardClass: 'home-app-card--area-app04'
  },
  {
    id: 'app-05',
    label: 'App 05',
    title: '口袋电子书',
    badge: '05',
    availability: 'planned',
    route: null,
    description: '规划在浏览器里整理、阅读和转换常见电子书内容。',
    quickEntries: [
      { id: 'ebook-read', label: 'EPUB 阅读', availability: 'planned', route: null },
      { id: 'ebook-import', label: 'TXT 导入', availability: 'planned', route: null },
      { id: 'ebook-chapters', label: '目录整理', availability: 'planned', route: null }
    ],
    featured: false,
    boardClass: 'home-app-card--area-app05'
  },
  {
    id: 'app-06',
    label: 'App 06',
    title: '口袋写作',
    badge: '06',
    availability: 'planned',
    route: null,
    description: '规划提供 Markdown 草稿、文章整理和快速导出能力。',
    quickEntries: [
      { id: 'markdown-preview', label: '即时预览', availability: 'planned', route: null },
      { id: 'markdown-focus', label: '专注模式', availability: 'planned', route: null },
      { id: 'markdown-export', label: '导出 HTML', availability: 'planned', route: null }
    ],
    featured: false,
    boardClass: 'home-app-card--area-app06'
  },
  {
    id: 'app-07',
    label: 'App 07',
    title: '桌面白板',
    badge: '07',
    availability: 'planned',
    route: null,
    description: '规划提供随手绘制、便签和结构梳理能力。',
    quickEntries: [
      { id: 'whiteboard-draw', label: '自由绘图', availability: 'planned', route: null },
      { id: 'whiteboard-sticky', label: '便签贴纸', availability: 'planned', route: null },
      { id: 'whiteboard-map', label: '脑图草稿', availability: 'planned', route: null }
    ],
    featured: false,
    boardClass: 'home-app-card--area-app07'
  },
  {
    id: 'app-08',
    label: 'App 08',
    title: 'API 工作台',
    badge: '08',
    availability: 'planned',
    route: null,
    description: '规划在网页里组织请求、查看响应和管理调试历史。',
    quickEntries: [
      { id: 'api-request', label: '快速请求', availability: 'planned', route: null },
      { id: 'api-format', label: '响应格式化', availability: 'planned', route: null },
      { id: 'api-history', label: '请求历史', availability: 'planned', route: null }
    ],
    featured: false,
    boardClass: 'home-app-card--area-app08'
  },
  {
    id: 'app-09',
    label: 'App 09',
    title: '任务列表',
    badge: '09',
    availability: 'planned',
    route: null,
    description: '规划个人待办、项目分组和短周期专注安排。',
    quickEntries: [
      { id: 'tasks-today', label: '今日清单', availability: 'planned', route: null },
      { id: 'tasks-projects', label: '项目分组', availability: 'planned', route: null },
      { id: 'tasks-focus', label: '专注计时', availability: 'planned', route: null }
    ],
    featured: false,
    boardClass: 'home-app-card--area-app09'
  },
  {
    id: 'app-10',
    label: 'App 10',
    title: '私密日记',
    badge: '10',
    availability: 'planned',
    route: null,
    description: '规划面向个人记录的私密写作和回顾空间。',
    quickEntries: [
      { id: 'diary-today', label: '今天一页', availability: 'planned', route: null },
      { id: 'diary-mood', label: '情绪标签', availability: 'planned', route: null },
      { id: 'diary-lock', label: '本地锁定', availability: 'planned', route: null },
      { id: 'diary-calendar', label: '回顾日历', availability: 'planned', route: null }
    ],
    featured: false,
    boardClass: 'home-app-card--area-app10'
  }
]

export const interactiveCatalogRoutes = catalogApps.flatMap((app) => [
  ...(app.availability === 'planned' ? [] : [app.route]),
  ...app.quickEntries.flatMap((entry) => (
    entry.availability === 'planned' ? [] : [entry.route]
  ))
])
