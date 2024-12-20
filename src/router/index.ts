import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import Orders from "../views/Orders.vue";
import Home from "../views/Home..vue";
import AppLayout from "../layouts/AppLayout.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "",
        name: "home",
        component: Home,
      },
      {
        path: "/orders",
        name: "Orders",
        component: Orders,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
