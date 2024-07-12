import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import LoginView from "@/views/LoginView.vue";
import Meeting from "@/views/Meeting.vue";
import Profile from "@/views/Profile.vue";
import ResultSearch from "@/views/ResultSearch.vue";
import Artist from "@/views/Artist.vue";
import AdminFlash from "@/views/AdminFlash.vue";
import Discover from "@/views/Discover.vue";

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
      path: "/artist/:id",
      name: "artist",
      component: Artist,
    },
    {
      path: "/discover",
      name: "discover",
      component: Discover,
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
        {
          path: "flash",
          name: "flash",
          component: AdminFlash,
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
