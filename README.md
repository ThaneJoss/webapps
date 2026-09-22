# Web Apps as a Service

一个使用 Vue 构建的静态网页 APP 导航与展示站。

首页通过 typed catalog 展示 12 个真实运行的网站，覆盖文件传输、AI、开发、远程连接、运维、网络观测和卡面收藏场景。外部入口使用受类型约束的 HTTPS 地址；未来的站内应用仍必须先注册真实路由，才能标记为 `beta` 或 `live`。

首页「最新应用」自动读取 `src/features/catalog/apps.ts` 列表的最后一项，标题、介绍和重点卡片共用同一条数据；其余应用保持列表顺序。新增项目只需追加目录项，无需修改首页或主推标记。

Fast 反向代理入口为 https://fast.thanejoss.com，使用 `https://fast.thanejoss.com/host/res` 访问对应的 `https://host/res`。支持 Ubuntu、npm 等白名单 HTTPS 资源代理、软件源一键配置、流式下载和断点续传，并提供基于 D1 的 IP 白名单、分组管理与访问日志；主页、初始化脚本和代理请求均受 IP 白名单限制。源码：https://github.com/ThaneJoss/fast。

BGP 路径观测（AS Atlas）入口为 https://bgp.thanejoss.com，提供全球 AS 拓扑可视化，并基于每日更新的 RouteViews 香港 HKIX / AS3491 观测数据查询、对比两个 IP 的 BGP AS 路径。路径来自观测 session 中的 AS_PATH，不代表两个 IP 之间的实时 traceroute；全球拓扑使用 CAIDA 静态快照。源码：https://github.com/ThaneJoss/bgp。

## 技术栈

- Vue 3.5.40
- Vue Router 5.2.0
- Vite 8.1.5（Rolldown/Oxc）
- UnoCSS 66.7.5 / Wind3 preset
- TypeScript 7.0.2 原生编译器
- typescript-eslint 8.64.0（解析器依赖 TypeScript 6.0.2 API）
- Vite SSG 28.3.0
- Vitest 4.1.10、Playwright 1.61.1、axe-core 4.12.1
- Node.js 24.18.0 LTS、npm 12.0.1

项目使用 TypeScript 7 原生编译器检查 TypeScript 源码。TypeScript 6 包只向 `typescript-eslint` 提供解析器 API，不参与类型检查。

## 命令

- `npm run dev`：启动 Vite 开发服务器
- `npm run lint`：检查 Vue、TypeScript 与构建脚本
- `npm run typecheck`：使用 TypeScript 7 检查 TypeScript 源码
- `npm run test:unit`：执行单元和组件测试
- `npm run build`：类型检查并生成 SSG 静态站点
- `npm run verify:dist`：验证静态 metadata、sitemap、链接、脚本属性和体积预算
- `npm run test:e2e`：执行桌面/移动端 Playwright 与 axe 检查
- `npm run preview`：预览 `dist/`

## 页面与构建

- `/`：静态预渲染的应用目录
- `/contact`：静态预渲染的联系页
- `404.html`：由 catch-all 路由静态预渲染，Vercel 对未知路径返回真实 404
- `sitemap.xml`：只包含 `/` 与 `/contact`

构建输出 Vite 的 hash CSS，固定 UI 图标通过 `unplugin-icons` 在构建期打包。构建后脚本会为所有模块入口加入 `data-cfasync="false"`，避免 Cloudflare Rocket Loader 中止并重放 Vite 模块。

## 质量与安全

PR 质量门禁会在每次 PR 更新及 `main` 推送时输出依赖新鲜度报告，并执行 TypeScript 7 检查、lint、Vitest、SSG 构建、产物完整性、`npm audit`、Playwright 和 axe。过期依赖会留在检查日志中，但不会单独阻断其他 PR；高危依赖漏洞仍会使门禁失败，版本升级改为按需人工集中处理。

Vercel 统一配置 CSP、Referrer-Policy、Permissions-Policy、frame 限制、COOP、nosniff 与一年期 HSTS。具体架构和部署要求见：

- [架构说明](docs/ARCHITECTURE.md)
- [部署与边缘配置](docs/DEPLOYMENT.md)

生产域名：<https://thanejoss.com>
