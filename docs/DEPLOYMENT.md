# 部署与边缘配置

## 运行线

- 开发、CI 与 Workers Builds：Node.js 26.10.0 Current，以 `.node-version` 为准
- pnpm 12.9.1，以 `package.json#packageManager` 为准
- Cloudflare Workers Static Assets，Worker 名称 `webapps`
- 生产域名 `thanejoss.com`，由 `wrangler.jsonc` 声明为 Worker 自定义域名

Node.js 引擎范围为 `^24.21.0 || ^26.10.0`。安装使用 `pnpm install --frozen-lockfile`，构建使用 `pnpm run build`，静态输出目录为 `dist/`。

## Workers Builds 自动发布

Cloudflare Workers Builds 连接 GitHub 仓库 `ThaneJoss/webapps`，使用以下生产设置：

| 设置 | 值 |
| --- | --- |
| 生产分支 | `main` |
| 根目录 | `/` |
| 构建命令 | 留空，由 Wrangler 调用仓库中的构建命令 |
| 部署命令 | `pnpm exec wrangler deploy` |
| Node.js | `.node-version` 中的 `26.10.0` |
| 构建环境变量 | `PNPM_VERSION=12.9.1` |
| 非生产分支预览 | 未开启 |

每次推送 `main` 后，Workers Builds 安装依赖，再使用锁文件中的 Wrangler 执行部署。`wrangler.jsonc` 的 `build.command` 为 `pnpm run build`，因此发布前仍会执行 TypeScript 与 Vue SFC 类型检查、SSG 构建及模块脚本加固。只上传 `dist/` 静态产物，无需运行服务端 JavaScript，也不需要 KV、D1 或其他运行时绑定。

Wrangler 版本固定在 `package.json` 与 `pnpm-lock.yaml`。构建变量 `PNPM_VERSION` 应与 `package.json#packageManager` 同步，避免平台默认 pnpm 版本与锁文件不一致。部署凭据由 Cloudflare Workers Builds 管理，不写入仓库。

本地可运行 `pnpm run preview:worker` 检查 Workers 的路由和响应头，或运行 `pnpm run deploy:check` 完成构建与部署预检。`pnpm run deploy` 会实际发布；通常由 `main` 自动部署完成发布。

## 静态路由与缓存

`wrangler.jsonc` 设置 `assets.directory` 为 `./dist`、`html_handling` 为 `drop-trailing-slash`，将 `contact.html` 暴露为 `/contact`，并将 `/contact/` 与 `/contact.html` 规范化为无尾斜线地址。`not_found_handling: "404-page"` 使用生成的 `404.html` 为未知路径返回真实 HTTP 404。不要增加全局 SPA wildcard rewrite，否则会制造 soft 404。

静态资源使用 Workers Static Assets 的默认缓存行为，不对 HTML 设置长期不可变缓存。Vite 生成的 JS/CSS 文件名包含内容 hash，更新版本后页面会引用新的资源地址。

## Cloudflare

推荐在 Cloudflare Configuration Rule 中设置：

```text
条件：Hostname equals thanejoss.com
设置：Rocket Loader = Off
```

修改后清理该主机缓存，再检查首页、联系页和未知路径。作为仓库内的确定性保护，`scripts/harden-build.mjs` 还会给每个 Vite 模块脚本添加 `data-cfasync="false"`，且属性位于 `src` 前；即使区域级 Rocket Loader 仍打开，也不应改写应用入口。

HSTS 由 Cloudflare SSL/TLS 全局设置统一管理。`public/_headers` 与 `vercel.json` 不设置 `Strict-Transport-Security`，也不为本站增加主机专用响应头转换规则。后续 HSTS 变更在 Cloudflare 全局设置中维护，部署验收以当时的全局策略为准，不将当前有效期固化为项目要求。

## 安全响应头

`public/_headers` 在构建时复制为 `dist/_headers`，由 Workers Static Assets 对各路径的静态响应设置以下响应头；重定向先于这些规则处理，不保证携带相同响应头：

- Content-Security-Policy：脚本、样式和资源默认只允许本站，并允许 Cloudflare Web Analytics；
- Referrer-Policy：`strict-origin-when-cross-origin`；
- Permissions-Policy：关闭摄像头、麦克风、定位、支付、USB 与 browsing topics；
- `X-Frame-Options: DENY` 与 CSP `frame-ancestors 'none'`；
- `Cross-Origin-Opener-Policy: same-origin`；
- `X-Content-Type-Options: nosniff`。

每次部署后应核对静态响应中的上述配置，并确认生产 HSTS 遵循 Cloudflare 全局设置。

## 通用 CI 与部署验收

`.github/workflows/ci.yml` 在 push、pull_request、merge_group 和 workflow_dispatch 时调用自动跟随 `main` 的通用模板 `ThaneJoss/github-ci/.github/workflows/ci.yml@main`。调用不传 inputs、环境变量或 secrets，自动发现标准元数据和检查脚本，不保留独立项目质量 job。

原独立依赖新鲜度报告、产物验证、Playwright/axe 和证据上传步骤已移除；未被通用模板发现或执行的检查应报告为未运行。

原 `.github/workflows/deployment-smoke.yml` 随独立质量检查移除。`scripts/remote-smoke.mjs` 保留，但不由 CI 自动调用；在用户明确要求部署验收时，可使用 `BASE_URL=https://thanejoss.com node scripts/remote-smoke.mjs` 核对首页、联系页及未知路径。Workers Builds 独立于 GitHub Actions 执行自动发布；两者的结果应分别核对。

## Vercel 回退

`vercel.json` 通过 `git.deploymentEnabled: false` 停用 Vercel Git 自动部署，保留安装、构建、路由和非 HSTS 安全响应头配置。既有 Vercel 项目及最后一次部署保留用于回退，不再随 `main` 推送重复构建。

需要回退时，先验证保留的 Vercel 部署可访问，再解除 Worker 对 `thanejoss.com` 的自定义域名绑定，恢复切换前保存的 DNS 记录及代理状态。域名同时声明在 `wrangler.jsonc`，回退配置也须同步到仓库，防止后续 Workers Builds 再次绑定域名。若需要恢复后续 Vercel 发布，再调整 `git.deploymentEnabled`；回退既有部署本身无需先开启 Git 自动部署。
