import type { ChatMessage } from 'chatgpt';

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
  token: string;
  phone: string;
  avatar_url: string;
  age: string;
  tag: string;
  gender: string;
  email: string;
}
