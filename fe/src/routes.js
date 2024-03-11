import AuthLayout from "@/layouts/AuthLayout.vue";
import Index from "@/pages/index.vue";
import Login from "@/pages/login.vue";
import NotFound from "@/pages/not-found.vue";

export const routes = [
  {
    path: "/",
    component: Index,
  },
  {
    path: "/login",
    component: AuthLayout,
    children: [{ path: "", component: Login }],
  },
  {
    path: "/:path(.*)",
    component: NotFound,
  },
];

export default routes;
