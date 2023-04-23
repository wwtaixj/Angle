import send from './request_interceptor.js';
import { message } from 'ant-design-vue';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { cloneDeep } from 'lodash';

/**
 * getApiData
 * @param url
 * @param config
 * @returns {Promise<*>}
 */
export const getApiData = async (url, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  const res = await send.get(url, config);
  if (res.data && res.data.returnCode && res.data.returnCode.toString() !== '0') {
    message.error(res.data.errorMessage + ',错误码：' + res.data.returnCode);
  }
  return cloneDeep(res);
};

/**
 * updateApiData
 * @param url
 * @param data
 * @param config
 * @returns {Promise<void>}
 */
export const updateApiData = async (
  url,
  data,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  const res = await send.put(url, data, config);
  if (res.data && res.data.returnCode && res.data.returnCode.toString() !== '0') {
    message.error(res.data.errorMessage + ',错误码：' + res.data.returnCode);
  }
  return cloneDeep(res);
};

/**
 * deleteApiData
 * @param url
 * @param config
 * @returns {Promise<void>}
 */
export const deleteApiData = async (
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  const res = await send.delete(url, config);
  if (res.data && res.data.returnCode && res.data.returnCode.toString() !== '0') {
    message.error(res.data.errorMessage + ',错误码：' + res.data.returnCode);
  }
  return cloneDeep(res);
};

/**
 * addApiData
 * @param url
 * @param data
 * @param config
 * @returns {Promise<void>}
 */
export const postApiData = async (
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  const res = await send.post(url, data, config);
  if (res.data && res.data.returnCode && res.data.returnCode.toString() !== '0') {
    message.error(res.data.errorMessage + ',错误码：' + res.data.returnCode);
  }
  return cloneDeep(res);
};

export default {
  getApiData,
  postApiData,
  deleteApiData,
  updateApiData
};
