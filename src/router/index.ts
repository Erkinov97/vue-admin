import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store";
// Import routes from routes.ts
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const publicPages = ["/login", "/"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");

  const authStore = useAuthStore();

  if (loggedIn && !authStore.tokenValid && refresh_token) {
    authStore.getUserMe();
  }

  if (authRequired && !loggedIn && !authStore.tokenValid && !refresh_token) {
    next("/login");
  } else if (to.path === "/login" && loggedIn) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
