import type { AxiosProgressEvent, AxiosResponse, GenericAbortSignal } from 'axios';
import request from './request_interceptor';

export interface HttpOption {
  url: string;
  data?: any;
  method?: string;
  headers?: any;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
  signal?: GenericAbortSignal;
  beforeRequest?: () => void;
  afterRequest?: () => void;
}

export interface Response<T = any> {
  data: T;
  message: string | null;
  status: string;
  token?: string;
}

function http<T = any>({
  url,
  data,
  method,
  headers,
  onDownloadProgress,
  signal,
  beforeRequest,
  afterRequest
}: HttpOption) {
  const successHandler = (res: AxiosResponse<Response<T>>) => {
    if (res.data.status === '0' || typeof res.data === 'string') return res.data;

    return Promise.reject(res.data);
  };

  const failHandler = (error: Response<Error>) => {
    afterRequest?.();
    throw new Error(error?.message || 'Error');
  };

  beforeRequest?.();

  const params = Object.assign(typeof data === 'function' ? data() : data ?? {}, {});
  switch (method) {
    case 'GET':
      return request
        .get(url, { params, signal, onDownloadProgress })
        .then(successHandler, failHandler);
    case 'POST':
      return request
        .post(url, params, { headers, signal, onDownloadProgress })
        .then(successHandler, failHandler);
    case 'PUT':
      return request
        .put(url, params, { headers, signal, onDownloadProgress })
        .then(successHandler, failHandler);
    case 'DELETE':
      return request
        .delete(url, { params, signal, onDownloadProgress })
        .then(successHandler, failHandler);
    default:
      return request
        .get(url, { params, signal, onDownloadProgress })
        .then(successHandler, failHandler);
  }
}

export function get<T = any>({
  url,
  data,
  method = 'GET',
  onDownloadProgress,
  signal,
  beforeRequest,
  afterRequest
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest
  });
}
export function del<T = any>({
  url,
  data,
  method = 'DELETE',
  onDownloadProgress,
  signal,
  beforeRequest,
  afterRequest
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest
  });
}

export function post<T = any>({
  url,
  data,
  method = 'POST',
  headers,
  onDownloadProgress,
  signal,
  beforeRequest,
  afterRequest
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    headers,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest
  });
}

export function put<T = any>({
  url,
  data,
  method = 'PUT',
  headers,
  onDownloadProgress,
  signal,
  beforeRequest,
  afterRequest
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    headers,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest
  });
}

export default post;
