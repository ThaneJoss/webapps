import { createRouter, createWebHistory } from 'vue-router'

import ContactView from '../views/ContactView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: {
        title: '联系'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior(to, _, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        top: 96,
        behavior: 'smooth'
      }
    }

    return { top: 0 }
  }
})

router.afterEach((to) => {
  const siteTitle = 'Thane Joss'
  const pageTitle = typeof to.meta.title === 'string'
    ? `${to.meta.title} | ${siteTitle}`
    : siteTitle

  document.title = pageTitle
})

export default router
