import type { CatalogApp } from './types'

// addedAt 记录首次加入目录的时间；历史项目按 Git 提交时间回填，依据见 docs/ARCHITECTURE.md。
// 首页按 addedAt 倒序展示；同批加入的应用保留源目录顺序。
// label 与 badge 使用同一序号，按首页顺序从应用总数递减到 01。
export const catalogApps: readonly CatalogApp[] = [
  {
    id: 'card-gallery',
    addedAt: '2026-09-16T18:13:14+08:00',
    label: 'App 10',
    title: '卡间拾光',
    badge: '10',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://card.thanejoss.com'
    },
    description: '浏览银行卡收藏，按银行、卡片类型与卡组织筛选，并查看完整卡面大图。',
    features: ['卡面收藏', '银行筛选', '大图查看']
  },
  {
    id: 'file-transfer',
    addedAt: '2026-08-22T03:13:13+08:00',
    label: 'App 09',
    title: '文件中转站',
    badge: '09',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://file.thanejoss.com'
    },
    description: '通过 8 位取件码发送与接收文件，并在多条线路之间自动选择更合适的传输路径。',
    features: ['取件码', '多线路传输', '完整性校验']
  },
  {
    id: 'ai-api-gateway',
    addedAt: '2026-08-22T03:13:13+08:00',
    label: 'App 08',
    title: 'AI API 网关',
    badge: '08',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://chat.thanejoss.com'
    },
    description: '提供 OpenAI 兼容模型接口与统一管理入口，集中处理模型访问和 API 调用。',
    features: ['OpenAI 兼容', '模型网关', 'API 管理']
  },
  {
    id: 'cloudflare-usage-guard',
    addedAt: '2026-08-22T03:13:13+08:00',
    label: 'App 07',
    title: 'Cloudflare 用量卫士',
    badge: '07',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://cloudflare.thanejoss.com'
    },
    description: '汇总 Cloudflare 资源用量、额度和风险信号，帮助及时发现停服或计费压力。',
    features: ['资源用量', '额度监控', '风险信号']
  },
  {
    id: 't3-code',
    addedAt: '2026-08-22T03:13:13+08:00',
    label: 'App 06',
    title: 'T3 Code',
    badge: '06',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://t3.thanejoss.com'
    },
    description: '在浏览器里打开项目工作区，连接 Codex 会话并处理远程开发任务。',
    features: ['Codex', '项目工作区', '远程开发']
  },
  {
    id: 'codex-workbench',
    addedAt: '2026-08-22T03:13:13+08:00',
    label: 'App 05',
    title: 'Codex 工作台',
    badge: '05',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://codex.thanejoss.com'
    },
    description: '通过网页进入 Codex 工作环境，集中处理代码、任务与远程会话。',
    features: ['代码任务', '工作会话', '远程访问']
  },
  {
    id: 'service-status',
    addedAt: '2026-08-22T03:13:13+08:00',
    label: 'App 04',
    title: '服务状态',
    badge: '04',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://uptime.thanejoss.com'
    },
    description: '集中查看各项服务的在线状态、可用性与近期运行情况。',
    features: ['状态监控', '可用性', '运行记录']
  },
  {
    id: 'portainer',
    addedAt: '2026-08-22T03:13:13+08:00',
    label: 'App 03',
    title: 'Portainer',
    badge: '03',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://portainer.thanejoss.com'
    },
    description: '通过网页管理 Docker 容器、镜像、网络与服务部署。',
    features: ['Docker', '容器管理', '服务部署']
  },
  {
    id: 'webssh',
    addedAt: '2026-08-22T03:13:13+08:00',
    label: 'App 02',
    title: 'WebSSH',
    badge: '02',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://ssh.thanejoss.com'
    },
    description: '在浏览器里连接远程终端，并通过持久化 tmux 保留后台工作。',
    features: ['浏览器终端', 'SSH', 'tmux']
  },
  {
    id: 'remote-desktop',
    addedAt: '2026-08-22T03:13:13+08:00',
    label: 'App 01',
    title: '远程桌面',
    badge: '01',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://vnc.thanejoss.com'
    },
    description: '从浏览器访问远程桌面，处理需要图形界面的主机任务。',
    features: ['浏览器桌面', 'VNC', '图形界面']
  },
  {
    id: 'fast',
    addedAt: '2026-09-21T01:24:56+08:00',
    label: 'App 11',
    title: 'Fast 反向代理',
    badge: '11',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://fast.thanejoss.com'
    },
    description: '代理访问 Ubuntu、npm 等白名单 HTTPS 资源，提供软件源一键配置、IP 白名单、分组管理与访问日志。',
    features: ['Ubuntu / npm 源', '一键配置', 'IP 白名单']
  },
  {
    id: 'bgp',
    addedAt: '2026-09-22T22:18:40+08:00',
    label: 'App 12',
    title: 'BGP 路径观测',
    badge: '12',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://bgp.thanejoss.com'
    },
    description: '探索全球 AS 拓扑，并基于 RouteViews 香港观测数据查询、对比两个 IP 的 BGP AS 路径。',
    features: ['AS 拓扑', 'BGP 路径', '双 IP 对比']
  },
  {
    id: 'leafread',
    addedAt: '2026-09-23T08:15:09Z',
    label: 'App 13',
    title: '叶读 · LeafRead',
    badge: '13',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://epub.thanejoss.com'
    },
    description: '粘贴 EPUB 在线直链或打开本地电子书，在浏览器中阅读，支持目录跳转、字号调整与阅读位置记忆。',
    features: ['在线 / 本地 EPUB', '目录与字号', '阅读进度']
  }
]

export const getCatalogAppsNewestFirst = (apps: readonly CatalogApp[]) => (
  [...apps].sort((a, b) => Date.parse(b.addedAt) - Date.parse(a.addedAt))
)

export const getLatestCatalogApp = (apps: readonly CatalogApp[]) => getCatalogAppsNewestFirst(apps).at(0)

export const interactiveCatalogRoutes = catalogApps.flatMap((app) => (
  app.availability !== 'planned' && app.destination.kind === 'internal'
    ? [app.destination.href]
    : []
))
