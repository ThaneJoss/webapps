# 仓库协作指南

## 适用范围与事实来源

本指南适用于整个仓库。开始修改前，先阅读相关源码、测试和文档，并保持改动聚焦。

- `package.json` 是 npm 脚本、引擎约束和依赖的事实来源。
- `src/features/catalog/apps.ts` 是应用目录及可用状态的事实来源。
- `src/lib/seo.ts` 与 `src/router/` 分别维护页面 metadata 和公开路由。
- `docs/ARCHITECTURE.md` 与 `docs/DEPLOYMENT.md` 说明架构、构建和部署约束。

如果说明与实现不一致，以可执行配置和源码为准，并在同一改动中修正文档。

## 项目定位与目录边界

本项目是使用 Vite、Vue 和 Vite SSG 构建的静态网页 APP 规划目录。未完成的功能只能展示规划信息，不能暴露虚假入口、空页面或未注册路由。

- `src/components/`：页面间复用的 UI 组件。
- `src/sections/`：页面组合区块。
- `src/views/`：首页、联系页和 404 页面。
- `src/features/catalog/`：应用目录、卡片和完整性测试。
- `src/lib/`：SEO 等客户端与构建辅助逻辑。
- `scripts/`：构建加固、产物验证和远端检查脚本。
- `tests/e2e/`：桌面端与移动端浏览器验收。
- `dist/`：生成产物；不要直接编辑或提交手工修改。

新增代码优先按功能或业务边界组织，避免只按文件类型堆放。

## 环境与依赖

- Node.js 版本以 `.node-version` 为准，npm 版本以 `package.json#packageManager` 为准。
- 在干净环境中使用 `npm ci` 按锁文件安装依赖。
- 更新依赖时使用 npm 命令，并同时提交 `package.json` 与 `package-lock.json` 的对应变化。
- 不要手工改写 `node_modules/`、`dist/` 或锁文件中的派生内容。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动 Vite 开发服务器。 |
| `npm run check:dependencies` | 检查直接依赖是否为最新版本。 |
| `npm run lint` | 检查 Vue、TypeScript 和构建脚本。 |
| `npm run typecheck` | 使用 TypeScript 7 原生编译器检查 TypeScript 源码。 |
| `npm test` / `npm run test:unit` | 执行 Vitest 单元与组件测试。 |
| `npm run test:unit:watch` | 以监听模式运行 Vitest。 |
| `npm run build` | 执行类型检查并生成、加固 SSG 静态站点。 |
| `npm run build:ssg` | 仅生成并加固 SSG 产物；适用于已单独完成类型检查的流程。 |
| `npm run verify:dist` | 验证 metadata、路由、链接、CSP 约束和资源预算。 |
| `npm run test:e2e` | 在已构建的 `dist/` 上执行 Playwright 与 axe 浏览器验收。 |
| `npm run preview` | 预览已生成的 `dist/`。 |
| `npm audit --audit-level=high` | 检查高等级及以上的依赖漏洞。 |

## 编码与实现规则

- 新增应用源码使用 TypeScript 并沿用现有严格类型；现有 `.mjs` 构建脚本保持 ESM。
- TypeScript、JSON、Markdown 和 Vue 模板使用 2 空格缩进。
- Vue 单文件组件使用 `<script setup lang="ts">`。
- 组件文件使用 `PascalCase.vue`，工具和库文件使用 `camelCase.ts`。
- 优先使用小型、可组合组件和功能内部共享类型，避免重复接口和跨功能耦合。
- 保留现有代码风格；不要在目标改动之外顺手重构或格式化无关文件。

## 产品、路由与构建约束

- `planned` 目录项的 `route` 必须为 `null`，并渲染为不可点击内容。
- 只有已实现并通过验收的 `beta` 或 `live` 项目才能配置绝对站内路径，且路径必须注册到真实路由。
- 新增或调整公开页面时，同步更新路由、SSG 入口、SEO metadata、sitemap/404 断言及相关测试。
- 未知路径必须保持真实 404；不要添加全局 SPA wildcard rewrite。
- 页面不得引入内联脚本；构建结果必须继续满足 CSP 与 `data-cfasync="false"` 加固要求。
- 修改界面时保留键盘操作、清晰焦点、减少动态效果和 axe 无障碍支持。

## 测试与验收

- 单元和组件测试放在相关代码附近，使用 `*.test.ts`。
- 浏览器验收放在 `tests/e2e/`，使用 `*.spec.ts`。
- 功能变化应覆盖正常路径、错误状态和关键回归场景。
- TypeScript 7 检查不覆盖 Vue SFC 模板表达式、组件属性和事件类型；这些边界应由组件测试或浏览器测试覆盖。

| 改动类型 | 最低验证范围 |
| --- | --- |
| 仅文档 | `git diff --check`，并核对命令、链接和事实准确性。 |
| TypeScript / Vue 逻辑 | `npm run lint`、`npm run typecheck`、`npm run test:unit`。 |
| 路由、metadata 或构建 | `npm run build`、`npm run verify:dist`。 |
| 可见界面或交互 | 执行 lint、类型检查、单元测试、构建和 `npm run test:e2e`，并检查桌面端与移动端。 |
| 依赖更新 | `npm run check:dependencies`、相关测试和 `npm audit --audit-level=high`。 |

每个 PR 最终都必须通过 GitHub Actions 质量门禁：依赖新鲜度、lint、TypeScript 7 类型检查、单元测试、SSG 构建、产物验证、依赖审计及 Playwright/axe。

## 提交与 PR

- 从最新 `main` 创建独立分支，建议命名为 `<type>/<简短说明>`。
- 提交保持单一目的，避免混入无关文件。
- 提交信息、PR 标题和描述使用中文，并采用简短的 conventional 前缀，如 `feat:`、`fix:`、`docs:`、`test:`、`chore:` 或 `ci:`。
- PR 目标分支为 `main`，正文应说明改了什么、为什么修改以及如何验证。
- UI 变化应提供截图或可复核的视觉证据；无 UI 变化时明确说明不适用。
- 如实记录已执行的检查及结果，不要声称运行了未执行的命令。

## 安全与部署

- 不要提交密钥、令牌、个人信息或生产凭据；敏感值使用环境变量。
- 修改依赖、构建、响应头、Vercel 或 Cloudflare 配置前，先阅读 `docs/DEPLOYMENT.md`。
- 部署相关变化必须保留 CSP、安全响应头、真实 404 和生产 HTTP 语义检查。
