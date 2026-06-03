# Web Apps as a Service

一个基于 `Vite + Vue 3 + TypeScript` 的产品化展示站。

## Commands

- `npm install`
- `npm run dev`
- `npm test`
- `npm run build`
- `npm run preview`

## Testing

- `npm test`: 运行前端单元与组件测试
- `npm run test:unit:watch`: 开发时持续监听测试
- `npm run build`: PR 前默认验证，包含类型检查

## Stack

- Frontend: `Vue 3`, `Vue Router`, `UnoCSS`
- Runtime target: static frontend hosting

## Notes

- `services` 和 `apps` 内容当前由前端本地内容源提供，不依赖内容接口
- 联系表单不再调用后端，会在前端生成 `mailto:` 邮件草稿

## Production

- 项目域名：`https://thanejoss.com`
- 生产环境不需要后端 API worker 或 API 域名
