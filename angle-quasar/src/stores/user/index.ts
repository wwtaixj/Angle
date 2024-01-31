import { defineStore } from 'pinia';
import { useStore } from '@/stores';
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
//import { useChatStore } from '@/stores/chat';
import { getFriends } from '@/axios';
import { useRoute } from '@/router';
import { Friend } from '../typings/user';
import { $Window } from '@/types/quasar';
import {
  getNavLanguage,
  lStorage,
  isString,
  isBoolean,
  resultPrompt,
  encrypt,
  decrypt,
  isNumber,
  isObject,
  isArray,
} from '@/utils';

interface UserState {
  userId: string;
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
  description: string;
  email: string;
  loginDialogType: LoginDialogTypeEnum;
  verCodeTimer: number;
  friends: Friend[];
  friendActive?: Friend;
  loginHistory: {
    username: string;
    password: string;
  }[];
  automaticLogin: boolean;
  serviceAddress: string;
}
const { VITE_GLOB_API_URL } = import.meta.env;
export function getLocalState(): UserState {
  const remember = lStorage.get<UserState['remember']>('REMEMBER');
  const automaticLogin =
    lStorage.get<UserState['automaticLogin']>('AUTOMATIC_LOGIN');
  const loginHistory = lStorage.get<UserState['loginHistory']>('LOGIN_HISTORY');
  return {
    locale: LOCALE.ZH_CN, // default locale
    theme: false, // default theme
    avatarUrl: 'public\\icons\\chatDefIcon.png',
    token: lStorage.get<UserState['token']>('TOKEN') || '',
    loginState: LoginStateEnum.LOGIN,
    verCode: '',
    username: lStorage.get<UserState['username']>('USERNAME') || '',
    phone: '',
    location: { longitude: 0, latitude: 0 },
    age: void 0,
    gender: null,
    tag: '',
    password: lStorage.get<UserState['password']>('PASSWORD') || '',
    remember: isBoolean(remember) ? remember : false,
    description: '',
    email: '',
    loginDialogType: LoginDialogTypeEnum.LOGIN,
    verCodeTimer: 0,
    userId: lStorage.get<UserState['userId']>('USER_ID') || '',
    friends: [],
    friendActive: void 0,
    loginHistory:
      isArray(loginHistory) && !!loginHistory.length ? loginHistory : [],
    automaticLogin: isBoolean(automaticLogin) ? automaticLogin : false,
    serviceAddress:
      lStorage.get<UserState['serviceAddress']>('SERVICE_ADDRESS') ||
      VITE_GLOB_API_URL,
  };
}
export const useUserStore = defineStore('user', {
  state: (): UserState => getLocalState(),
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
      if (gender !== null) return gender;
      return lStorage.get<UserState['gender']>('GENDER');
    },
    getTag(state) {
      const tag = state.tag;
      if (tag) return tag;
      return lStorage.get<UserState['tag']>('TAG');
    },
    getPassword(state) {
      const password = state.password;
      if (password) return password;
      return lStorage.get<UserState['password']>('PASSWORD');
    },
    getLocation(state) {
      const location = state.location;
      if (location.longitude !== 0) return location;
      return lStorage.get<UserState['location']>('LOCATION');
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
    getFriends(state) {
      const friends = state.friends;
      if (friends.length) return friends;
      return lStorage.get<UserState['friends']>('FRIENDS');
    },
    getFriendActive(state) {
      const active = state.friendActive;
      if (active) return active;
      return lStorage.get<Friend>('FRIEND_ACTIVE');
    },
    getServiceAddress(state) {
      const address = state.serviceAddress;
      if (address) return address;
      return lStorage.get<UserState['serviceAddress']>('SERVICE_ADDRESS');
    },
  },
  actions: {
    setServiceAddress(address: string) {
      if (!address) return;
      this.serviceAddress = address;
      lStorage.set('SERVICE_ADDRESS', address);
      useSocketStore().initSocket();
    },
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
      this.setToken(this.getToken);
      this.setUsername(this.getUserName);
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
      if (gender === null) return;
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
    setUserId(userId?: string) {
      if (!isNumber(userId)) return;
      this.userId = userId;
      return lStorage.set('USER_ID', userId);
    },
    async setFriends() {
      try {
        const { data } = await getFriends();
        if (!data.length) return;
        this.friends = data.map((i) => ({ ...i, chatId: i.id }));
        return lStorage.set('FRIENDS', data);
      } catch (e: any) {
        throw new Error(e.message);
      }
    },
    setAutomaticLogin(automatic: boolean) {
      this.automaticLogin = automatic;
      lStorage.set('AUTOMATIC_LOGIN', automatic);
    },
    addLoginHistory(username: string, password: string) {
      if (
        !isString(username) ||
        this.loginHistory.some((i) => i.username === username)
      )
        return;
      this.loginHistory.splice(0, 0, {
        username,
        password,
      });
      lStorage.set('LOGIN_HISTORY', this.loginHistory);
    },
    deleteLoginHistory(index: number) {
      if (!isNumber(index)) return;
      this.loginHistory.splice(index, 1);
      lStorage.set('LOGIN_HISTORY', this.loginHistory);
    },
    /**
     * @description 设置选中的好友
     * @param active
     * @returns
     */
    setFriendActive(active: Friend) {
      if (!isObject(active)) return;
      this.friendActive = active;
      lStorage.set('FRIEND_ACTIVE', active);
    },
    setLoginDialogType(type: LoginDialogTypeEnum) {
      this.loginDialogType = type;
    },
    /**
     * @description 登录
     */
    async login(isRefresh = false) {
      const { username, password } = this.$state;
      const hasUsername = encrypt(username);
      const { status, data } = await login({
        username: hasUsername,
        password: encrypt(password),
        longitude: 0,
        latitude: 0,
      });
      if (status === '0') {
        this.setUserInfo({
          ...data,
          username,
          password,
          userId: data.id,
        });
        if (isRefresh) {
          return status;
        }
        // 设置用户列表
        await this.setFriends();
        useDBStore().initDatabase();
        // 连接Socket服务端
        useSocketStore().initSocket();
        await useRoute().push('/home');
        const { electron } = window as unknown as $Window;
        // 向主进程发送 change-window-size 事件，传递新的窗口大小参数
        electron.ipcRenderer.send('change-window-size', {
          width: 800,
          height: 680,
          resizable: true,
        });
        // 是否记住密码
        this.addLoginHistory(username, this.getRemember ? password : '');
      }
      return status;
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
        age: void 0,
        phone: '',
        tag: '',
        userId: '',
      });
    },
    /**
     * @description 退出登录
     */
    async logout() {
      //const { t } = useI18n();
      const { electron } = window as unknown as $Window;
      const result = await loginOut({
        token: this.getToken,
        username: encrypt(this.getUserName),
      });
      resultPrompt(result, false, async () => {
        this.resetUserInfo();
        useMainStore().closeDialog();
        await useRoute().push('/login');
        electron.ipcRenderer.send('change-window-size', {
          width: 430,
          height: 500,
          resizable: false,
        });
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
      try {
        const result = await sendVerCode({ email });
        resultPrompt(result, { message: '验证码已发送' }, () => {
          status = true;
        });
      } catch (err) {
        status = false;
      } finally {
        return status;
      }
    },
  },
});
export function useUserStoreWithout() {
  return useUserStore(useStore());
}
