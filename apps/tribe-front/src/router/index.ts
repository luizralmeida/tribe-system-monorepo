import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/LandingPage.vue'),
      meta: { public: true },
    },
    {
      path: '/restricted-area',
      name: 'restrictedArea',
      component: () => import('../pages/RestrictedAreaPage.vue'),
      meta: { public: true },
    },
    {
      path: '/guest-access',
      name: 'guestAccess',
      component: () => import('../pages/GuestAccessPage.vue'),
      meta: { public: true },
    },
    {
      path: '/guest-events',
      name: 'guestEvents',
      component: () => import('../pages/GuestEventsPage.vue'),
      meta: { public: true },
    },
    {
      path: '/guest-rsvp/:id',
      name: 'guestRSVP',
      component: () => import('../pages/GuestRSVPPage.vue'),
      meta: { public: true },
    },
    {
      path: '/admin/check-in/:id',
      name: 'staffCheckIn',
      component: () => import('../pages/StaffCheckInPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginPage.vue'),
      meta: { public: true },
    },
    {
      path: '/admin',
      component: () => import('../layouts/DashboardLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../pages/EventsPage.vue'),
        },
        {
          path: 'events/:id',
          name: 'eventDashboard',
          component: () => import('../pages/EventDashboardPage.vue'),
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('../pages/UsersPage.vue'),
        },
      ],
    },
    {
      path: '/events/:id',
      redirect: (to) => {
        return { name: 'eventDashboard', params: { id: to.params.id } };
      },
    },
    {
      path: '/events',
      redirect: { name: 'dashboard' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home' },
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
