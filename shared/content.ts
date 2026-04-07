import type {
  AppItem,
  BuildStep,
  ServiceItem,
  SignalMetric,
  TechPillar
} from './types.js'

export const heroSignals: SignalMetric[] = [
  {
    id: 'lock-in',
    label: 'Platform lock-in',
    value: '0 bindings',
    tone: 'good'
  },
  {
    id: 'contract',
    label: 'API contract',
    value: 'REST / JSON',
    tone: 'accent'
  },
  {
    id: 'stack',
    label: 'Frontend stack',
    value: 'Vue + TypeScript',
    tone: 'neutral'
  },
  {
    id: 'runtime',
    label: 'Runtime target',
    value: 'Serverless-ready',
    tone: 'good'
  }
]

export const servicesSeed: ServiceItem[] = [
  {
    id: 'launch-sites',
    title: 'Launch Sites',
    description:
      '为新产品、功能包和服务入口构建高完成度展示页，让信息清晰、可信、能转化。',
    tags: ['Landing', 'Marketing', 'Conversion']
  },
  {
    id: 'ops-dashboards',
    title: 'Ops Dashboards',
    description:
      '把业务流程、运营指标和任务流收敛成单一工作界面，减少切页与沟通成本。',
    tags: ['Dashboard', 'Internal Tools', 'Workflow']
  },
  {
    id: 'ai-workspaces',
    title: 'AI Workspaces',
    description:
      '面向 AI 检索、内容生成和辅助决策的前端工作台，强调可维护的交互结构。',
    tags: ['AI UI', 'Search', 'Assistive Tools']
  },
  {
    id: 'intake-portals',
    title: 'Intake Portals',
    description:
      '适合接收需求、任务、表单或工单的统一入口，可继续延伸为审批与自动化面板。',
    tags: ['Forms', 'Automation', 'REST API']
  }
]

export const buildSteps: BuildStep[] = [
  {
    id: 'discover',
    marker: '01',
    title: 'Discover',
    description: '确认目标用户、核心动作和上线边界，把范围收紧到第一版真的能交付。'
  },
  {
    id: 'shape',
    marker: '02',
    title: 'Shape',
    description: '先定页面结构、接口契约和关键状态，再进入编码，避免边做边猜。'
  },
  {
    id: 'ship',
    marker: '03',
    title: 'Ship',
    description: '用 Vue 前端和通用 REST API 落地功能，优先解决真实可用性而不是样板复杂度。'
  },
  {
    id: 'iterate',
    marker: '04',
    title: 'Iterate',
    description: '上线后再补数据流、权限或自动化能力，让系统自然扩张，而不是一次性堆满。'
  }
]

export const techPillars: TechPillar[] = [
  {
    id: 'frontend',
    title: 'Vue Frontend',
    summary: 'Vite + Vue 3 + TypeScript，开发反馈快，结构比重型框架更适合新手进入。',
    details: ['组合式 API', '路由预留扩展', '现代响应式布局']
  },
  {
    id: 'api',
    title: 'Hono REST API',
    summary: '接口保持标准 HTTP 设计，不和平台绑定能力耦合，迁移成本更低。',
    details: ['RESTful routes', '统一 JSON envelope', '轻量校验逻辑']
  },
  {
    id: 'deploy',
    title: 'Serverless-Ready',
    summary: '先做通用架构，再根据平台选择部署方案，不被 wrangler bind 这类能力锁死。',
    details: ['Cloudflare ready', 'Vercel friendly', 'Node fallback']
  },
  {
    id: 'quality',
    title: 'Fast and Maintainable',
    summary: '优先用清晰组件边界、共享类型和可替换接口，降低后续迭代摩擦。',
    details: ['Shared types', 'API fallback', 'Type-safe fetch']
  }
]

export const appPipelineSeed: AppItem[] = [
  {
    id: 'client-intake-hub',
    name: 'Client Intake Hub',
    status: 'In Design',
    summary: '面向外部需求提交和内部任务分派的入口层，适合服务型项目的首批流程数字化。',
    tags: ['Lead Capture', 'Task Intake', 'Forms']
  },
  {
    id: 'ops-runboard',
    name: 'Ops Runboard',
    status: 'Prototype',
    summary: '将每日运营动作、待办清单和状态追踪聚合到一个运行面板中。',
    tags: ['Dashboard', 'Workflow', 'Status']
  },
  {
    id: 'knowledge-sprint-desk',
    name: 'Knowledge Sprint Desk',
    status: 'Research',
    summary: '把文档检索、摘要生成和动作建议集中进单一 AI 工作台。',
    tags: ['AI Workspace', 'Knowledge', 'RAG UI']
  }
]
