import type { ChatMessage } from 'chatgpt';

export interface SendVerificationCodeParams {
  email: string;
}
export interface RegisterParams {
  username: string;
  password: string;
  email: string;
  verCode: string;
}
export interface RequestOptions {
  message: string;
  lastContext?: { conversationId?: string; parentMessageId?: string };
  process?: (chat: ChatMessage) => void;
  systemMessage?: string;
}
export interface LogoutParams {
  username: string;
  token: string;
}
export interface LoginParams {
  username: string;
  password: string;
  longitude: number;
  latitude: number;
  date: string;
}

export interface LoginResponse {
  id: number;
  token: string;
  phone: string;
  avatar_url: string;
  age: string;
  tag: string;
  gender: string;
  email: string;
}
