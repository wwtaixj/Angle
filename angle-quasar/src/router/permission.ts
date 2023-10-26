import type { Router } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { useMainStore } from '@/stores/mainStore';
import { DialogEventEnum } from '@/enums/main';

export function setupPageGuard(router: Router) {
  router.beforeEach((to, _from, next) => {
    try {
      const userStore = useUserStore();
      if (to.path !== '/' && !userStore.getToken) {
        useMainStore().openDialog(DialogEventEnum.LOGIN);
      } else {
        next();
      }
    } catch (error) {
      if (to.path !== '/500') next({ name: '500' });
      else next();
    }
  });
}
