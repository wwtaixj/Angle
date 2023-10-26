/*
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-12 11:08:01
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-26 14:17:25
 * @FilePath: \angle-quasar\src\boot\axios.ts
 */
import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

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
    // 在发送请求之前做些什么
    // 添加请求前添加token
    const userStore = useUserStore();
    const authStore = useAuthStore();
    if (config.url !== request_url.login) {
      config.headers['token'] = authStore.getToken;
      config.headers['username'] = encrypt(userStore.getUserName);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
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
