import { Response, Request } from 'express';
import * as core from 'express-serve-static-core';
import type { ChatMessage } from 'chatgpt';
import OpenAI from 'openai';
export type Model =
  | 'gpt-3.5-turbo'
  | 'gpt-4'
  | 'gpt-4-vision-preview'
  | 'dall-e-3'
  | 'gpt-4-1106-preview';
export type MessageType = 'text' | 'image' | 'tools' | 'logprobs';
export type GlobalResponse<Res> = Response<ResBody<Res>>;
export type GlobalRequest<Req> = Request<core.ParamsDictionary, any, Req>;

export interface ResBody<T> {
  status: string;
  message: string;
  data?: T;
  url?: string | string[];
}
export interface ChatMessageV1 extends Partial<Omit<ChatMessage, 'role'>> {
  role?: OpenAI.ChatCompletionChunk.Choice.Delta['role'];
  url?: string;
}
export interface ChatUploadFileOptions
  extends Partial<OpenAI.FileCreateParams> {
  path?: string;
}

export interface ChatRobotRequest {
  prompt: string;
  options?: ChatContext;
  systemMessage: string;
  model: Model;
  type: MessageType;
}

export interface ChatContext {
  conversationId?: string;
  parentMessageId?: string;
  threadId?: string;
  fileIds?: string[];
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
