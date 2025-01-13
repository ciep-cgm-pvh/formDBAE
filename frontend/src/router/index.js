import { createRouter, createWebHistory } from 'vue-router';
import LGPD from '@/pages/LGPD.vue';

const routes = [
  {
    path: '/lgpd',
    name: 'LGPD',
    component: LGPD,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
