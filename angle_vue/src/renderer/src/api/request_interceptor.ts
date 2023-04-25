import axios, { type AxiosResponse } from 'axios';
import { XMessage } from '@renderer/utils/custom';
import { useUserStore } from '@renderer/store';
import { encrypt } from '@renderer/utils/cryptoJs';
import request_url from './request_url';
import { isObject } from '@renderer/utils/is';

// 创建axios实例
const instance = axios.create({
	timeout: 10000 * 12
});

// 添加请求拦截器
instance.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么
		// 添加请求前添加token
		const userStore = useUserStore();
		if (config.url !== request_url.login) {
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
instance.interceptors.response.use(
	(response: AxiosResponse) => {
		const return_code =
			isObject(response.data) && response.data.return_code ? response.data.return_code : null;
		if (return_code === '0') {
			XMessage.error(response.data.message);
		}
		// if (response.data?.status === 'Unauthorized') {
		//   setTimeout(() => {
		//     window.location.href = '/';
		//   }, 2000);
		// }
		return response;
	},
	(error) => {
		if (error.toString().includes('500') || error.toString().includes('502')) {
			XMessage.error('服务未启动!');
		} else {
			XMessage.error('服务出错，待解决！');
		}
		return Promise.reject(error);
	}
);

export default instance;
