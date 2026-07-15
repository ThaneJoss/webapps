# Web Apps as a Service

一个使用 Vue 构建的静态网页 APP 规划与展示站。

当前没有任何具体工具对外开放。首页的 10 个 APP、35 个子条目全部由 typed catalog 标记为 `planned`，只展示规划范围，不生成无效链接或空功能页。真实功能完成并通过验收后，才能改为 `beta` 或 `live`。

## 技术栈

- Vue 3.5.39
- Vue Router 5.2.0
- Vite 8.1.4（Rolldown/Oxc）
- UnoCSS 66.7.5 / Wind3 preset
- TypeScript 7.0.2 原生编译器
- TypeScript 6.0.2 兼容 API，供 `vue-tsc` 与 ESLint 使用
- Vite SSG 28.3.0
- Vitest 4.1.10、Playwright 1.61.1、axe-core 4.12.1
- Node.js 26.5.0、npm 12.0.1

TypeScript 6/7 并行安装遵循 TypeScript 7 官方迁移方案：`tsc` 执行 7.0，依赖旧编译器 API 的工具通过 `typescript` npm alias 使用 6.0。

## 命令

- `npm run dev`：启动 Vite 开发服务器
- `npm run lint`：检查 Vue、TypeScript 与构建脚本
- `npm run typecheck`：执行 Vue/TypeScript 6 与 TypeScript 7 双重检查
- `npm run test:unit`：执行单元和组件测试
- `npm run build`：类型检查并生成 SSG 静态站点
- `npm run verify:dist`：验证静态 metadata、sitemap、链接、脚本属性和体积预算
- `npm run test:e2e`：执行桌面/移动端 Playwright 与 axe 检查
- `npm run preview`：预览 `dist/`

本机禁止运行测试、类型检查和生产构建。上述质量命令由 GitHub Actions 执行；本机只做静态审查和依赖锁文件维护。

## 页面与构建

- `/`：静态预渲染的规划目录
- `/contact`：静态预渲染的联系页
- `404.html`：由 catch-all 路由静态预渲染，Vercel 对未知路径返回真实 404
- `sitemap.xml`：只包含 `/` 与 `/contact`

构建保留 Vite 的 hash CSS，不再把整份 CSS 内联到 HTML。固定 UI 图标通过 `unplugin-icons` 在构建期打包，不访问 Iconify 公共 API。构建后脚本会为所有模块入口加入 `data-cfasync="false"`，避免 Cloudflare Rocket Loader 中止并重放 Vite 模块。

## 质量与安全

PR 质量门禁包括 lint、双 TypeScript 检查、Vitest、SSG 构建、产物完整性、`npm audit`、Playwright 和 axe。Dependabot 每周检查 npm 与 GitHub Actions 更新。

Vercel 统一配置 CSP、Referrer-Policy、Permissions-Policy、frame 限制、COOP、nosniff 与一年期 HSTS。具体架构和部署要求见：

- [架构说明](docs/ARCHITECTURE.md)
- [部署与边缘配置](docs/DEPLOYMENT.md)
- [项目核查与整改记录](PROJECT_AUDIT.md)

生产域名：<https://thanejoss.com>
