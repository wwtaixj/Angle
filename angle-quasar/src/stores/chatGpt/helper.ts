import { lStorage } from '@/utils';

const LOCAL_NAME = 'settingsStorage';

export interface SettingsState {
  systemMessage: string;
}

export function defaultSetting(): SettingsState {
  const currentDate = new Date().toISOString().split('T')[0];
  return {
    systemMessage: `你是智能语言模型ChatGPT,回答要尽可能简明扼要,知识截止: 2021-09-01,当前日期:${currentDate}`,
  };
}

export function getLocalState(): SettingsState {
  const localSetting: SettingsState | undefined = lStorage.get(LOCAL_NAME);
  return { ...defaultSetting(), ...localSetting };
}

export function setLocalState(setting: SettingsState): void {
  lStorage.set(LOCAL_NAME, setting);
}

export function removeLocalState() {
  lStorage.remove(LOCAL_NAME);
}
