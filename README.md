# Web Apps as a Service

一个基于 `Vite + Vue 3 + TypeScript` 的产品化展示站，配套一个通用 `Hono` REST API 骨架。

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Stack

- Frontend: `Vue 3`, `Vue Router`, `UnoCSS`
- API: `Hono`, standard `RESTful JSON`
- Runtime target: serverless-ready, but not tied to Wrangler bindings

## API

- `GET /api/health`
- `GET /api/services`
- `GET /api/apps`
- `POST /api/contact`

## Notes

- 前端默认通过 `VITE_API_BASE_URL` 请求 API，未配置时使用 `/api`
- 本地 Vite 开发环境会把 `/api` 代理到 `http://localhost:8787`
- 联系表单当前返回队列确认结构，后续可接邮件、数据库或 webhook

## Production

- 项目域名：`https://thanejoss.com`
- API 域名：`https://api.thanejoss.com`
- 前端生产环境默认从仓库内的 `.env.production` 读取：
  - `VITE_API_BASE_URL=https://api.thanejoss.com/api`
- API 默认允许来自 `https://thanejoss.com` 的跨域请求
- 如果后面要同时支持 `www.thanejoss.com`，把 API 运行环境中的 `CORS_ALLOW_ORIGIN` 改成逗号分隔列表
