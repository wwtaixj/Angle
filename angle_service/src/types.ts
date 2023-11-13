import type { FetchFn } from 'chatgpt';
import { Response, Request } from 'express';
import * as core from 'express-serve-static-core';
import { IncomingHttpHeaders } from 'http';

export type GlobalResponse<Res> = Response<ResBody<Res>>;
export type GlobalRequest<Req> = Request<core.ParamsDictionary, any, Req>;

export interface ResBody<T> {
  status: string;
  message: string;
  data?: T;
}

export interface RequestProps {
  prompt: string;
  options?: ChatContext;
  systemMessage: string;
}

export interface ChatContext {
  conversationId?: string;
  parentMessageId?: string;
}

export interface ChatGPTUnofficialProxyAPIOptions {
  accessToken: string;
  apiReverseProxyUrl?: string;
  model?: string;
  debug?: boolean;
  headers?: Record<string, string>;
  fetch?: FetchFn;
}

export interface ModelConfig {
  apiModel?: ApiModel;
  reverseProxy?: string;
  timeoutMs?: number;
  socksProxy?: string;
  httpsProxy?: string;
  balance?: string;
}

export type ApiModel = 'ChatGPTAPI' | 'ChatGPTUnofficialProxyAPI' | undefined;
