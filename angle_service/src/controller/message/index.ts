import { Socket, Server } from 'socket.io';
import { TransmissionBody } from '../types';

/**
 * @description 连接到客户端回调
 * @param socket
 * @param io
 */
export function connection(socket: Socket, io: Server) {
  const { token, username, userid } = socket.handshake.headers;
  console.log(userid + '客户端已连接');

  socket.on(userid as string, (msg) => receive(msg, io));
  socket.on('disconnect', disconnect);
}
/**
 * @description 收到客户端消息
 * @param msg
 * @param io
 */
export function receive(msg: TransmissionBody, io: Server) {
  const { senderId, receiverId, message, type } = msg;
  console.log('收到来自客户端的消息: ' + msg);
  // 将消息发送成功回调给发送者客户端
  if (type !== 0) {
    io.emit(senderId, {
      type: '0',
    });
  }
  // 将消息发送给接收者客户端
  io.emit(receiverId, msg);
}
/**
 * @description 断开客户端连接
 */
export function disconnect() {
  console.log('客户端断开连接');
}
