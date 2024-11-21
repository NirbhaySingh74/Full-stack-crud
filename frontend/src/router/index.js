import { createRouter, createWebHistory } from 'vue-router';
import SignUp from '../pages/SignUp.vue';
import Login from '../pages/Login.vue';
import Dashboard from '../pages/Dashboard.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/signup', component: SignUp },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('authToken'); 
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
