import axios from 'axios';
import { message } from 'ant-design-vue';
// 创建axios实例
const instance = axios.create({
  timeout: 10000 * 12
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 添加请求前添加token
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (data) {
    const returnMsg = {
      error: '宝儿，我错了!',
      401: '服务器限制访问!'
    };
    const returnCode = data.data.status.toString();
    returnMsg[returnCode] !== undefined && message.warning(returnMsg[returnCode]);
    return data;
  },
  function (data) {
    if (data.toString().includes('500') || data.toString().includes('502')) {
      message.error('不好意思宝儿，服务未启动哦!');
    } else {
      message.error('我出现问题了，待主人解决哦！');
    }
    return data;
  }
);

export default instance;
