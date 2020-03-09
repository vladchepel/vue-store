import Vue from 'vue';
import VueRouter from 'vue-router';
import Product from '@/components/Product.vue';
import Cart from '@/components/Cart.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/product/:id',
    component: Product,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '*',
    redirect: '',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
