# 架构说明

## 定位

项目是静态的网页 APP 导航目录，首页连接已经实际运行的独立子站。产品真实性优先于入口数量：未实现的项目必须保持 `planned`，不能提供路由或链接。

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

`src/features/catalog/apps.ts` 是应用目录的单一事实来源。每项通过 `addedAt` 记录首次加入目录的时间，`getCatalogAppsNewestFirst` 按解析后的时间戳倒序（newest first）返回副本，同时间保留源目录顺序。`getLatestCatalogApp` 使用相同规则选择最新项，标题、介绍和重点卡片均从该条目派生；其他应用按同一时间顺序展示。源数组的物理位置不表示时间，排序也不修改源数组。空目录不展示最新卡片，摘要显示「暂无应用」。

状态与目标模型为：

- `planned`：`destination` 必须是 `null`，只渲染不可点击内容；
- `beta` / `live`：可以指向已注册的绝对站内路径，或使用 HTTPS 打开真实外部子站；
- `catalogIntegrity.test.ts` 会验证外部地址唯一且符合预期，并确保所有站内目标均已注册到真实路由。

### 目录新增时间依据

历史应用的 `addedAt` 来自各应用首次进入目录的 Git 提交者时间（`git show -s --format=%cI <commit>`），不是独立应用仓库的创建时间或最近一次描述修改时间。新增应用在加入目录时记录真实时间。

| 应用 | 首次加入目录时间（UTC+08:00） | Git 提交 |
| --- | --- | --- |
| BGP 路径观测 | 2026-09-22 22:18:40 | [`e4d9d45`](https://github.com/ThaneJoss/webapps/commit/e4d9d4597666525e30db87599c026f88261e663a) |
| Fast 反向代理 | 2026-09-21 01:24:56 | [`2d3e01a`](https://github.com/ThaneJoss/webapps/commit/2d3e01a1e6d753ed62c97371cf27570ba5e51ea6) |
| 卡间拾光 | 2026-09-16 18:13:14 | [`5c6197a`](https://github.com/ThaneJoss/webapps/commit/5c6197ab05d337b4b0bf1c3a25e3e592f7268ee9) |
| 文件中转站、AI API 网关、Cloudflare 用量卫士、T3 Code、Codex 工作台、服务状态、Portainer、WebSSH、远程桌面 | 2026-08-22 03:13:13 | [`b19ae19`](https://github.com/ThaneJoss/webapps/commit/b19ae1947e09ead19e46480c081315542c7345df) |

卡间拾光在后续提交 `5b97223` 被移到目录第一项，因此不能通过反转数组还原时间顺序。同一提交加入的九个应用没有更细的目录时间记录，保留该批次原有顺序。新增应用时填写真实的带时区 ISO 8601 `addedAt`；描述、域名和卡片位置调整不修改它。构建直接使用已记录的时间，无需运行时访问 Git 或 GitHub。

叶读（LeafRead）在本次新增时记录的时间为 `2026-09-23T08:15:09Z`（UTC+08:00 为 2026-09-23 16:15:09），因此展示在 BGP 路径观测之前，成为最新应用。

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
