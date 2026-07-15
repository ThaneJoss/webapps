# Webapps 项目核查与优化升级建议

> - 核查日期：2026-07-15（Asia/Shanghai）
> - 代码基线：`main` / `4bc7b9b`
> - 生产站：<https://thanejoss.com>
> - 核查方式：静态源码审查、Git/GitHub 状态核对、npm 元数据与安全审计、HTTP 响应核对、Browserless Chrome 148 真实渲染。
>
> 受本机运行约束影响，本轮没有执行本地 `npm test`、`npm run typecheck` 或 `npm run build`；因此本文不会把“存在测试”写成“测试已通过”。

## 0. 整改执行记录

用户在本报告完成后明确授权：暂不实现任何具体 APP 功能，直接完成本文的工程、体验、安全和加载链路修复，并把所有框架升级到当前最新版本，不考虑跨大版本迁移成本。因此，本轮实施不再采用原报告的分阶段升级建议，而是用远端 CI 统一验证 Vue Router 5、Vite 8 和 TypeScript 7。

截至本分支当前代码：

| 整改项 | 实施状态 | 处理结果 |
| --- | --- | --- |
| 产品真实性 | 已通过 CI | 10 个 APP、35 个子条目全部使用 typed `planned + route: null`；页面没有工具链接 |
| 目录架构 | 已通过 CI | 数据、类型、卡片和完整性测试迁入 `src/features/catalog/` |
| 框架升级 | 已通过 CI | Vue 3.5.39、Router 5.2.0、Vite 8.1.4、TS 7.0.2、Vitest 4.1.10、UnoCSS 66.7.5 |
| TypeScript 7 工具兼容 | 已通过 CI | 按官方方案并行安装 TS 7 与 `@typescript/typescript6`；`vue-tsc` 启动器定位真实 TS 6 编译器，CI 双重检查 |
| 生产加载链路 | SSG 已通过，待公开生产实测 | 首响应包含语义内容；所有模块脚本构建后加 `data-cfasync="false"` |
| 构建与图标 | 已通过 CI | 删除 vendor 拆包插件与全量 CSS 内联；固定图标改为构建期本地打包 |
| SEO | 已通过 CI，待生产 HTTP 实测 | `/`、`/contact`、404 静态预渲染并输出独立 metadata；sitemap 排除 404 |
| 无障碍 | 已通过 axe | 增加 skip link、统一焦点、字段错误关联、状态播报、焦点归还和 reduced motion |
| 质量门禁 | 已通过并设为必需检查 | lint、双 TS、Vitest、SSG 断言、audit、Playwright 与 axe 全部通过 |
| 依赖安全 | 锁文件已核实 | 最新依赖图 `npm audit --package-lock-only` 为 0 漏洞 |
| 安全响应头 | 配置与 Vercel 部署已通过，待生产实测 | 配置并自动断言 CSP、Referrer/Permissions Policy、frame 限制、COOP、nosniff 与一年期 HSTS |
| 生产 smoke | 已实施，待合并/密钥 | 生产事件自动检查 HTTP；配置 Actions Secret 后调用 Browserless 并留存失败证据 |

Cloudflare CLI 当前未登录，因此不能从本仓库会话直接修改区域级 Configuration Rule。代码已使用 Cloudflare 官方支持的 `data-cfasync="false"` 方式排除全部模块入口；区域级关闭 Rocket Loader 仍作为部署侧的优先配置写入 `docs/DEPLOYMENT.md`，并以生产 Browserless 是否还发生请求中止/重放作为最终判据。

### 远端验收证据

