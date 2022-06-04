import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: () =>
      import(/* webpackChunkName: "SignIn" */ "../views/SignInView.vue"),
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "SignUp" */ "../views/SignUpView.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "Profile" */ "../views/ProfileView.vue"),
  },
  {
    path: "/change-password",
    name: "ChangePassword",
    component: () =>
      import(
        /* webpackChunkName: "ChangePassword" */ "../views/ChangePasswordView.vue"
      ),
  },
  {
    path: "/lost-password",
    name: "LostPassword",
    component: () =>
      import(
        /* webpackChunkName: "LostPassword" */ "../views/LostPasswordView.vue"
      ),
  },
  {
    path: "/sign-out",
    name: "SignOut",
    component: () =>
      import(/* webpackChunkName: "Profile" */ "../views/ProfileView.vue"),
    beforeEnter: (to, from, next) => {
      localStorage.removeItem("user");
      next("sign-in");
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//Validate if user is logged
router.beforeEach((to, from, next) => {
  const publicPages = [
    "/sign-in",
    "/sign-up",
    "/",
    "/lost-password",
    "/log-out",
  ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");
  if (authRequired && !loggedIn) {
    next("/sign-in");
  } else {
    next();
  }
});

export default router;
