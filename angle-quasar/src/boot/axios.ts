import { boot } from 'quasar/wrappers';
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { useUserStore } from '@/stores/user';
import { isObject, encrypt, notify, lStorage } from '@/utils';
import Url from '@/axios/url';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const { VITE_GLOB_API_URL } = import.meta.env;
const api = axios.create({
  timeout: 1000 * 60 * 5,
  baseURL: lStorage.get('SERVICE_ADDRESS') || VITE_GLOB_API_URL, //localhost
});

api.interceptors.request.use(
  (config) => {
    // 添加请求前添加token
    const userStore = useUserStore();
    if (config.url !== Url.login) {
      config.headers['token'] = userStore.getToken;
      config.headers['username'] = encrypt(userStore.getUserName);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

// 响应拦截器
// 初始化登录尝试次数为0
let loginAttempts = 0;
let failedRequest: InternalAxiosRequestConfig;
api.interceptors.response.use(
  async (response: AxiosResponse) => {
    const status =
      isObject(response.data) && response.data.status
        ? response.data.status
        : '0';

    if (status !== '0' && status !== '1002') {
      notify({
        message: response.data.message,
        type: 'negative',
      });
    }
    //登录超时
    if (status === '1002') {
      failedRequest = response.config; // 保存失败的请求
      await loginBack();
    }
    return response;
  },
  (error) => {
    const { config } = error;
    if (config) {
      if (config.url === Url.login) {
        notify({
          message: '登录失败!',
          type: 'negative',
        });
      }
    }
    return Promise.reject(error);
  }
);
async function loginBack() {
  if (loginAttempts >= 5) return;
  const userStore = useUserStore();
  const status = await userStore.login(true); // 尝试登录
  if (status === '0') {
    await api.request(failedRequest);
    loginAttempts = 0;
  } else {
    loginAttempts++;
    loginBack();
  }
}
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
