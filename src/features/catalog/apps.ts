import type { CatalogApp, CatalogCategory } from './types'

// addedAt 记录首次加入目录的时间；历史项目按 Git 提交时间回填，依据见 docs/ARCHITECTURE.md。
// 首页按用途分区，分区内按 addedAt 倒序展示；同批加入的应用保留源目录顺序。
export const catalogApps: readonly CatalogApp[] = [
  {
    id: 'ccfa',
    addedAt: '2026-10-12T14:56:53Z',
    title: 'CCFA · Zotero 出版物简称',
    category: 'research',
    availability: 'released',
    destination: {
      kind: 'repository',
      href: 'https://github.com/ThaneJoss/ccfa'
    },
    description: '在 Zotero 文献列表显示 CCF A 类期刊与会议简称，依据 2026 年目录离线匹配出版物名称，不修改条目。'
  },
  {
    id: 'title2doi',
    addedAt: '2026-10-12T14:56:53Z',
    title: 'title2doi · DOI 补全工作台',
    category: 'research',
    repositoryUrl: 'https://github.com/ThaneJoss/title2doi',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://title2doi.thanejoss.com'
    },
    description: '批量导入 Zotero 文献，通过 Crossref 查找缺失 DOI，核对匹配后生成脚本回填原条目。'
  },
  {
    id: 'cloudflare-speed-test',
    addedAt: '2026-10-12T14:56:53Z',
    title: 'Cloudflare IP 候选 · Speed Test',
    category: 'network',
    repositoryUrl: 'https://github.com/ThaneJoss/cloudflare-speed-test',
    availability: 'beta',
    destination: {
      kind: 'external',
      href: 'https://cf-speed-test.thanejoss.com'
    },
    description: '生成 Cloudflare IPv4 / IPv6 静态候选；HTTPS 探针待配置，测速与 DNS 写入暂不可用。'
  },
  {
    id: 'card-gallery',
    addedAt: '2026-09-16T18:13:14+08:00',
    title: '卡间拾光',
    category: 'everyday',
    repositoryUrl: 'https://github.com/ThaneJoss/card-gallery',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://card.thanejoss.com'
    },
    description: '浏览银行卡收藏，按银行、卡片类型与卡组织筛选，并查看完整卡面大图。'
  },
  {
    id: 'file-transfer',
    addedAt: '2026-08-22T03:13:13+08:00',
    title: '文件中转站',
    category: 'everyday',
    repositoryUrl: 'https://github.com/ThaneJoss/file-transfer',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://file.thanejoss.com'
    },
    description: '通过 8 位取件码发送与接收文件，并在多条线路之间自动选择更合适的传输路径。'
  },
  {
    id: 'ai-api-gateway',
    addedAt: '2026-08-22T03:13:13+08:00',
    title: 'AI API 网关',
    category: 'ai',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://chat.thanejoss.com'
    },
    description: '提供 OpenAI 兼容模型接口与统一管理入口，集中处理模型访问和 API 调用。'
  },
  {
    id: 'cloudflare-usage-guard',
    addedAt: '2026-08-22T03:13:13+08:00',
    title: 'Cloudflare 用量卫士',
    category: 'operations',
    repositoryUrl: 'https://github.com/ThaneJoss/cloudflare-usage-guard',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://cloudflare.thanejoss.com'
    },
    description: '汇总 Cloudflare 资源用量、额度和风险信号，帮助及时发现停服或计费压力。'
  },
  {
    id: 't3-code',
    addedAt: '2026-08-22T03:13:13+08:00',
    title: 'T3 Code',
    category: 'development',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://t3.thanejoss.com'
    },
    description: '在浏览器里打开项目工作区，连接 Codex 会话并处理远程开发任务。'
  },
  {
    id: 'codex-workbench',
    addedAt: '2026-08-22T03:13:13+08:00',
    title: 'Codex 工作台',
    category: 'development',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://codex.thanejoss.com'
    },
    description: '通过网页进入 Codex 工作环境，集中处理代码、任务与远程会话。'
  },
  {
    id: 'service-status',
    addedAt: '2026-08-22T03:13:13+08:00',
    title: '服务状态',
    category: 'operations',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://uptime.thanejoss.com'
    },
    description: '集中查看各项服务的在线状态、可用性与近期运行情况。'
  },
  {
    id: 'portainer',
    addedAt: '2026-08-22T03:13:13+08:00',
    title: 'Portainer',
    category: 'operations',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://portainer.thanejoss.com'
    },
    description: '通过网页管理 Docker 容器、镜像、网络与服务部署。'
  },
  {
    id: 'webssh',
    addedAt: '2026-08-22T03:13:13+08:00',
    title: 'WebSSH',
    category: 'development',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://ssh.thanejoss.com'
    },
    description: '在浏览器里连接远程终端，并通过持久化 tmux 保留后台工作。'
  },
  {
    id: 'remote-desktop',
    addedAt: '2026-08-22T03:13:13+08:00',
    title: '远程桌面',
    category: 'development',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://vnc.thanejoss.com'
    },
    description: '从浏览器访问远程桌面，处理需要图形界面的主机任务。'
  },
  {
    id: 'fast',
    addedAt: '2026-09-21T01:24:56+08:00',
    title: 'Fast 反向代理',
    category: 'network',
    repositoryUrl: 'https://github.com/ThaneJoss/fast',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://fast.thanejoss.com'
    },
    description: '流式代理 Ubuntu、npm 白名单 HTTPS 资源，支持一键配置、断点续传及按 IP 汇总的访问日志与分组管理。'
  },
  {
    id: 'bgp',
    addedAt: '2026-09-22T22:18:40+08:00',
    title: 'BGP 路径观测',
    category: 'network',
    repositoryUrl: 'https://github.com/ThaneJoss/bgp',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://bgp.thanejoss.com'
    },
    description: '探索全球 AS 拓扑，按需获取或导入 RouteViews 香港数据，在浏览器中解析并对比两个 IP 的 BGP 观测路径。'
  },
  {
    id: 'leafread',
    addedAt: '2026-09-23T08:15:09Z',
    title: '叶读 · LeafRead',
    category: 'everyday',
    repositoryUrl: 'https://github.com/ThaneJoss/epub',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://epub.thanejoss.com'
    },
    description: '粘贴 EPUB 在线直链或打开本地电子书，在电脑和手机上单页翻阅，支持目录、字号、书签与阅读位置记忆。'
  },
  {
    id: 'dify',
    addedAt: '2026-09-26T17:24:43Z',
    title: 'Dify AI 工作台',
    category: 'ai',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://dify.thanejoss.com'
    },
    description: '通过可视化工作流编排 AI 应用，连接模型与知识库，构建聊天助手和自动化任务。'
  },
  {
    id: 'flowmaster',
    addedAt: '2026-10-04T18:23:15Z',
    title: 'FlowMaster 研究工作区',
    category: 'research',
    repositoryUrl: 'https://github.com/ThaneJoss/flowmaster',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://flow.thanejoss.com'
    },
    description: '用可视化节点组织研究流程，记录执行结果与关联资料，并向 MCP 客户端提供共享工作区读写。'
  },
  {
    id: 'manifold',
    addedAt: '2026-10-08T14:51:34Z',
    title: '形 · 流 / Manifold',
    category: 'research',
    repositoryUrl: 'https://github.com/ThaneJoss/manifold',
    availability: 'live',
    destination: {
      kind: 'external',
      href: 'https://manifold.thanejoss.com'
    },
    description: '绘制闭合形状，叠加局部速度场，观察表面张力与 KL 形状先验如何影响二维边界。'
  }
]

