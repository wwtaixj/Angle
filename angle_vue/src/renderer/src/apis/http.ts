import axios from 'axios';
import { XMessage } from '@renderer/assets/public';
import { useUserStore } from '@renderer/store/userStore';
import { encrypt } from '@renderer/assets/public/cryptoJs';
import request_url from './request_url';

const userStore = useUserStore();
// 创建axios实例
const instance = axios.create({
  timeout: 10000 * 12
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    if (config.url !== request_url.login) {
      config.headers['token'] = userStore.getToken;
      config.headers['username'] = encrypt(userStore.getUserName);
    }
    // 在发送请求之前做些什么
    // 添加请求前添加token
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// 响应拦截器
instance.interceptors.response.use(
  function (data) {
    if (data.data.return_code !== '0') {
      XMessage.error(data.data.message);
    }
    return data;
  },
  function (data) {
    if (data.toString().includes('500') || data.toString().includes('502')) {
      XMessage.error('服务未启动!');
    } else {
      XMessage.error('服务出错，待解决！');
    }
    return data;
  }
);

export default instance;
