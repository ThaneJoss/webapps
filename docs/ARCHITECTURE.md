# 架构说明

## 定位

项目当前是静态的网页 APP 规划目录，不包含任何具体 APP 功能。产品真实性优先于入口数量：未实现的项目必须保持 `planned`，不能提供路由或链接。

## 目录边界

```text
src/
  components/            页面级通用组件
  features/catalog/      APP 目录单一事实来源、卡片与完整性测试
  lib/seo.ts             页面 metadata 单一事实来源
  router/                公开路由、滚动策略与客户端 metadata 同步
  sections/              联系页组合区块
  views/                 首页、联系页和 404 页面
scripts/
  harden-build.mjs       给生成的模块脚本添加 Rocket Loader 排除标记
  verify-dist.mjs        检查 SSG、链接、metadata、sitemap 与体积预算
  remote-smoke.mjs       公开生产域名 HTTP 与静态语义检查
tests/e2e/               桌面和移动端浏览器验收
```

`src/features/catalog/apps.ts` 是应用目录的单一事实来源。状态模型为：

- `planned`：`route` 必须是 `null`，只渲染不可点击文本；
- `beta` / `live`：`route` 必须是绝对站内路径，才允许渲染 `RouterLink`；
- `catalogIntegrity.test.ts` 会验证所有交互路径都已注册到真实路由。

## 渲染模型

Vite SSG 在构建时生成：

- `index.html`，对应 `/`；
- `contact.html`，对应 `/contact`；
- `404.html`，由 catch-all 路由使用 `/404` 构建。

页面首个 HTTP 响应已经包含标题、正文和完整 metadata，不依赖 JavaScript 才出现语义内容。客户端继续使用 Vue Router hydration，保留无刷新导航和交互。

## TypeScript 7 检查边界

`@typescript/native` 指向 `typescript@7.0.2`，并由 `npm run typecheck` 检查 TypeScript 源码、配置和测试。Vue SFC 模板中的表达式、组件属性和事件类型不在这项静态检查的覆盖范围内。

`typescript` 指向 `@typescript/typescript6@6.0.2`，向 `typescript-eslint` 提供解析器 API；它不参与类型检查。

## 构建约束

- 使用 Vite 8 默认 Rolldown 拆包；
- CSS 作为 hash 静态资源缓存；
- 图标从本地 Solar icon data 按需编译；
- 页面不得包含内联脚本，以保持 CSP 不需要 `unsafe-inline`；
- 所有生成的模块脚本必须在 `src` 前包含 `data-cfasync="false"`；
- CSS/JS gzip 总预算为 220 KB，单 CSS 50 KB，单 JS 120 KB。
