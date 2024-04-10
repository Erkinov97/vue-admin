import { createRouter, createWebHistory } from "vue-router";

// Import routes from routes.ts
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
