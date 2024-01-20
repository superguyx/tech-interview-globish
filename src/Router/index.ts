import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../pages/WelcomeBox.vue"),
  },
  {
    path: "/examination",
    name: "examination",
    component: () => import("../pages/PersonalityTest.vue"),
  },
  {
    path: "/ResultPersonality",
    name: "result-personality",
    component: () => import("../pages/ResultPersonality.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
