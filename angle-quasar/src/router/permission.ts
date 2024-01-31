import type { Router } from 'vue-router';
import { useUserStore } from '@/stores/user';

export function setupPageGuard(router: Router) {
  router.beforeEach((to, _from, next) => {
    try {
      const userStore = useUserStore();
      if (to.name !== 'login' && to.path !== '/' && !userStore.getToken) {
        next('/login');
        return;
      }
      next();
    } catch (error) {
      if (to.path !== '/500') next({ name: '500' });
      else next();
    }
  });
}
