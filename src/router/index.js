import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "transaction.index",
    component: () => import("@/views/transaction/Index.vue"),
  },
  {
    path: "/create",
    name: "transaction.create",
    component: () => import("@/views/transaction/Create.vue"),
  },
  {
    path: "/edit/:id",
    name: "transaction.edit",
    component: () => import("@/views/transaction/Edit.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "views.notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  // routes: routes,
});
export default router;
