import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import AppLayout from "../layouts/AppLayout.vue";
import Orders from "../views/Orders.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/orders",
  },
  {
    path: "/orders",
    component: AppLayout,
    children: [
      {
        path: "",
        name: "Orders",
        component: Orders,
      },
      // {
      //   path: "id-:id",
      //   name: "OrderDetail",
      // },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/orders",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
