import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   redirect: '/',
  // },
  {
    path: '/',
    component: () => import('@/layouts/main/Index.vue'),
    children: [
      {
        path: 'chat/:uuid?',
        name: 'Chat',
        component: () => import('@/pages/chat/components/Message/Index.vue'),
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
