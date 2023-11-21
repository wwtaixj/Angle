import { defineStore } from 'pinia';
import { LOCALE } from '@/i18n';
import { setLocale } from '@/boot/i18n';
import { LoginStateEnum } from '@/enums/main';
import { Location } from '../typings/main';
import { Gender } from '@/axios/typings';
import { Dark } from 'quasar';
import { login, loginOut, register, sendVerCode } from '@/axios';
import { useMainStore } from '../main';
import { useI18n } from '@/boot/i18n';
import { LoginDialogTypeEnum } from '@/enums/login';
import { Params } from '@/axios/typings';
import { useSocketStore } from '@/stores/socket';
import { useDBStore } from '../database';
import { useChatStore } from '@/stores/chat';
import {
  getNavLanguage,
  lStorage,
  sStorage,
  isString,
  isBoolean,
  resultPrompt,
  encrypt,
  decrypt,
  isNumber,
} from '@/utils';

interface UserState {
  userId: number;
  locale: LOCALE;
  theme: boolean;
  location: Location;
  avatarUrl: string;
  token: string;
  loginState: LoginStateEnum;
  verCode: string;
  username: string;
  password: string;
  remember: boolean;
  phone: string;
  age?: number;
  gender: Gender;
  tag: string;
  newPassword: string;
  againNewPassword: string;
  description: string;
  email: string;
  loginDialogType: LoginDialogTypeEnum;
  verCodeTimer: number;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    locale: LOCALE.ZH_CN, // default locale
    theme: false, // default theme
    avatarUrl: 'public\\icons\\default_icon.png',
    token: '',
    loginState: LoginStateEnum.LOGIN,
    verCode: '',
    username: '',
    phone: '',
    location: { longitude: 0, latitude: 0 },
    age: void 0,
    gender: null,
    tag: '',
    password: '',
    remember: false,
    description: '',
    email: '',
    newPassword: '', // 新密码
    againNewPassword: '',
    loginDialogType: LoginDialogTypeEnum.LOGIN,
    verCodeTimer: 0,
    userId: 0,
  }),
  getters: {
    getUserId(state) {
      const userId = state.userId;
      if (userId) return userId;
      return lStorage.get<UserState['userId']>('USER_ID');
    },
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
      let locale = lStorage.get<LOCALE>('LOCALE');
      if (!locale) locale = getNavLanguage() as LOCALE;
      this.setLocales(locale);
      const theme = lStorage.get<boolean>('THEME');
      this.setTheme(theme);
      const avatarUrl = lStorage.get<string>('AVATAR_URL');
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
    setAge(age: number) {
      if (!isString(age)) return;
      this.age = age;
      lStorage.set('AGE', age);
    },
    setGender(gender: Gender) {
      if (!isNumber(gender) && gender !== null) return;
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
    setUserId(userId?: number) {
      if (!isNumber(userId)) return;
      this.userId = userId;
      return lStorage.set('USER_ID', userId);
    },
    setLoginDialogType(type: LoginDialogTypeEnum) {
      this.loginDialogType = type;
    },
    /**
     * @description 登录
     */
    async login() {
      const { username, password, remember } = this.$state;
      const hasUsername = encrypt(username);
      resultPrompt(
        await login({
          username: hasUsername,
          password: encrypt(password),
          longitude: 0,
          latitude: 0,
        }),
        { message: '登录成功！' },
        async ({ data }) => {
          this.setUserInfo({
            ...data,
            username,
            password,
            remember,
            userId: data.id,
          });
          // 设置用户列表
          useChatStore()
            .setChatList()
            .then(() => {
              useDBStore().initDatabase();
              // 连接Socket服务端
              useSocketStore().initSocket();
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
        | 'userId'
      >
    ) {
      this.setUsername(info.username);
      this.setPassword(info.password);
      this.setAvatarUrl(info.avatarUrl);
      this.setToken(info.token);
      this.setAge(info.age as number);
      this.setGender(info.gender);
      this.setTag(info.tag);
      this.setPhone(decrypt(info.phone));
      this.setRemember(info.remember);
      this.setEmail(info.email);
      this.setUserId(info.userId);
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
        age: void 0,
        phone: '',
        tag: '',
        userId: 0,
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
      resultPrompt(result, { message: t('SignOutSuccessfully') }, () => {
        this.resetUserInfo();
        useMainStore().closeDialog();
      });
    },
    /**
     * @description 注册
     */
    async register(data: Params.register) {
      const { t } = useI18n();
      const result = await register(data);
      resultPrompt(
        result,
        { message: t('login.SuccessfulRegistration') },
        () => {
          useMainStore().closeDialog();
        }
      );
    },
    /**
     * @description 发送验证码
     */
    async sendVerCode(email: string) {
      //const { t } = useI18n();
      let status = false;
      const result = await sendVerCode({ email });
      resultPrompt(result, { message: '验证码已发送' }, () => {
        status = true;
      });
      return status;
    },
  },
});
