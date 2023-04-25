import type { Router } from 'vue-router';
import { useUserStore } from '@renderer/store';

export function setupPageGuard(router: Router) {
	router.beforeEach(async (to, _from, next) => {
		try {
			const userStore = useUserStore();

			if (to.name !== 'login' && !userStore.getToken) {
				next({ name: 'login' });
			} else {
				next();
			}
		} catch (error) {
			if (to.path !== '/500') next({ name: '500' });
			else next();
		}
	});
}
