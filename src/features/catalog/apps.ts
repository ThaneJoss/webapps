import type { CatalogApp } from './types'

export const catalogApps: readonly CatalogApp[] = [
  {
    id: 'file-transfer',
    label: 'App 01',
    title: '文件中转站',
    badge: '01',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://file.thanejoss.com'
    },
    description: '通过 8 位取件码发送与接收文件，并在多条线路之间自动选择更合适的传输路径。',
    features: ['取件码', '多线路传输', '完整性校验'],
    displayTier: 'featured'
  },
  {
    id: 'ai-api-gateway',
    label: 'App 02',
    title: 'AI API 网关',
    badge: '02',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://chat.thanejoss.com'
    },
    description: '提供 OpenAI 兼容模型接口与统一管理入口，集中处理模型访问和 API 调用。',
    features: ['OpenAI 兼容', '模型网关', 'API 管理'],
    displayTier: 'standard'
  },
  {
    id: 'cloudflare-usage-guard',
    label: 'App 03',
    title: 'Cloudflare 用量卫士',
    badge: '03',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://cloudflare.thanejoss.com'
    },
    description: '汇总 Cloudflare 资源用量、额度和风险信号，帮助及时发现停服或计费压力。',
    features: ['资源用量', '额度监控', '风险信号'],
    displayTier: 'standard'
  },
  {
    id: 't3-code',
    label: 'App 04',
    title: 'T3 Code',
    badge: '04',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://t3.thanejoss.com'
    },
    description: '在浏览器里打开项目工作区，连接 Codex 会话并处理远程开发任务。',
    features: ['Codex', '项目工作区', '远程开发'],
    displayTier: 'standard'
  },
  {
    id: 'codex-workbench',
    label: 'App 05',
    title: 'Codex 工作台',
    badge: '05',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://codex.thanejoss.com'
    },
    description: '通过网页进入 Codex 工作环境，集中处理代码、任务与远程会话。',
    features: ['代码任务', '工作会话', '远程访问'],
    displayTier: 'standard'
  },
  {
    id: 'service-status',
    label: 'App 06',
    title: '服务状态',
    badge: '06',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://uptime.thanejoss.com'
    },
    description: '集中查看各项服务的在线状态、可用性与近期运行情况。',
    features: ['状态监控', '可用性', '运行记录'],
    displayTier: 'standard'
  },
  {
    id: 'portainer',
    label: 'App 07',
    title: 'Portainer',
    badge: '07',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://portainer.thanejoss.com'
    },
    description: '通过网页管理 Docker 容器、镜像、网络与服务部署。',
    features: ['Docker', '容器管理', '服务部署'],
    displayTier: 'standard'
  },
  {
    id: 'webssh',
    label: 'App 08',
    title: 'WebSSH',
    badge: '08',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://ssh.thanejoss.com'
    },
    description: '在浏览器里连接远程终端，并通过持久化 tmux 保留后台工作。',
    features: ['浏览器终端', 'SSH', 'tmux'],
    displayTier: 'standard'
  },
  {
    id: 'remote-desktop',
    label: 'App 09',
    title: '远程桌面',
    badge: '09',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://vnc.thanejoss.com'
    },
    description: '从浏览器访问远程桌面，处理需要图形界面的主机任务。',
    features: ['浏览器桌面', 'VNC', '图形界面'],
    displayTier: 'standard'
  },
  {
    id: 'card-gallery',
    label: 'App 10',
    title: '卡间拾光',
    badge: '10',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://card-gallery-joss-projects-83f40f4e.vercel.app'
    },
    description: '浏览银行卡收藏，按银行、卡片类型与卡组织筛选，并查看完整卡面大图。',
    features: ['卡面收藏', '银行筛选', '大图查看'],
    displayTier: 'standard'
  }
]

export const interactiveCatalogRoutes = catalogApps.flatMap((app) => (
  app.availability !== 'planned' && app.destination.kind === 'internal'
    ? [app.destination.href]
    : []
))