export const getCatalogAppsNewestFirst = (apps: readonly CatalogApp[]) => (
  [...apps].sort((a, b) => Date.parse(b.addedAt) - Date.parse(a.addedAt))
)

export const getLatestCatalogApp = (apps: readonly CatalogApp[]) => getCatalogAppsNewestFirst(apps).at(0)

export const catalogCategories = [
  { id: 'research', title: '研究与实验', description: '整理文献，连接研究流程，探索新的想法。' },
  { id: 'ai', title: 'AI 应用', description: '连接模型，将想法编排成可用的 AI 应用。' },
  { id: 'development', title: '开发与远程', description: '打开工作区，连接终端与桌面，继续手上的工作。' },
  { id: 'network', title: '网络工具', description: '访问资源，观察网络，探索连接与路径。' },
  { id: 'operations', title: '运维管理', description: '查看服务状态、资源用量与容器部署。' },
  { id: 'everyday', title: '日常与收藏', description: '读一本书，传一份文件，留住喜欢的收藏。' }
] as const satisfies readonly { id: CatalogCategory; title: string; description: string }[]

export const getCatalogGroups = (apps: readonly CatalogApp[]) => {
  const sortedApps = getCatalogAppsNewestFirst(apps)
  return catalogCategories
    .map((category) => ({
      ...category,
      apps: sortedApps.filter((app) => app.category === category.id)
    }))
    .filter((group) => group.apps.length > 0)
}

export const interactiveCatalogRoutes = catalogApps.flatMap((app) => (
  app.availability !== 'planned' && app.destination.kind === 'internal'
    ? [app.destination.href]
    : []
))
