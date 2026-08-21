# Web Apps as a Service

一个使用 Vue 构建的静态网页 APP 规划与展示站。

当前没有任何具体工具对外开放。首页的 10 个 APP、35 个子条目全部由 typed catalog 标记为 `planned`，只展示规划范围，不生成无效链接或空功能页。真实功能完成并通过验收后，才能改为 `beta` 或 `live`。

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

- `/`：静态预渲染的规划目录
- `/contact`：静态预渲染的联系页
- `404.html`：由 catch-all 路由静态预渲染，Vercel 对未知路径返回真实 404
- `sitemap.xml`：只包含 `/` 与 `/contact`

构建输出 Vite 的 hash CSS，固定 UI 图标通过 `unplugin-icons` 在构建期打包。构建后脚本会为所有模块入口加入 `data-cfasync="false"`，避免 Cloudflare Rocket Loader 中止并重放 Vite 模块。

## 质量与安全

PR 质量门禁会在每次 PR 更新及 `main` 推送时输出依赖新鲜度报告，并执行 TypeScript 7 检查、lint、Vitest、SSG 构建、产物完整性、`npm audit`、Playwright 和 axe。过期依赖会留在检查日志中，但不会单独阻断其他 PR；高危依赖漏洞仍会使门禁失败，版本升级继续由 Dependabot PR 承接。

Vercel 统一配置 CSP、Referrer-Policy、Permissions-Policy、frame 限制、COOP、nosniff 与一年期 HSTS。具体架构和部署要求见：

- [架构说明](docs/ARCHITECTURE.md)
- [部署与边缘配置](docs/DEPLOYMENT.md)

生产域名：<https://thanejoss.com>
