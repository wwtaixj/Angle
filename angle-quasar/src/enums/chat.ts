// 0: 系统消息, 1: 文本消息, 2: 图片消息, 3: 语音消息, 4: 视频消息
export enum MessageSendType {
  SYSTEM_MESSAGE = 0,
  TEXT_MESSAGE = 1,
  PICTURE_MESSAGE = 2,
  VOICE_MESSAGE = 3,
  VIDEO_MESSAGE = 4,
}
// 0: 已发送, 1: 服务器已经接收,  2：客户端已经接收, 3: 对方已读
export enum MessageSendStatus {
  HAVE_SEND = '0',
  SERVER_RECEIVED = '1',
  CLIENT_RECEIVED = '2',
  READ = '3',
}
