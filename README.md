# Web Apps as a Service

一个使用 Vue 构建的静态网页 APP 与开源项目导航展示站。

首页通过 typed catalog 展示 19 个应用与项目：17 个已上线网站、1 个测试中网站和 1 个已发布 Zotero 插件，覆盖文献工具、二维形状实验、研究流程、电子书阅读、文件传输、AI、开发、远程连接、运维、网络观测和卡面收藏场景。外部入口使用受类型约束的 HTTPS 地址；未来的站内应用仍必须先注册真实路由，才能标记为 `beta` 或 `live`。

首页按新增时间倒序（newest first）展示应用：`src/features/catalog/apps.ts` 中的 `addedAt` 记录首次加入目录的时间，历史项目根据 Git 提交时间回填，最新一项展示为「最新项目」，其余应用继续按时间倒序；同批加入的应用保留原顺序。当前顺序为 CCFA、title2doi、Cloudflare IP 候选 · Speed Test、Manifold、FlowMaster、Dify、叶读、BGP、Fast、卡间拾光，再到原有应用。新增项目需填写真实的 `addedAt`（带时区 ISO 8601 时间），无需调整数组位置或主推标记；已有项目的描述和地址更新不改变新增时间。历史依据见 [架构说明](docs/ARCHITECTURE.md#目录新增时间依据)。

CCFA 是 Zotero 桌面插件，按 CCF 2026 年第七版目录在文献列表显示 A 类期刊与会议简称，离线识别且不修改条目。已发布 [v1.0.1](https://github.com/ThaneJoss/ccfa/releases/tag/v1.0.1)，主按钮为「查看项目」，从项目说明获取安装包；没有独立网站入口。源码：https://github.com/ThaneJoss/ccfa。

title2doi · DOI 补全工作台入口为 https://title2doi.thanejoss.com。批量导入 Zotero CSL JSON 文献，通过 Crossref 查询缺失 DOI，人工核对后生成预览与回填脚本，更新原条目。源码：https://github.com/ThaneJoss/title2doi。

Cloudflare IP 候选 · Speed Test 入口为 https://cf-speed-test.thanejoss.com，需 Cloudflare Access 登录。当前可从内置 Cloudflare 网段生成 10 个 IPv4 与 10 个 IPv6 静态候选；候选可达性未知，真实 HTTPS 探针尚未配置，测速和 DNS 写入暂不可用，目录标为「测试中」。源码：https://github.com/ThaneJoss/cloudflare-speed-test。

每项卡片显示场景分类；已核实的自有公开仓库提供「查看源码」。`released` 项使用 GitHub 项目主入口与「已发布」状态，`beta` 项说明当前限制，避免将插件或未就绪功能当作已上线网站。

形 · 流 / Manifold 入口为 https://manifold.thanejoss.com，是基于 React + Vite 的二维边界演化实验。绘制闭合形状，叠加局部速度场，观察表面张力与 KL 形状先验如何影响边界，并对比初始轮廓与形变结果。源码：https://github.com/ThaneJoss/manifold。

FlowMaster 研究工作区入口为 https://flow.thanejoss.com，用可视化节点组织研究流程，保存实验结果与证据，并向外部 MCP 客户端提供共享工作区读写能力。工作区需要访问 Token 登录，不执行实验或调用模型。源码：https://github.com/ThaneJoss/flowmaster。

Dify AI 工作台入口为 https://dify.thanejoss.com，用于可视化编排 AI 应用，连接模型与知识库，构建聊天助手和自动化任务。Dify 项目文档：https://docs.dify.ai。

叶读（LeafRead）入口为 https://epub.thanejoss.com，是基于开源 Bibi 的免登录 EPUB 阅读器。支持粘贴 HTTPS 文件直链或打开本地 EPUB，在电脑、手机和横屏下均固定单页分页，使用箭头、方向键或触摸滑动翻页，保留目录、字号、书签与同一浏览器内的阅读位置记忆；本地文件仅在浏览器中读取。源码：https://github.com/ThaneJoss/epub。

Fast 反向代理入口为 https://fast.thanejoss.com，使用 `https://fast.thanejoss.com/host/res` 访问对应的 `https://host/res`。支持 Ubuntu、npm 白名单 HTTPS 资源代理、软件源一键配置、流式下载和断点续传，并提供基于 D1 的 IP 白名单、分组管理与按 IP 汇总的访问日志；主页、初始化脚本和代理请求均受 IP 白名单限制；管理页 `/admin` 免于 IP 校验，需由 Cloudflare Access 独立保护。源码：https://github.com/ThaneJoss/fast。

BGP 路径观测（AS Atlas）入口为 https://bgp.thanejoss.com，提供全球 AS 拓扑可视化。路径对比需选择日期并按需获取 RouteViews 香港 HKIX / AS3491 原始数据，或导入本地 MRT 文件，由浏览器解压、解析和查询。数据仅保存在当前页面内存，刷新或关闭页面后需重新获取。路径来自同一观测 session 的 AS_PATH，不代表两个 IP 之间的实时 traceroute；全球拓扑按需加载仓库中的 CAIDA 静态快照。源码：https://github.com/ThaneJoss/bgp。

## 技术栈

- Vue 3.5.43
- Vue Router 5.4.0
- Vite 8.3.4（Rolldown/Oxc）
- UnoCSS 66.10.5 / Wind3 preset
- TypeScript 7.0.2 原生编译器
- typescript-eslint 8.71.1、vue-tsc 3.3.13（使用 TypeScript 6.0.2 API）
- Vite SSG 28.3.0
- Vitest 5.0.3、jsdom 30.1.2、Playwright 1.64.0、axe-core 4.14.0
- unplugin-icons 24.0.0
- Node.js 26.10.0 Current（开发与 CI）、pnpm 12.9.1

开发、CI 与 Cloudflare Workers Builds 使用 `.node-version` 固定的 Node.js 26.10.0。项目的 Node.js 引擎范围为 `^24.21.0 || ^26.10.0`，pnpm 版本由 `package.json#packageManager` 固定。

项目使用 TypeScript 7 原生编译器检查 TypeScript 源码，并使用 vue-tsc 对 Vue SFC 的脚本、模板、组件属性和事件做语义类型检查。Vue 模板开启 `strictTemplates`，额外 HTML 属性仅允许标准 `data-*`。TypeScript 6 兼容包同时向 `typescript-eslint` 和 vue-tsc 提供所需 API；vue-tsc 自动识别该别名，无需自建兼容启动器。组件与浏览器测试覆盖已编写的行为断言，与静态类型检查互补。

## 命令

准备上述 Node.js 和 pnpm 后，使用 `pnpm install --frozen-lockfile` 按 `pnpm-lock.yaml` 安装依赖。

- `pnpm run dev`：启动 Vite 开发服务器
- `pnpm run lint`：检查 Vue、TypeScript 与构建脚本
- `pnpm run typecheck`：依次执行原生 TypeScript 7 与 Vue SFC 类型检查
- `pnpm run typecheck:native`：使用 TypeScript 7 检查 TypeScript 源码、配置和测试
- `pnpm run typecheck:vue`：使用 vue-tsc 检查 Vue SFC 脚本与模板
- `pnpm run test:unit`：执行单元和组件测试
- `pnpm run build`：类型检查并生成 SSG 静态站点
- `pnpm run verify:dist`：验证静态 metadata、sitemap、链接、脚本属性和体积预算
- `pnpm run test:e2e`：执行桌面/移动端 Playwright 与 axe 检查
- `pnpm run preview`：预览 `dist/`
- `pnpm run preview:worker`：使用本地 Workers 预览静态路由和响应头
- `pnpm run deploy:check`：构建并检查 Wrangler 部署产物，不发布
- `pnpm run deploy`：构建并发布到 Cloudflare Workers

## 页面与构建

- `/`：静态预渲染的应用目录
- `/contact`：静态预渲染的联系页
- `404.html`：由 catch-all 路由静态预渲染，Workers Static Assets 对未知路径返回真实 404
- `sitemap.xml`：只包含 `/` 与 `/contact`

构建输出 Vite 的 hash CSS，固定 UI 图标通过 `unplugin-icons` 在构建期打包。构建后脚本会为所有模块入口加入 `data-cfasync="false"`，避免 Cloudflare Rocket Loader 中止并重放 Vite 模块。

## 自动部署

生产站点 <https://thanejoss.com> 由 Cloudflare Workers Static Assets 托管。Workers Builds 连接本仓库的 `main` 分支，推送后自动安装依赖并执行 `pnpm exec wrangler deploy`；`wrangler.jsonc` 的构建命令调用 `pnpm run build`，仅发布 `dist/`。自定义域名由仓库配置声明，非生产分支预览尚未开启。

`vercel.json` 停用 Vercel Git 自动部署，保留原构建与安全头配置及既有部署用于回退。完整构建设置、路由规则和回退步骤见[部署与边缘配置](docs/DEPLOYMENT.md)。

## 质量与安全

质量 CI 使用极简 reusable workflow 调用，引用自动跟随 `main` 的 `ThaneJoss/github-ci/.github/workflows/ci.yml@main`。通用模板按标准元数据自动发现 Node/pnpm、锁文件以及 lint、typecheck、test 和 build 脚本，并执行依赖审计。`typecheck` 依次执行 TypeScript 7 与 Vue SFC 检查，任一失败都会使脚本失败；实际执行结果以该提交的 CI 日志为准。`pnpm-workspace.yaml` 用 `packages: []` 显式声明仅根项目，保留原有 overrides，兼容模板对 workspace 列表的发现要求。

原项目专属质量 job 与生产 HTTP 验收 workflow 已移除。独立的依赖新鲜度报告、`verify:dist`、Playwright/axe、浏览器安装和证据上传不再作为额外 CI 步骤保留；相关源码、测试及 package scripts 仍可按需运行。没有执行的检查不代表通过。Cloudflare Workers Builds 负责发布，GitHub Actions 继续负责通用质量检查。

`public/_headers` 统一配置 CSP、Referrer-Policy、Permissions-Policy、frame 限制、COOP、nosniff 与一年期 HSTS，构建时复制到静态产物并由 Workers Static Assets 应用。具体架构和部署要求见：

- [架构说明](docs/ARCHITECTURE.md)
- [部署与边缘配置](docs/DEPLOYMENT.md)

生产域名：<https://thanejoss.com>
