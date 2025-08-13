import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/components/products/ProductList.vue";
import NewProductWizard from "@/components/products/NewProductWizard.vue";

const routes = [
  { path: "/", name: "products", component: ProductList },
  { path: "/new", name: "new", component: NewProductWizard },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
