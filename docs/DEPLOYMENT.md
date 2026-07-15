# 部署与边缘配置

## 运行线

- Node.js 26.5.0
- npm 12.0.1
- Vercel 静态部署
- Cloudflare 代理生产域名 `thanejoss.com`

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

## 远端验证

`.github/workflows/ci.yml` 在 PR 上完成 lint、类型、测试、构建、审计和浏览器验收，不依赖本机资源。

`.github/workflows/deployment-smoke.yml` 在生产部署成功后检查：

- `/` 与 `/contact` 返回 200；
- 随机不存在路径返回 404；
- Browserless 在 `DOMContentLoaded` 后直接看到页面语义标记，不使用固定等待。

要启用 GitHub Actions 中的 Browserless 部分，需要由仓库管理员创建 `BROWSERLESS_TOKEN` Actions Secret。密钥不得写入仓库、日志、PR 或文档。未配置 Secret 时工作流仍会执行 HTTP 状态检查，并明确记录 Browserless 被跳过。

Browserless 失败时，工作流上传对应 HTML 和截图作为短期 artifact。生产检查也可从 Actions 页面手动输入公开 URL 触发。
