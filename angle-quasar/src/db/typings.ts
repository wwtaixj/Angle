export interface ChatHistoryTable {
  senderId: number; // 发送者ID
  receiverId: number; // 接收者ID
  message: string; // 消息
  timestamp: Date; // 发送时间
  type: number; // 消息类型
  satus: number; // 消息状态
}
