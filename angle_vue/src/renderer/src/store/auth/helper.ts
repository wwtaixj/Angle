import { lStorage } from '@renderer/utils/webStorage';

const LOCAL_NAME = 'SECRET_TOKEN';

export function getToken() {
	return lStorage.get(LOCAL_NAME);
}

export function setToken(token: string) {
	return lStorage.set(LOCAL_NAME, token);
}

export function removeToken() {
	return lStorage.remove(LOCAL_NAME);
}
