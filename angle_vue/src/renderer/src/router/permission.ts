import type { Router } from 'vue-router';
import { useAuthStore } from '@renderer/store';

export function setupPageGuard(router: Router) {
	router.beforeEach(async (to, _from, next) => {
		try {
			const authStore = useAuthStore();

			if (to.name !== 'login' && !authStore.getToken) {
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
