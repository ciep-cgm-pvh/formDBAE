import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/view/Home.vue'

const lazyLoad = (view) => () => import(`@/view/${view}.vue`)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/graficos',
    name: 'Graficos',
    component: lazyLoad('Graficos'),
  },
  {
    path: '/protecao',
    name: 'Protecao',
    component: lazyLoad('Protecao'),
  },
  {
    path: '/success',
    name: 'Success',
    component: lazyLoad('Success'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: lazyLoad('PageNotFound'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
