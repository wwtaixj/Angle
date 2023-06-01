import type { AxiosProgressEvent, GenericAbortSignal } from 'axios';
import { post, put } from './request';
import { useSettingStore } from '@renderer/store';
import request_url from './request_url';

export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal
) {
  return post<T>({
    url: request_url.chatChat,
    data: { prompt, options },
    signal
  });
}

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: request_url.chatconfig
  });
}

export function fetchChatAPIProcess<T = any>(params: {
  prompt: string;
  options?: { conversationId?: string; parentMessageId?: string };
  signal?: GenericAbortSignal;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
}) {
  const settingStore = useSettingStore();

  return post<T>({
    url: request_url.chatProcess,
    data: {
      prompt: params.prompt,
      options: params.options,
      systemMessage: settingStore.systemMessage
    },
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress
  });
}

export function fetchVerify<T>(token: string) {
  return post<T>({
    url: request_url.chatVerify,
    data: { token }
  });
}

export function login<T>(data: { token: any }) {
  return post<T>({
    url: request_url.login,
    data
  });
}
export function updateUser<T>(data: any) {
  return put<T>({
    url: request_url.changeInfo,
    data
  });
}

export function updatePssword<T>(data: any) {
  return put<T>({
    url: request_url.changePssword,
    data
  });
}

export function resetPssword<T>(data: any) {
  return put<T>({
    url: request_url.resetPssword,
    data
  });
}

export function register<T>(data: any) {
  return post<T>({
    url: request_url.register,
    data
  });
}
