export type MessageSendType = 0 | 1 | 2 | 3 | 4; // 0: 系统消息, 1: 文本消息, 2: 图片消息, 3: 语音消息, 4: 视频消息
export type MessageSendStatus = 0 | 1 | 2; // 0: 未发送, 1: 已发送, 2: 已读
export interface ChatHistoryTable {
  senderId: number; // 发送者ID
  receiverId: number; // 接收者ID
  message: string; // 消息
  timestamp: number; // 发送时间
  type: MessageSendType; // 消息类型
  satus: number; // 消息状态
}
