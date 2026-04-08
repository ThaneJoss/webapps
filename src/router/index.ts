import { createRouter, createWebHistory } from 'vue-router'

import ContactView from '../views/ContactView.vue'
import HomeView from '../views/HomeView.vue'
import PipelineView from '../views/PipelineView.vue'
import ProcessView from '../views/ProcessView.vue'
import ServicesView from '../views/ServicesView.vue'
import StackView from '../views/StackView.vue'

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
      path: '/services',
      name: 'services',
      component: ServicesView,
      meta: {
        title: '能力'
      }
    },
    {
      path: '/process',
      name: 'process',
      component: ProcessView,
      meta: {
        title: '流程'
      }
    },
    {
      path: '/stack',
      name: 'stack',
      component: StackView,
      meta: {
        title: '技术'
      }
    },
    {
      path: '/pipeline',
      name: 'pipeline',
      component: PipelineView,
      meta: {
        title: 'Pipeline'
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
  const pageTitle = typeof to.meta.title === 'string'
    ? `${to.meta.title} | Web Apps as a Service`
    : 'Web Apps as a Service'

  document.title = pageTitle
})

export default router
