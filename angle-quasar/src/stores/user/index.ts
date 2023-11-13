import { defineStore } from 'pinia';
import { LOCALE } from '@/i18n';
import { setLocale } from '@/boot/i18n';
import { lStorage, sStorage } from '@/utils/webStorage';
import { getNavLanguage } from '@/utils/local';
import { isNull, isString, isBoolean } from '@/utils/is';
import { LoginStateEnum } from '@/enums/main';
import { Location } from '../typings/main';
import { Gender } from '@/axios/typings';
import { Dark } from 'quasar';
import { login, loginOut } from '@/axios';
import { resultPrompt, encrypt, decrypt } from '@/utils';
import { useMainStore } from '../main';
import { useI18n } from '@/boot/i18n';

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
  tag: string;
  newPassword: string;
  againNewPassword: string;
  description: string;
  email: string;
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
    email: '',
    newPassword: '', // 新密码
    againNewPassword: '',
  }),
  getters: {
    getToken(state) {
      const token = state.token;
      if (token) return token;
      return lStorage.get<UserState['token']>('TOKEN');
    },
    getTheme(state) {
      const theme = state.theme;
      if (theme) return theme;
      return lStorage.get<UserState['theme']>('THEME');
    },
    getAvatarUrl(state) {
      const avatarUrl = state.avatarUrl;
      if (avatarUrl) return avatarUrl;
      return lStorage.get<UserState['avatarUrl']>('AVATAR_URL');
    },
    getLocales(state) {
      const locale = state.locale;
      if (locale) return locale;
      return lStorage.get<UserState['locale']>('LOCALE');
    },
    getUserName(state) {
      const username = state.username;
      if (username) return username;
      return lStorage.get<UserState['username']>('USERNAME');
    },
    getDescription(state) {
      const description = state.description;
      if (description) return description;
      return lStorage.get<UserState['description']>('DESCRIPTION');
    },
    getPhone(state) {
      const phone = state.phone;
      if (phone) return phone;
      return lStorage.get<UserState['phone']>('PHONE');
    },
    getAge(state) {
      const age = state.age;
      if (age) return age;
      return lStorage.get<UserState['age']>('AGE');
    },
    getGender(state) {
      const gender = state.gender;
      if (gender) return gender;
      return sStorage.get<UserState['gender']>('GENDER');
    },
    getTag(state) {
      const tag = state.tag;
      if (tag) return tag;
      return sStorage.get<UserState['tag']>('TAG');
    },
    getPassword(state) {
      const password = state.password;
      if (password) return password;
      return sStorage.get<UserState['password']>('PASSWORD');
    },
    getLocation(state) {
      const location = state.location;
      if (location.longitude !== 0) return location;
      return sStorage.get<UserState['location']>('LOCATION');
    },
    getRemember(state) {
      const remember = state.remember;
      if (remember) return remember;
      return lStorage.get<UserState['remember']>('REMEMBER');
    },
    getEmail(state) {
      const email = state.email;
      if (email) return email;
      return lStorage.get<UserState['email']>('EMAIL');
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
      if (!isBoolean(theme)) return;
      this.theme = theme;
      lStorage.set('THEME', theme);
      Dark.set(theme);
    },
    setAvatarUrl(avatarUrl: string) {
      if (!isString(avatarUrl)) return;
      this.avatarUrl = avatarUrl;
      lStorage.set('AVATAR_URL', avatarUrl);
    },
    setToken(token: string) {
      if (!isString(token)) return;
      this.token = token;
      lStorage.set('TOKEN', token);
    },
    setUsername(name: string) {
      if (!isString(name)) return;
      this.username = name;
      lStorage.set('USERNAME', name);
    },
    setPassword(password: string) {
      if (!isString(password)) return;
      this.password = password;
      lStorage.set('PASSWORD', password);
    },
    setAge(age: string) {
      if (!isString(age)) return;
      this.age = age;
      lStorage.set('AGE', age);
    },
    setGender(gender: Gender) {
      if (!isString(gender) && gender !== null) return;
      this.gender = gender;
      lStorage.set('GENDER', gender);
    },
    setTag(tag: string) {
      if (!isString(tag)) return;
      this.tag = tag;
      lStorage.set('TAG', tag);
    },
    setPhone(phone: string) {
      if (!isString(phone)) return;
      this.phone = phone;
      lStorage.set('PHONE', phone);
    },
    setRemember(remember: boolean) {
      if (!isBoolean(remember)) return;
      this.remember = remember;
      lStorage.set('REMEMBER', remember);
    },
    setEmail(email: string) {
      if (!isString(email)) return;
      this.email = email;
      lStorage.set('EMAIL', email);
    },
    /**
     * @description 登录
     */
    async login() {
      const { username, password, remember } = this.$state;
      resultPrompt(
        await login({
          username: encrypt(username),
          password: encrypt(password),
          date: new Date(),
          longitude: 0,
          latitude: 0,
        }),
        { message: '登录成功！' },
        ({ data }) => {
          this.setUserInfo({
            ...data,
            username,
            password,
            remember,
            avatarUrl: data.avatar_url,
          });
          useMainStore().setDialog({ visible: false });
        }
      );
    },
    setUserInfo(
      info: Pick<
        UserState,
        | 'username'
        | 'age'
        | 'avatarUrl'
        | 'email'
        | 'gender'
        | 'password'
        | 'tag'
        | 'remember'
        | 'token'
        | 'phone'
      >
    ) {
      this.setUsername(info.username);
      this.setPassword(info.password);
      this.setAvatarUrl(info.avatarUrl);
      this.setToken(info.token);
      this.setAge(info.age);
      this.setGender(info.gender);
      this.setTag(info.tag);
      this.setPhone(decrypt(info.phone));
      this.setRemember(info.remember);
      this.setEmail(info.email);
    },
    resetUserInfo() {
      this.setUserInfo({
        username: '',
        password: '',
        avatarUrl: '',
        token: '',
        email: '',
        gender: null,
        remember: false,
        age: '',
        phone: '',
        tag: '',
      });
    },
    /**
     * @description 退出登录
     */
    async logout() {
      const { t } = useI18n();
      const result = await loginOut({
        token: this.getToken,
        username: encrypt(this.getUserName),
      });
      resultPrompt(result, { message: t('Sign out successfully') }, () => {
        this.resetUserInfo();
        useMainStore().closeDialog();
      });
    },
  },
});
