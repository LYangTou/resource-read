import { createRouter, createWebHistory } from 'vue-router';
import ComponentsDemo from '../views/ComponentsDemo.vue';
import ComposablesDemo from '../views/ComposablesDemo.vue';
import HomeView from '../views/HomeView.vue';
import RequestDemo from '../views/RequestDemo.vue';
import StoresDemo from '../views/StoresDemo.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/composables', component: ComposablesDemo },
    { path: '/components', component: ComponentsDemo },
    { path: '/stores', component: StoresDemo },
    { path: '/request', component: RequestDemo },
  ],
});
