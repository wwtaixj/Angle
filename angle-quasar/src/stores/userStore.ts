/*
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-12 11:08:01
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-16 17:43:42
 * @FilePath: \angle-quasar\src\stores\userStore.ts
 */
import { defineStore } from 'pinia';
import { LOCALE } from '../i18n';
import { setLocale } from '../boot/i18n';
import { lStorage } from '../utils/webStorage';
import { getNavLanguage } from '../utils/local';
import { isNull } from '@/utils/is';

import { Dark } from 'quasar';

interface UserState {
  locale: LOCALE;
  theme: boolean;
  avatarUrl: string;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    locale: LOCALE.ZH_CN, // default locale
    theme: false, // default theme
    avatarUrl: 'public\\icons\\default_icon.png',
  }),
  getters: {
    getTheme(state) {
      const theme = state.theme;
      if (theme) return theme;
      return lStorage.get('THEME');
    },
    getAvatarUrl(state) {
      const avatarUrl = state.avatarUrl;
      if (avatarUrl) return avatarUrl;
      return lStorage.get('AVATAR_URL') as string;
    },
    getLocales(state) {
      const locale = state.locale;
      if (locale) return locale;
      return lStorage.get('LOCALE');
    },
  },
  actions: {
    setLocales(locale: LOCALE) {
      if (!locale) return;
      this.locale = locale;
      setLocale(locale);
      lStorage.set('LOCALE', locale);
    },
    initUserStore() {
      let locale = lStorage.get('LOCALE') as LOCALE;
      if (!locale) locale = getNavLanguage() as LOCALE;
      this.setLocales(locale);
      const theme = lStorage.get('THEME') as boolean;
      this.setTheme(theme);
      const avatarUrl = lStorage.get('AVATAR_URL') as string;
      this.setAvatarUrl(avatarUrl);
    },
    setTheme(theme: boolean) {
      if (isNull(theme)) return;
      this.theme = theme;
      lStorage.set('THEME', theme);
      Dark.set(theme);
    },
    setAvatarUrl(avatarUrl: string) {
      if (!avatarUrl) return;
      this.avatarUrl = avatarUrl;
      lStorage.set('AVATAR_URL', avatarUrl);
    },
  },
});
