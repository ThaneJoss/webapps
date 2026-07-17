import { ViteSSG } from 'vite-ssg'

import App from './App.vue'
import { installRouterClientBehavior, routes, scrollBehavior } from './router'
import './styles.css'
import 'virtual:uno.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior
  },
  ({ router }) => {
    if (!import.meta.env.SSR) {
      installRouterClientBehavior(router)
    }
  },
  {
    hydration: true
  }
)
