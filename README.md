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
