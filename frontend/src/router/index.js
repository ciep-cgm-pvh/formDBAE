import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
const lazyLoad = (view) => import(`@/pages/${view}.vue`);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/graficos",
    name: "Graficos",
    component: lazyLoad("Graficos"),
  },
  {
    path: "/protecao",
    name: "Protecao",
    component: lazyLoad("Protecao"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: lazyLoad("PageNotFound"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
