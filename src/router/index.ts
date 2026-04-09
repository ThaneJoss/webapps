import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

const defaultDescription = 'Thane Joss 的个人网站与联系入口，持续整理内容与更新，并提供邮件、表单和留言等沟通方式。'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '个人网站',
        description: defaultDescription
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        title: '联系',
        description: '通过联系页直接留言、发送邮件，或从网页表单开始整理你的想法与需求。'
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
  const metaDescription = typeof to.meta.description === 'string'
    ? to.meta.description
    : defaultDescription

  document.title = pageTitle
  const descriptionTag = document.querySelector('meta[name="description"]')

  if (descriptionTag instanceof HTMLMetaElement) {
    descriptionTag.content = metaDescription
  }
})

export default router
