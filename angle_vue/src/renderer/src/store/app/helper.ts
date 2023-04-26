import { lStorage } from '@renderer/utils/webStorage';
import type { Language } from '@renderer/i18n/model';
import type { UserParticles } from '@renderer/assets/particles';

const LOCAL_NAME = 'appSetting';

export type Theme = 'light' | 'dark' | 'auto';

export interface AppState {
  siderCollapsed: boolean;
  theme: Theme;
  language: Language;
  particles: UserParticles;
}

export function defaultSetting(): AppState {
  return { siderCollapsed: false, theme: 'light', language: 'zh-cn', particles: 'fireworks' };
}

export function getLocalSetting(): AppState {
  const localSetting: AppState | undefined = lStorage.get(LOCAL_NAME);
  return { ...defaultSetting(), ...localSetting };
}

export function setLocalSetting(setting: AppState): void {
  lStorage.set(LOCAL_NAME, setting);
}
