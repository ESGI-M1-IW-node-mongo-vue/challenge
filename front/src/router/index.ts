import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import LoginView from "@/views/LoginView.vue";
import Meeting from "@/views/Meeting.vue";
import Profile from "@/views/Profile.vue";
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
    {
      path: "/admin",
      name: "admin",
      children: [
        {
          path: "meeting",
          name: "meeting",
          component: Meeting,
        },
        {
          path: "profile",
          name: "profile",
          component: Profile,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.fullPath.startsWith("/admin")) {
    const value = localStorage.getItem("token");
    if (!value) {
      next("/login?redirectTo=" + to.fullPath);
      return;
    }
  }
  next();
});

export default router;
