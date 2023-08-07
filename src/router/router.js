import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      layout: "base",
    },
    component: () => import("@/pages/base/Home.vue"),
  },
  {
    path: "/product",
    name: "Product",
    meta: {
      layout: "base",
    },
    component: () => import("@/pages/base/Product.vue"),
  },
  {
    path: "/news",
    name: "News",
    meta: {
      layout: "base",
    },
    component: () => import("@/pages/base/News.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "auth",
    },
    component: () => import("@/pages/base/Login.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    meta: {
      layout: "auth",
    },
    component: () => import("@/pages/base/Logout.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      layout: "auth",
    },
    component: () => import("@/pages/base/Register.vue"),
  },
  {
    path: "/admin",
    name: "Dashboard",
    meta: {
      layout: "default",
      requiredRoles: ["admin"],
    },
    component: () => import("../pages/admin/Dashboard.vue"),
  },
  {
    path: "/admin/productlist",
    name: "ProductList",
    meta: {
      layout: "default",
      requiredRoles: ["admin"],
    },
    component: () => import("../pages/admin/products/productList.vue"),
  },
  {
    path: "/admin/product/:id",
    name: "ProductDetail",
    meta: {
      layout: "default",
      requiredRoles: ["admin"],
    },
    component: () => import("../pages/admin/products/productDetail.vue"),
  },
  {
    path: "/admin/productadd",
    name: "ProductAdd",
    meta: {
      layout: "default",
      requiredRoles: ["admin"],
    },
    component: () => import("../pages/admin/products/productAdd.vue"),
  },
  {
    path: "/admin/productedit/:id",
    name: "ProductEdit",
    meta: {
      layout: "default",
      requiredRoles: ["admin"],
    },
    component: () => import("../pages/admin/products/productEdit.vue"),
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("../pages/PageNotFound.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
// Global Before Guards
let userRole;
if (localStorage.getItem("user")) {
  const storedUser = localStorage.getItem("user");
  const parseUser = JSON.parse(storedUser);
  userRole = parseUser.user.roles; // Lấy vai trò của người dùng từ store hoặc thông tin đăng nhập
} else {
  userRole = "user";
}
router.beforeEach((to, from, next) => {
  const requiredRoles = to.meta.requiredRoles || [];

  if (requiredRoles.length === 0 || requiredRoles.includes(userRole)) {
    // Nếu không yêu cầu vai trò hoặc người dùng có quyền truy cập, cho phép tiếp tục
    next();
  } else {
    // Nếu không có quyền truy cập, chuyển hướng đến trang lỗi hoặc trang chủ
    next("/");
  }
});

export default router;
