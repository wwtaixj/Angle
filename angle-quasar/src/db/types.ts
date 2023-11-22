import { MessageSendStatus, MessageSendType } from '@/enums/chat';
export interface ChatHistoryTable {
  messageId: string; // 消息ID
  senderId: number; // 发送者ID
  receiverId: number; // 接收者ID
  message: string; // 消息
  timestamp: number; // 发送时间
  type: MessageSendType; // 消息类型
  status: MessageSendStatus; // 消息状态
}
