import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import LoginView from "@/views/LoginView.vue";
import ResultSearch from "@/views/ResultSearch.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/result",
      name: "result",
      component: ResultSearch,
    },
  ],
});

export default router;
