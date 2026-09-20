import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/blog', name: 'blog', component: () => import('@/views/BlogView.vue') },
  {
    path: '/blog/nuevo',
    name: 'new-article',
    component: () => import('@/views/NewArticleView.vue'),
  },
  {
    path: '/blog/:slug',
    name: 'article',
    component: () => import('@/views/ArticleView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
