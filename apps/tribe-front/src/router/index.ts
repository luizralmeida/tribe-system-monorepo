import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginPage.vue'),
      meta: { public: true },
    },
    {
      path: '/',
      component: () => import('../layouts/DashboardLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../pages/DashboardPage.vue'),
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('../pages/UsersPage.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token');
  if (!to.meta.public && !token) {
    next({ name: 'login' });
  } else if (to.name === 'login' && token) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
