import { createRouter, createWebHashHistory, RouteRecordRaw, RouteComponent } from 'vue-router';
import type { App } from 'vue';
import { t } from '@renderer/i18n';
import { setupPageGuard } from './permission';
import { ChatLayout } from '@renderer/views/chatGpt/layout';

const home: RouteComponent = () => import('@renderer/views/home/index.vue');
const chatGpt: RouteComponent = () => import('@renderer/views/chatGpt/index.vue');
const photo: RouteComponent = () => import('@renderer/views/photo/index.vue');
const BrowsePhoto: RouteComponent = () => import('@renderer/views/photo/children/browsePhoto.vue');
const AngellPhoto: RouteComponent = () => import('@renderer/views/photo/children/angellPhoto.vue');
const UploadPhoto: RouteComponent = () => import('@renderer/views/photo/children/uploadPhoto.vue');
const GradePhoto: RouteComponent = () => import('@renderer/views/photo/children/gradePhoto.vue');
const about: RouteComponent = () => import('@renderer/views/about/index.vue');
const login: RouteComponent = () => import('@renderer/views/login/index.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/404',
    name: '404',
    component: () => import('@renderer/views/exception/404/index.vue')
  },

  {
    path: '/500',
    name: '500',
    component: () => import('@renderer/views/exception/500/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/404'
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/home/',
    name: 'home',
    component: home,
    children: [
      {
        path: '/',
        redirect: '/home/chatGPT'
      },
      {
        path: 'chatGpt',
        name: 'chatGpt',
        component: ChatLayout,
        redirect: '/home/chatGPT/chat',
        children: [
          {
            path: 'chat/:uuid?',
            name: 'Chat',
            component: chatGpt
          }
        ],
        meta: {
          keepAlive: true,
          name: t('ChatGPT')
        }
      },
      {
        path: 'photo',
        name: 'photo',
        component: photo,
        meta: {
          keepAlive: false,
          name: t('Photo')
        },
        children: [
          {
            path: '/',
            redirect: '/home/photo/browsePhoto'
          },
          {
            // 浏览照片
            // BrowsePhoto 将被渲染到 User 的 <router-view> 内部
            path: 'browsePhoto',
            name: 'browsePhoto',
            component: BrowsePhoto,
            meta: {
              name: t('photo.Browse photos') //'浏览照片'
            }
          },
          {
            // 相册
            // AngellPhoto 将被渲染到 User 的 <router-view> 内部
            path: 'angellPhoto',
            name: 'angellPhoto',
            component: AngellPhoto,
            meta: {
              name: t('photo.Photo album') // 相册
            }
          },
          {
            // 上传照片
            // UploadPhoto 将被渲染到 User 的 <router-view> 内部
            path: 'uploadPhoto',
            name: 'uploadPhoto',
            component: UploadPhoto,
            meta: {
              name: t('photo.Upload photos') // 上传照片
            }
          },
          {
            // 其他
            // GradePhoto 将被渲染到 User 的 <router-view> 内部
            path: 'gradePhoto',
            name: 'gradePhoto',
            component: GradePhoto,
            meta: {
              name: t('photo.Other') // 其他
            }
          }
        ]
      },
      {
        path: 'about',
        name: 'about',
        component: about,
        meta: {
          keepAlive: false,
          name: t('About') // 关于
        }
      }
    ]
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});
// 权限
setupPageGuard(router);

export async function setupRouter(app: App) {
  app.use(router);
  await router.isReady();
}
export default router;
