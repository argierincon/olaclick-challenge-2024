import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import AppLayout from "../layouts/AppLayout.vue";
import Orders from "../views/Orders.vue";
import OrderDrawer from "../components/organisms/OrderDrawer.vue";

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
        children: [
          {
            path: "id-:id",
            name: "OrderDetail",
            component: OrderDrawer,
          },
        ],
      },
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
