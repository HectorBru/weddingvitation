import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import InvitePage from "./components/Invite.vue";
import { useAuth } from "./composables/useAuth";

const routes = [
  { path: "/", component: Login },
  { path: "/invite", component: InvitePage, meta: { requiresAuth: true } }
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  const { user } = useAuth();
  if (to.meta.requiresAuth && !user.value) next("/");
  else next();
});

export default router;