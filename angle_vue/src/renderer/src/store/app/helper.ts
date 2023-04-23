import { lStorage } from '@renderer/utils/webStorage';

const LOCAL_NAME = 'appSetting';

export type Theme = 'light' | 'dark' | 'auto';

export type Language = 'zh-cn' | 'en-us';

export interface AppState {
	siderCollapsed: boolean;
	theme: Theme;
	language: Language;
}

export function defaultSetting(): AppState {
	return { siderCollapsed: false, theme: 'light', language: 'zh-cn' };
}

export function getLocalSetting(): AppState {
	const localSetting: AppState | undefined = lStorage.get(LOCAL_NAME);
	return { ...defaultSetting(), ...localSetting };
}

export function setLocalSetting(setting: AppState): void {
	lStorage.set(LOCAL_NAME, setting);
}
