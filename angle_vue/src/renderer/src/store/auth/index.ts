import { defineStore } from 'pinia';
import { store } from '@renderer/store';
import { sStorage } from '@renderer/utils/webStorage';

export interface AuthState {
	token: string | undefined;
}

const TOKEN_NAME = 'token';

export const useAuthStore = defineStore('auth-store', {
	state: (): AuthState => ({
		token: ''
	}),

	getters: {
		// TODO: 暂时设置isChatGPTAPI 为 true
		isChatGPTAPI(): boolean {
			return true;
		},
		getToken(state) {
			const token = state.token;
			if (token) return token;
			return sStorage.get(TOKEN_NAME);
		}
	},

	actions: {
		setToken(token: string) {
			if (!token) return;
			this.token = token;
			sStorage.set(TOKEN_NAME, token);
		},

		removeToken() {
			this.token = undefined;
			sStorage.remove(TOKEN_NAME);
		}
	}
});

export function useAuthStoreWithout() {
	return useAuthStore(store);
}
