import { ChatMessageV1, Model, MessageType, ChatContext } from '@/types';
//import type { ChatMessage } from 'chatgpt';
import OpenAI from 'openai';

export type BodyStatus = 0 | 1 | 2 | 3; // 0: 已发送, 1: 服务器已经接收,  2：对方客户已经接收, 3: 已读
export type BodyType = 0 | 1 | 2 | 3 | 4; // 0: 系统消息, 1: 文本消息, 2: 图片消息, 3: 语音消息, 4: 视频消息

export interface TransmissionBody {
  senderId: string; // 发送者ID
  receiverId: string; // 接收者ID
  message: string; // 消息
  timestamp: number; // 发送时间
  type: BodyType; // 消息类型
  status: BodyStatus; // 消息状态
}

export interface SendVerificationCodeParams {
  email: string;
}
export interface RegisterParams {
  username: string;
  password: string;
  email: string;
  verCode: string;
  referralCode: string;
}
export interface sendOptions {
  message: string;
  lastContext?: ChatContext;
  process?: (chat: ChatMessageV1) => void;
  systemMessage?: string;
  model?: Model;
  type: MessageType;
  assistantsName?: string;
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
  id: string;
  token: string;
  phone: string;
  avatarUrl: string;
  age: number;
  tag: string;
  gender: string;
  email: string;
}
