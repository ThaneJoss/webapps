# 部署与边缘配置

## 运行线

- 开发与 CI：Node.js 26.10.0 Current，以 `.node-version` 为准
- Vercel 构建：平台支持的最新 Node.js 24 LTS（当前支持的最新构建大版本）
- pnpm 12.9.1，以 `package.json#packageManager` 为准
- Vercel 静态部署
- Cloudflare 代理生产域名 `thanejoss.com`

Node.js 引擎范围为 `^24.21.0 || ^26.10.0`。安装使用 `pnpm install --frozen-lockfile`，构建使用 `pnpm run build`，静态输出目录为 `dist/`。

`vercel.json` 显式配置安装命令 `npx --yes pnpm@12.9.1 install --frozen-lockfile` 和构建命令 `npx --yes pnpm@12.9.1 run build`。这里的 `npx` 仅用于引导精确版本的 pnpm，依赖安装与构建仍由 pnpm 执行，无需在 Vercel 控制台添加包管理器相关环境变量。

Vercel 使用 `cleanUrls` 把 `contact.html` 暴露为 `/contact`，并把生成的 `404.html` 作为未知路径的真实 404 页面。不要增加全局 SPA wildcard rewrite，否则会制造 soft 404。

## Cloudflare

推荐在 Cloudflare Configuration Rule 中设置：

```text
条件：Hostname equals thanejoss.com
设置：Rocket Loader = Off
```

修改后清理该主机缓存，再检查首页、联系页和未知路径。作为仓库内的确定性保护，`scripts/harden-build.mjs` 还会给每个 Vite 模块脚本添加 `data-cfasync="false"`，且属性位于 `src` 前；即使区域级 Rocket Loader 仍打开，也不应改写应用入口。

HSTS 目标值为：

```text
max-age=31536000; includeSubDomains; preload
```

只有确认所有子域名都长期支持 HTTPS 后才应保留 `includeSubDomains` 与 `preload`。Vercel 已配置该响应头；若 Cloudflare HSTS 功能覆盖源站值，边缘设置也必须保持一致。

## 安全响应头

`vercel.json` 对所有路径设置：

- Content-Security-Policy：脚本、样式和资源默认只允许本站，并允许 Cloudflare Web Analytics；
- Referrer-Policy：`strict-origin-when-cross-origin`；
- Permissions-Policy：关闭摄像头、麦克风、定位、支付、USB 与 browsing topics；
- `X-Frame-Options: DENY` 与 CSP `frame-ancestors 'none'`；
- `Cross-Origin-Opener-Policy: same-origin`；
- `X-Content-Type-Options: nosniff`；
- 一年期 HSTS。

每次部署后应核对生产响应头，避免 Cloudflare 覆盖造成配置漂移。

## 通用 CI 与部署验收

`.github/workflows/ci.yml` 在 push、pull_request、merge_group 和 workflow_dispatch 时调用固定 SHA 的通用模板 `ThaneJoss/github-ci/.github/workflows/ci.yml@89624ba02d911171a634ddeb4848c298f3b1c842`。调用不传 inputs、环境变量或 secrets，自动发现标准元数据和检查脚本，不保留独立项目质量 job。

原独立依赖新鲜度报告、产物验证、Playwright/axe 和证据上传步骤已移除；未被通用模板发现或执行的检查应报告为未运行。

`.github/workflows/deployment-smoke.yml` 仅执行 HTTP 质量验收，没有实际部署或发布动作，现随独立质量检查移除。`scripts/remote-smoke.mjs` 保留，但不由迁移后的 CI 自动调用；生产验收须另行明确授权。仓库没有其他发布、部署或数据更新 workflow，外部 Vercel 集成、生产配置和安全响应头保持原配置。
