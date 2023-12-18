import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { useUserStore } from '@/stores/user';
import { isObject, encrypt, notify } from '@/utils';
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
const api = axios.create({
  timeout: 1000 * 60 * 5,
  baseURL: 'http://loose.net.cn:9310',
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
api.interceptors.response.use(
  (response: AxiosResponse) => {
    const status =
      isObject(response.data) && response.data.status
        ? response.data.status
        : '0';
    if (status !== '0') {
      notify({
        message: response.data.message,
        type: 'negative',
      });
    }
    return response;
  },
  (error) => {
    let message = '';
    if (error.toString().includes('500') || error.toString().includes('502')) {
      message = '服务未启动!';
    } else {
      message = '服务出错!';
    }
    notify({
      message,
      type: 'negative',
    });
    return Promise.reject(error);
  }
);

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
