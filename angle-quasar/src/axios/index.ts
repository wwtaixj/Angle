import type { AxiosProgressEvent, GenericAbortSignal } from 'axios';
import { post, put } from './request';
import { useChatGptStore } from '@/stores/chatGpt';
import request_url from './url';
import { Params, Result } from './typings';

export function fetchChatAPI<T = unknown>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal
) {
  return post<T>({
    url: request_url.chatChat,
    data: { prompt, options },
    signal,
  });
}

export function fetchChatConfig<T = unknown>() {
  return post<T>({
    url: request_url.chatconfig,
  });
}

export function fetchChatAPIProcess<T = unknown>(params: {
  prompt: string;
  options?: { conversationId?: string; parentMessageId?: string };
  signal?: GenericAbortSignal;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
}) {
  const chatGptStore = useChatGptStore();

  return post<T>({
    url: request_url.chatProcess,
    data: {
      prompt: params.prompt,
      options: params.options,
      systemMessage: chatGptStore.systemMessage,
    },
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  });
}

export function fetchVerify<T>(token: string) {
  return post<T>({
    url: request_url.chatVerify,
    data: { token },
  });
}

export function login(data: Params.Login) {
  return post<Result.Login>({
    url: request_url.login,
    data,
  });
}
export function loginOut(data: Params.LoginOut) {
  return post<undefined>({
    url: request_url.logout,
    data,
  });
}
export function updateUser(data: Params.UpdateUser) {
  return put<undefined>({
    url: request_url.changeInfo,
    data,
  });
}

export function updatePssword(data: Params.updatePssword) {
  return put<undefined>({
    url: request_url.changePssword,
    data,
  });
}

export function register(data: Params.register) {
  return post<undefined>({
    url: request_url.register,
    data,
  });
}
