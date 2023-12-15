import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/Index.vue'),
  },
  {
    path: '/home',
    component: () => import('@/layouts/main/Index.vue'),
    name: 'home',
    children: [
      {
        path: '/chat',
        name: 'chat',
        component: () => import('@/pages/chat/Index.vue'),
        children: [
          {
            path: 'chatBox/:uuid?',
            name: 'chatBox',
            component: () =>
              import('@/pages/chat/components/Message/Index.vue'),
          },
        ],
      },
      {
        path: '/friends',
        name: 'friends',
        component: () => import('@/pages/friends/Index.vue'),
      },
      {
        path: '/chatRobot',
        name: 'chatRobot',
        component: () => import('@/pages/chatRobot/Index.vue'),
        children: [
          {
            path: 'chatRobotBox/:uuid?',
            name: 'chatRobotBox',
            component: () =>
              import('@/pages/chatRobot/components/Message/Index.vue'),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
];

export default routes;
