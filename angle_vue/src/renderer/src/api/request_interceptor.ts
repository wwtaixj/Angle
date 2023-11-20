import axios, { type AxiosResponse } from 'axios';
import { XMessage } from '@renderer/utils/custom';
import { useUserStore, useAuthStore } from '@renderer/store';
import { encrypt } from '@renderer/utils/cryptoJs';
import request_url from './request_url';
import { isObject } from '@renderer/utils/is';
const { VITE_APP_API_BASE_URL } = import.meta.env;

// 创建axios实例
const instance = axios.create({
  timeout: 1000 * 60 * 5,
  baseURL: VITE_APP_API_BASE_URL
});

// 添加请求拦截器
instance.interceptors.request.use(
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
// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const status = isObject(response.data) && response.data.status ? response.data.status : '0';
    if (status !== '0') {
      XMessage.error(response.data.message);
    }
    return response;
  },
  (error) => {
    if (error.toString().includes('500') || error.toString().includes('502')) {
      XMessage.error('服务未启动!');
    } else {
      XMessage.error('服务出错！');
    }
    return Promise.reject(error);
  }
);

export default instance;
