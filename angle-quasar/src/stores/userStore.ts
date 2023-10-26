/*
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-12 11:08:01
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-26 14:48:32
 * @FilePath: \angle-quasar\src\stores\userStore.ts
 */
import { defineStore } from 'pinia';
import { LOCALE } from '../i18n';
import { setLocale } from '../boot/i18n';
import { lStorage, sStorage } from '../utils/webStorage';
import { getNavLanguage } from '../utils/local';
import { isNull } from '@/utils/is';
import { LoginStateEnum } from '@/enums/main';
import { Location, Gender } from './typings/main';

import { Dark } from 'quasar';

interface UserState {
  locale: LOCALE;
  theme: boolean;
  location: Location;
  avatarUrl: string;
  token: string;
  loginState: LoginStateEnum;
  SMSCode: string;
  username: string;
  password: string;
  remember: boolean;
  phone: string;
  age: string;
  gender: Gender;
  tag?: string;
  newPassword?: string;
  againNewPassword?: string;
  description?: string;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    locale: LOCALE.ZH_CN, // default locale
    theme: false, // default theme
    avatarUrl: 'public\\icons\\default_icon.png',
    token: '',
    loginState: LoginStateEnum.LOGIN,
    SMSCode: '',
    username: '',
    phone: '',
    location: { longitude: 0, latitude: 0 },
    age: '',
    gender: null,
    tag: '',
    password: '',
    remember: false,
    description: '',
  }),
  getters: {
    getToken(state) {
      const token = state.token;
      if (token) return token;
      return lStorage.get('TOKEN');
    },
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
    getUserName(state) {
      const username = state.username;
      if (username) return username;
      return lStorage.get('USERNAME');
    },
    getDescription(state) {
      const description = state.description;
      if (description) return description;
      return lStorage.get('DESCRIPTION');
    },
    getPhone(state) {
      const phone = state.phone;
      if (phone) return phone;
      return lStorage.get('PHONE');
    },
    getAge(state) {
      const age = state.age;
      if (age) return age;
      return lStorage.get('AGE');
    },
    getGender(state) {
      const gender = state.gender;
      if (gender) return gender;
      return sStorage.get('gender');
    },
    getTag(state) {
      const tag = state.tag;
      if (tag) return tag;
      return sStorage.get('label');
    },
    getPassword(state) {
      const password = state.password;
      if (password) return password;
      return sStorage.get('password');
    },
    getLocation(state) {
      const location = state.location;
      if (location.longitude !== 0) return location;
      return sStorage.get('location');
    },
    getRemember(state) {
      const remember = state.remember;
      if (remember) return remember;
      return lStorage.get('remember');
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
    setToken(token: string) {
      if (!token) return;
      this.token = token;
      lStorage.set('TOKEN', token);
    },
  },
});
