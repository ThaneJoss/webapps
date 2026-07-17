import type { Router, RouterScrollBehavior, RouteRecordRaw } from 'vue-router'

import { prefersReducedMotion } from '../lib/motion'
import { applyPageMetadata } from '../lib/seoClient'
import HomeView from '../views/HomeView.vue'

let routeTransitionPromise: Promise<void> = Promise.resolve()
let resolveRouteTransition: (() => void) | null = null

const beginRouteTransition = () => {
  resolveRouteTransition?.()
  routeTransitionPromise = new Promise((resolve) => {
    resolveRouteTransition = resolve
  })
}

export const completeRouteTransition = () => {
  if (!resolveRouteTransition) {
    return false
  }

  const resolve = resolveRouteTransition
  resolveRouteTransition = null
  resolve()
  return true
}

const afterRouteTransition = <T>(position: T) => {
  if (typeof window === 'undefined') {
    return Promise.resolve(position)
  }

  return routeTransitionPromise.then(() => position)
}

const getHeaderOffset = () => {
  if (typeof document === 'undefined') {
    return 96
  }

  return Math.ceil(document.querySelector('header')?.getBoundingClientRect().height ?? 80) + 16
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
    return afterRouteTransition(savedPosition)
  }

  if (to.hash) {
    return afterRouteTransition({
      el: to.hash,
      top: getHeaderOffset(),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    })
  }

  return afterRouteTransition({ top: 0 })
}

export const installRouterClientBehavior = (router: Router) => {
  router.beforeEach((to, from) => {
    if (from.matched.length > 0 && to.path !== from.path) {
      beginRouteTransition()
    }
  })

  router.afterEach((to, _, failure) => {
    if (failure) {
      completeRouteTransition()
      return
    }

    applyPageMetadata(to.path)
  })

  router.onError(() => {
    completeRouteTransition()
  })

  applyPageMetadata(router.currentRoute.value.path)
}