- GitHub Actions [质量门禁 #29431572223](https://github.com/ThaneJoss/webapps/actions/runs/29431572223) 完整通过。
- 单元/组件测试：4 个文件、7 个用例全部通过。
- SSG：成功生成首页、联系页和 404 共 3 页。
- 构建产物：5 个 CSS/JS 资源，gzip 合计 63,639 字节；外链 CSS、metadata、sitemap、内部链接、Rocket Loader 排除属性和安全配置断言全部通过。
- 依赖审计：0 漏洞。
- Playwright/axe：桌面和移动端共 6 组浏览器用例全部通过。
- Vercel 对提交 `36d4533` 的预览部署成功；该域名启用了 Vercel SSO，外部访问返回 302 登录跳转。
- 自托管 Browserless 健康检查返回 200；访问受保护预览时 `/content` 返回 408 且没有首页语义标记，因此不能把这次调用冒充为新版本渲染通过。生产域名必须在 PR 合并部署后重新执行 smoke。
- `main` 分支已启用 strict required status check：`lint、类型、测试与构建`。

## 1. 结论先行

项目的技术底座并不差：Vue 3、Vite、TypeScript 严格模式、Vue Router、组件测试、独立 404 页面和 Vercel 部署都已经具备。当前最大问题不是“框架太旧”，而是产品承诺、路由实现和生产加载链路不一致。

目前它更准确的定位是“网页 APP 概念目录/展示站”，还不是一个真正可用的 Web Apps 平台：

- 首页实际渲染 35 个可点击工具入口，但全部没有对应路由；例如 `/pdf/merge` 真实返回 HTTP 404。
- Cloudflare Rocket Loader 先中止并重放 Vite 模块请求。实验中背景约 0.37～0.42 秒出现，但有效内容约 2.22 秒才首次绘制，Vue 约 2.30～2.34 秒才挂载；常规 `networkidle` 截图会只看到空背景。
- 仓库已有 3 个测试文件、4 个测试用例，但没有 CI 工作流，`main` 最新提交没有任何必需检查。
- 依赖不需要立刻全面换代；应先完成兼容范围内的补丁升级和安全修复，再分别迁移 Vue Router 5、Vite 8、TypeScript 6/7。
- SEO、无障碍、依赖治理和安全响应头都有明确缺口，但优先级低于“链接真实可用”和“生产首屏稳定”。

### 当前状态概览

| 维度 | 判断 | 核心证据 |
| --- | --- | --- |
| 产品可用性 | 较低 | 35 个可点击工具入口全部落入 404 |
| 生产渲染 | 可最终渲染，但首屏链路脆弱 | Rocket Loader 重放脚本；约 2.22 秒才出现有效内容 |
| 工程基础 | 中等 | 严格 TypeScript、路由懒加载、组件测试已存在 |
| 质量门禁 | 较低 | 无 `.github/workflows`，无 required status checks |
| 可维护性 | 中等偏低 | `HomeView.vue` 482 行、全局 CSS 754 行、数据与视图耦合、存在死代码 |
| SEO/可访问性 | 需要整改 | `/404` 进入 sitemap；反馈色对比度不足；缺少统一焦点与状态播报 |
| 升级风险 | 可控，但必须分阶段 | 补丁升级简单；Vite 8 与现有拆包插件存在迁移冲突 |

## 2. 已核实的项目现状

### 2.1 仓库与远端

- 默认分支为 `main`，核查时已同步到 `4bc7b9b`。
- 最新生产部署对应 `4bc7b9b`，GitHub/Vercel 记录为成功；但“部署成功”只表示产物发布完成，不代表页面内容已经正确出现。
- GitHub 当前没有开放的产品 Issue，只有一个开放 PR：[#76 `docs: 禁止在本机运行测试`](https://github.com/ThaneJoss/webapps/pull/76)。
- `main` 开启了分支保护，但没有 required status checks，审批数也是 0。
- `AGENTS.md` 仍写着“没有自动化测试”，与仓库里的测试文件冲突；PR #76 正在修正这个问题。

### 2.2 当前页面与路由

[路由配置](src/router/index.ts#L12-L42)只有：

1. `/`
2. `/contact`
3. `/:pathMatch(.*)*` 兜底 404

[首页数据](src/views/HomeView.vue#L165-L481)包含 45 个路径字面量：

- 10 个应用父路径，例如 `/pdf`、`/image`，当前没有被模板使用；
- 35 个快捷入口路径，全部被渲染成原生 `<a>`；
- 这 35 个快捷入口都没有对应路由。

生产实测：

| URL | HTTP 状态 | 等待 3 秒后的页面 |
| --- | ---: | --- |
| `/` | 200 | 首页可以渲染 |
| `/contact` | 200 | 联系页可以渲染 |
| `/pdf/merge` | 404 | Vue 404 页面 |
| 随机不存在路径 | 404 | Vue 404 页面 |
| `/404` | 404 | 404 页面 |
| `/404.html` | 200 | 404 HTML 文件 |

因此，404 机制本身基本正确；错误在于首页把未实现路径做成了可点击产品入口，并使用“正在上线”“优先上线”等容易让用户误判为可用的文案。

### 2.3 生产加载链路

生产 HTML 中的 Vite `type="module"` 脚本会先被 Cloudflare Rocket Loader 改成随机前缀的非标准类型。浏览器随后加载 Rocket Loader，再把脚本恢复为模块并重新请求。

三次独立 Browserless 实验得到：

| 指标 | 结果 |
| --- | ---: |
| DOMContentLoaded | 0.81～0.92 秒 |
| 背景首次绘制 | 0.37～0.42 秒 |
| 有效内容首次绘制（FCP，单次采样） | 2.22 秒 |
| 最大内容绘制（LCP，单次采样，H1） | 2.22 秒 |
| `#app` 出现子节点 | 2.30～2.34 秒 |

同时观察到 6 个原始模块请求以 `net::ERR_ABORTED` 结束，随后被重新请求。生产首页还拆成 7 个首屏模块资源，压缩后合计约 56.9 KB；体积不算大，但请求重放和执行顺序增加了首屏脆弱性。

这解释了两个看似冲突的现象：

- 使用 `networkidle2` 立即截图时只有背景网格；
- 额外等待 3 秒后，首页、联系页和 404 页都能正常渲染。

结论不是“生产站永久白屏”，而是“首屏先空白、脚本被重放、语义内容明显延迟，且常规健康检查容易误判”。Cloudflare 官方也建议在出现 JavaScript 问题时禁用 Rocket Loader 后复测，并允许用 `data-cfasync="false"` 排除脚本；有依赖关系的脚本必须全部排除：[Rocket Loader 文档](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/)、[忽略特定脚本](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/ignore-javascripts/)。

### 2.4 依赖、安全与运行时

当前安装快照：

| 依赖 | 当前 | 兼容范围内目标 | 最新大版本/备注 |
| --- | ---: | ---: | --- |
| Vue | 3.5.32 | 3.5.39 | 保持 3.5 系列即可 |
| Vue Router | 4.6.4 | 4.6.4 | 5.2.0；本项目手写路由，官方称可无代码变更升级 |
| Vite | 7.3.2 | 7.3.6 | 8.1.4；构建内核改为 Rolldown/Oxc |
| Vitest | 4.1.3 | 4.1.10 | 先做补丁升级 |
| UnoCSS | 66.6.7 | 66.7.5 | `presetUno` 已弃用，应改为 `presetWind3` |
| vue-tsc | 3.2.6 | 3.3.7 | 与 TypeScript 迁移一起验证 |
| TypeScript | 5.9.3 | 先迁移 6.x | 最新 7.0.2 是原生 Go 重写，不宜直接跳级 |
| @iconify/vue | 5.0.0 | 5.0.1 | 更重要的是决定是否继续依赖运行时公共 API |
| @vitejs/plugin-vue | 6.0.5 | 6.0.8 | 可随 Vite 补丁升级 |
| @vue/test-utils | 2.4.6 | 2.4.11 | 可修复部分测试依赖链 |
| jsdom | 29.0.2 | 29.1.1 | 更新后重新解析 `undici` |

`npm audit` 在 2026-07-15 的结果：

- 全依赖：5 个漏洞，3 high、1 moderate、1 low；
- `--omit=dev`：1 个 moderate（PostCSS）；
- 没有 critical；
- 直接依赖 Vite 7.3.2 命中已知开发服务器问题，7.3.6 属于兼容范围内补丁目标；
- 其余问题主要来自 `jsdom -> undici`、`@vue/test-utils -> js-beautify -> js-cookie`、`vite -> esbuild/postcss`。

相关公告：

- [Vite 文件访问绕过 GHSA-fx2h-pf6j-xcff](https://github.com/advisories/GHSA-fx2h-pf6j-xcff)
- [Vite/launch-editor UNC 问题 GHSA-v6wh-96g9-6wx3](https://github.com/advisories/GHSA-v6wh-96g9-6wx3)
- [PostCSS 样式串行化 XSS GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93)
- [js-cookie 属性注入 GHSA-qjx8-664m-686j](https://github.com/advisories/GHSA-qjx8-664m-686j)

当前是纯静态部署，开发依赖不会作为 Node 服务长期运行，因此不能把这 5 项等同于“线上存在 5 个可直接利用漏洞”；但构建链、开发机和依赖供应链仍应及时修复。

安全方面的正面项：

- `.env` 已被 `.gitignore` 忽略；
- tracked files 中未发现常见 token、secret、password 或私钥模式；
- 联系表单只在浏览器生成 `mailto:`，没有把姓名、邮箱、消息发送到项目后端。

## 3. 按优先级排序的整改建议

### P0：先修产品真实性与生产加载链路

#### P0-1：首页只允许“真实可用”的入口可点击

问题：35 个未实现功能被渲染成链接，PDF 还标记为“优先上线”。这会直接破坏用户信任，也是当前最明确的功能缺陷。

建议：

1. 给应用和入口增加统一的 `availability: 'live' | 'beta' | 'planned'`。
2. 只有 `live`/`beta` 条目渲染为 `RouterLink`；`planned` 显示为不可点击卡片，并带“规划中”标签和 `aria-disabled="true"`。
3. 在第一个工具真正上线前，把“正在上线的网页 APP”“开始使用”“优先上线”改成准确的“规划中的工具”或“查看规划”。
4. 不要一次实现 35 个页面；先交付一个端到端可用的工具，再把它设为 `live`。
5. 增加路由完整性测试：每个可点击内部链接必须能映射到真实路由，且不能落到 catch-all。

验收标准：

- 首页不存在任何会返回 404 的可点击产品入口；
- “可用/测试中/规划中”由数据模型控制，文案、样式、链接行为一致；
- CI 自动阻止新增悬空链接。

#### P0-2：对该 SPA 禁用 Rocket Loader，并重新测量

优先方案是在 Cloudflare Configuration Rule 中对 `thanejoss.com` 的应用页面禁用 Rocket Loader。原因是 Vite 会自动生成依赖脚本，逐个维护 `data-cfasync="false"` 容易遗漏；Cloudflare 也明确要求依赖脚本全部排除，而且属性必须出现在 `src` 之前。

处理顺序：

1. 在 Cloudflare 对该主机禁用 Rocket Loader；
2. 清理 Cloudflare 缓存；
3. 重新验证 `/`、`/contact`、404 和移动端；
4. 比较禁用前后的 FCP、LCP、`#app` 挂载时间和请求失败数；
5. 只有数据证明 Rocket Loader 有净收益时才考虑重新启用。

监控不能再以 `networkidle` 或固定 3 秒等待作为“成功”条件。应等待语义选择器，例如首页 `h1`、联系页标题和 `#app > *`，并设置明确超时。

验收标准：

- 浏览器加载期间不再中止并重放核心模块；
- 页面加载后立即出现实际内容，而不是先显示大面积空背景；
- Browserless 在不追加固定等待的情况下可以捕获首页语义内容。

### P1：建立可以阻止回归的质量门禁

#### P1-1：把测试和构建移到 GitHub Actions

当前已有测试，但没有任何项目 CI；这与“本机不运行测试”的约束组合后，意味着测试事实上无人执行。

建议新增 PR 工作流：

```text
npm ci
npm run typecheck
npm test
npm run build
post-build assertions
```

建议使用 Node 24 LTS，而不是本机当前的 Node 26 Current；同时在 `package.json#engines`、`.nvmrc` 或 `.node-version` 中固定运行线。Node 官方当前将 24 标记为 LTS、26 标记为 Current：[Node.js 发布状态](https://nodejs.org/en/about/previous-releases)。GitHub 官方也建议用 `setup-node` + `npm ci` 构建和测试 Node 项目：[GitHub Actions Node.js 指南](https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs?learn=continuous_integration)。

构建后至少自动断言：

- `sitemap.xml` 不包含 404；
- 首页可点击内部路径都存在；
- `index.html` 和 `404.html` 包含预期 meta；
- 构建产物没有意外的第三方脚本；
- 产物大小和入口请求数没有明显回退。

部署后增加远程 Browserless smoke test：

- 等待语义内容，不等待固定秒数；
- 检查 `/`、`/contact`、真实 404；
- 保存失败时的桌面/移动端截图和 HTML 为 CI artifact；
- 不在日志中输出 Browserless token。

CI 稳定后，将它设为 `main` 的 required status check，再允许生产部署。

#### P1-2：先做兼容范围内的依赖与安全修复

创建单独依赖 PR，先更新 lockfile 能安全吸收的补丁版本，不使用 `npm audit fix --force`。

优先更新：

- Vite 7.3.6；
- Vue 3.5.39；
- Vitest 4.1.10；
- UnoCSS 66.7.5；
- vue-tsc 3.3.7；
- jsdom 29.1.1；
- @vue/test-utils 2.4.11；
- @vitejs/plugin-vue 6.0.8；
- @iconify/vue 5.0.1。

更新后在 CI 重新执行完整 `npm audit`，确认 Vite、PostCSS、esbuild、undici、js-cookie 的实际解析版本和剩余风险。再加 Dependabot 或 Renovate，每周生成补丁 PR，但必须受 CI 约束。

#### P1-3：修复无障碍的确定性缺陷

已计算的反馈文本对比度：

| 状态 | 前景/近似背景 | 对比度 | WCAG AA 普通文本要求 |
| --- | --- | ---: | ---: |
| success | `#74e7c8` / 10% mint 浅底 | 1.44:1 | 4.5:1 |
| error | `#ff8d6b` / 10% ember 浅底 | 2.10:1 | 4.5:1 |

两者都明显不达标。[WCAG 2.2 1.4.3](https://www.w3.org/TR/WCAG22/#contrast-minimum)要求普通文本至少 4.5:1。

还应同时修复：

- 为所有链接、按钮、输入框建立一致且明显的 `:focus-visible` 样式；输入框当前使用 `outline-none`，只改变细边框。
- 表单反馈增加 `role="status"`/`aria-live`，错误字段增加 `aria-invalid` 和关联错误说明。
- 联系卡片关闭后把焦点还给原触发按钮；现在 `closeCard()` 只清空状态。
- 增加跳到主内容的 skip link。
- `prefers-reduced-motion` 下同时关闭 `scroll-behavior: smooth`、JS 平滑滚动和装饰性位移动画，而不只是卡片/路由 transition。
- 在 CI 中加入 axe 组件检查或浏览器级无障碍扫描。

#### P1-4：修复 sitemap 与页面元数据

当前 live sitemap 和本地生成快照都包含：

- `/`
- `/contact`
- `/404`

但 `/404` 真实返回 404，`404.html` 又明确 `noindex`。应在 `vite-plugin-sitemap` 中加入 `exclude: ['/404']`。

另外，服务端返回的 `/` 和 `/contact` 初始 HTML 共用标题 `Thane Joss` 和同一 description；只有 Vue 执行后，[router.afterEach](src/router/index.ts#L60-L75) 才更新标题和描述。对不执行 JavaScript 的社交抓取器和搜索引擎并不理想。

建议：

- 首页和联系页输出独立 title、description、canonical、Open Graph 和 Twitter Card；
- 只有两个营销页面时优先静态预渲染/SSG，不必直接迁移到大型 SSR 框架；
- 404 保持真实 HTTP 404 + `noindex`；
- sitemap 只列出返回 200 且希望被索引的 canonical URL。

Google 仍建议优先服务端或静态渲染，并指出并非所有爬虫都执行 JavaScript：[JavaScript SEO 基础](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)。Vue 官方也建议把营销页做成静态 HTML/SSG：[Vue 性能最佳实践](https://vuejs.org/guide/best-practices/performance)。

### P2：降低维护成本和第三方依赖

#### P2-1：把应用目录变成单一事实来源

建议结构：

```text
src/features/catalog/
  apps.ts
  types.ts
  AppCard.vue
  AppEntry.vue
  catalogIntegrity.test.ts
```

改造目标：

- 从 `HomeView.vue` 移出 317 行左右的目录数据；
- 用明确类型表达状态、父路径、子入口、是否可点击；
- 路由、首页展示、sitemap 和测试尽量从同一份 manifest 派生；
- 内部导航使用 `RouterLink`，避免不必要的整页加载；
- 删除或真正使用 `shared/types.ts`。目前其中 5 个接口没有任何引用，且与现有首页数据模型不一致；
- 删除或接入未使用的 `SiteFooter.vue`，避免死代码继续漂移。

不要仅为了“拆文件”制造大量小组件；边界应围绕目录数据、卡片行为、联系表单和页面 shell。

#### P2-2：简化构建与拆包

当前 `split-vendor-chunk-plugin` 会把每个 `node_modules` 包映射成独立 manual chunk。生产首页因此出现 7 个首屏模块资源；对于这个体量很小的网站，收益没有被数据证明。

更重要的是，Vite 8 使用 Rolldown/Oxc，已经弃用 `build.rollupOptions` 和函数式 `manualChunks`。现有插件正好依赖这两个接口：[Vite 8 迁移指南](https://vite.dev/guide/migration.html)。

建议：

1. 先移除 `split-vendor-chunk-plugin`；
2. 让 Vite 默认拆包，保留联系页和 404 的动态 import；
3. 对比请求数、压缩体积、FCP/LCP 和缓存命中；
4. 确有数据收益时，再用 Vite 8/Rolldown 的新 `codeSplitting` 能力做定向优化。

#### P2-3：停止把整份 CSS 当成 critical CSS

[inline-critical-css.mjs](scripts/inline-critical-css.mjs#L4-L25)会读取每一份完整样式表，并把全部 CSS 替换进每个 HTML 文件。当前本地 `dist` 快照中的 CSS 约 27.7 KB，结果是：

- `index.html` 和 `404.html` 都重复携带整份 CSS；
- 样式不能作为带 hash 的独立资源长期缓存；
- 每次 HTML 更新都会重新传输样式；
- 脚本名称“critical”与实际行为不符。

优先删除这一步并保留 Vite 的 hashed CSS。只有真实测量证明首屏受益时，才内联少量、明确提取的 above-the-fold CSS。

#### P2-4：减少 Iconify 运行时外部请求

首页挂载后会向 `api.iconify.design` 发起两批请求，一次性请求 35 个 Solar 图标，其中绝大多数对应尚未实现的规划功能。Iconify 官方说明，Vue 组件使用字符串图标名时会在运行时访问公共 API：[Iconify for Vue](https://iconify.design/docs/icon-components/vue/)。

建议：

- 首先不要渲染规划功能的 35 个交互图标；
- 对固定 UI 图标使用本地 icon data、构建时图标插件或少量内联 SVG；
- 若保留公共 API，明确 CSP、失败占位、隐私和离线行为；
- 不要把更换成另一套大型图标库当作优化，重点是只打包实际使用的图标。

#### P2-5：补齐最小工程规范

建议增加：

- ESLint flat config + `eslint-plugin-vue`；
- `lint` 脚本并纳入 CI；
- Node 24 LTS 与 npm 版本约束；
- Dependabot/Renovate；
- 简短架构说明和部署/Cloudflare 配置说明；
- 明确“本机不跑测试、CI 执行测试”的仓库规则，并合并或处理 PR #76。

#### P2-6：校正安全响应头与边缘配置

生产响应已有 `X-Content-Type-Options: nosniff` 和 HSTS，但 HSTS 当前是：

```text
max-age=2592000; includeSubDomains; preload
```

`2592000` 只有 30 天，而 Cloudflare 文档说明进入 preload list 至少需要 12 个月：[Cloudflare HSTS 文档](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/)。不要盲目增加时长；应先确认所有子域名永久支持 HTTPS，然后二选一：

- 不准备 preload：移除 `preload` 标志；
- 准备 preload：把 max-age 提升到至少 12 个月，确认所有子域 HTTPS 后再提交 preload。

当前未观察到 CSP、Referrer-Policy、Permissions-Policy 或 frame 限制。建议按以下顺序上线：

1. 先禁用 Rocket Loader 并本地化固定图标；
2. 加 `Content-Security-Policy-Report-Only` 收集误报；
3. 再启用正式 CSP，优先使用 `frame-ancestors`；
4. 添加 `Referrer-Policy: strict-origin-when-cross-origin` 和保守的 Permissions-Policy；
5. 在 `vercel.json` 或 Cloudflare 中集中管理并自动检查。Vercel 支持通过 `headers` 配置响应头：[vercel.json 文档](https://vercel.com/docs/project-configuration/vercel-json#headers)。

### P3：大版本升级路线

#### 阶段 A：先稳定现有主线

- 完成 P0；
- 建立 CI；
- 升到所有兼容范围内补丁版本；
- `npm audit` 无 high，剩余项有明确豁免理由；
- 移除 vendor 拆包插件；
- 把 UnoCSS 的 `presetUno()` 改成 `presetWind3()`。官方已将前者标记为弃用：[UnoCSS Wind3 preset](https://unocss.dev/presets/wind3)。

#### 阶段 B：Vue Router 5

当前项目没有 `unplugin-vue-router`，只使用手写路由。官方迁移说明称这类 Vue Router 4 项目升级到 5 通常无需代码修改：[Vue Router 5 迁移指南](https://router.vuejs.org/guide/migration/v4-to-v5)。

仍应单独 PR，重点验证：

- history 与直接访问；
- `/contact` 懒加载；
- catch-all 404；
- scrollBehavior；
- 页面 title/description 更新。

#### 阶段 C：Vite 8

Vite 8 把 Rollup/esbuild 构建内核迁移到 Rolldown/Oxc，Node 要求为 20.19+ 或 22.12+；Node 24 LTS 满足要求。官方建议复杂项目可先在 Vite 7 上试用 Rolldown，再迁移到 Vite 8：[Vite 8 发布说明](https://vite.dev/blog/announcing-vite8)。

本项目迁移前必须先处理：

- `split-vendor-chunk-plugin`；
- `build.rollupOptions` 命名与 manualChunks；
- sitemap 插件构建兼容性；
- critical CSS 后处理脚本；
- 产物结构和 Vercel 404 行为。

#### 阶段 D：TypeScript 6 → 7

不要从 5.9.3 直接把版本号改到 7.0.2。TypeScript 官方把 6.0 定位为过渡版本；TypeScript 7 是新的 Go 原生实现，7.0 尚不提供旧编译器 API，工具可以通过兼容包并行运行：[TypeScript 7.0 发布说明](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)。

建议：

1. 先升级 TypeScript 6，解决弃用项和新默认值；
2. 确认 `vue-tsc`、Volar、Vitest、ESLint 全部支持；
3. CI 中并行试跑 TypeScript 7；
4. 类型检查结果一致后再切换主编译器。

## 4. 建议实施顺序

### 0～2 天

1. Cloudflare 禁用 Rocket Loader，清缓存并重新测量。
2. 让所有未实现工具入口不可点击，修正文案。
3. 添加最小 GitHub Actions：安装、类型检查、测试、构建。
4. 增加路由完整性和部署后语义 smoke test。
5. 合并、更新或关闭 PR #76，消除文档与测试现状冲突。

### 第 1 周

1. 完成兼容范围内依赖升级与安全修复。
2. 修复反馈色、焦点、`aria-live`、焦点返回和 reduced motion。
3. 从 sitemap 排除 `/404`，补 canonical/OG metadata。
4. 移除 vendor 拆包插件和全量 CSS 内联，基于数据比较前后表现。
5. 将 Node 24 LTS、lint、依赖更新纳入 CI。

### 第 2～4 周

1. 交付一个真正可用的工具作为 `live` 入口。
2. 抽离 typed app manifest，让路由、目录和 sitemap 共用事实来源。
3. 对首页与联系页做 SSG/静态预渲染。
4. 本地化固定图标，逐步收紧 CSP。
5. 分 PR 迁移 Vue Router 5、Vite 8、TypeScript 6/7。

## 5. 不建议做的事

- 不要先做大规模视觉重构；当前最大问题不是卡片样式。
- 不要一次创建 35 个空页面来“消灭 404”；应交付真实能力或取消链接。
- 不要使用全局 SPA wildcard rewrite 把所有未知路径都返回 200，否则会制造 soft 404。
- 不要用固定等待 3 秒掩盖 Rocket Loader；应修加载链路并等待语义内容。
- 不要在没有 CI 的情况下同时升级 Vite 8、Vue Router 5、TypeScript 7。
- 不要使用 `npm audit fix --force` 跨大版本自动改依赖。
- 不要为了“优化”继续手工细拆 vendor chunk；先用真实测量证明收益。

## 6. 完成定义

完成本轮建议的最低标准应是：

- 首页每个可点击工具入口都能真实工作，不会进入 404；
- Chrome 首次加载无需 Rocket Loader 重放核心模块，语义内容稳定出现；
- PR 必须通过类型检查、单元/组件测试、构建和路由完整性检查；
- 生产部署后自动验证首页、联系页、404 和移动端截图；
- `npm audit` 无 high，其他项有清晰的风险说明；
- sitemap 不包含错误页，首页/联系页有独立初始 metadata；
- 关键交互满足键盘、焦点、状态播报和最低对比度要求；
- 每次大版本升级独立 PR、可回滚、有升级前后指标。

达到这些条件后，再增加新的网页 APP，项目才会从“展示目录”真正进入“可持续交付的平台”阶段。
