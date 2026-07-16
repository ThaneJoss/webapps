import type { Router, RouterScrollBehavior, RouteRecordRaw } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import { applyPageMetadata } from '../lib/seoClient'

const routeTransitionScrollDelayMs = 180

const prefersReducedMotion = () => typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const afterRouteTransition = <T>(position: T) => {
  if (typeof window === 'undefined' || prefersReducedMotion()) {
    return Promise.resolve(position)
  }

  return new Promise<T>((resolve) => {
    window.setTimeout(() => resolve(position), routeTransitionScrollDelayMs)
  })
}

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue')
  }
]

export const scrollBehavior: RouterScrollBehavior = (to, _, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }

  if (to.hash) {
    return afterRouteTransition({
      el: to.hash,
      top: 96,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    })
  }

  return afterRouteTransition({ top: 0 })
}

export const installRouterMetadata = (router: Router) => {
  router.afterEach((to) => {
    applyPageMetadata(to.path)
  })

  applyPageMetadata(router.currentRoute.value.path)
}
