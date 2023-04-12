import send from './http.js';
import { message } from 'ant-design-vue';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { cloneDeep } from 'lodash';

class HttpRequest {
  /**
   * getApiData
   * @param url
   * @param config
   * @returns {Promise<*>}
   */
  async getApiData(url, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    const res = await send.get(url, config);
    if (res.data && res.data.returnCode && res.data.returnCode.toString() !== '0') {
      message.error(res.data.errorMessage + ',错误码：' + res.data.returnCode);
    }
    return cloneDeep(res);
  }

  /**
   * updateApiData
   * @param url
   * @param data
   * @param config
   * @returns {Promise<void>}
   */
  async updateApiData(url, data, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    const res = await send.put(url, data, config);
    if (res.data && res.data.returnCode && res.data.returnCode.toString() !== '0') {
      message.error(res.data.errorMessage + ',错误码：' + res.data.returnCode);
    }
    return cloneDeep(res);
  }

  /**
   * deleteApiData
   * @param url
   * @param config
   * @returns {Promise<void>}
   */
  async deleteApiData(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    const res = await send.delete(url, config);
    if (res.data && res.data.returnCode && res.data.returnCode.toString() !== '0') {
      message.error(res.data.errorMessage + ',错误码：' + res.data.returnCode);
    }
    return cloneDeep(res);
  }

  /**
   * addApiData
   * @param url
   * @param data
   * @param config
   * @returns {Promise<void>}
   */
  async postApiData(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    const res = await send.post(url, data, config);
    if (res.data && res.data.returnCode && res.data.returnCode.toString() !== '0') {
      message.error(res.data.errorMessage + ',错误码：' + res.data.returnCode);
    }
    return cloneDeep(res);
  }
}
export default new HttpRequest();
