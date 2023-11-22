import { Socket, Server } from 'socket.io';
import { TransmissionBody } from '../types';
import { getAllUserId } from '@/db';
let userIds = [];
getAllUserId().then((result) => {
  userIds = result[0].map((i) => i.id);
});

/**
 * @description 连接到客户端回调
 * @param socket
 * @param io
 */
export function connection(socket: Socket, io: Server) {
  const { token, username, userid } = socket.handshake.headers;
  if (!token || !username || !userid) {
    socket.disconnect();
    return;
  }
  for (let id of userIds) {
    socket.on(id, (msg) => receive(msg, io));
  }
  socket.on('disconnect', disconnect);
}
/**
 * @description 收到客户端消息
 * @param msg
 * @param io
 */
export function receive(msg: TransmissionBody, io: Server) {
  const { senderId, receiverId, message, type } = msg;
  const messageMap = new Map();
  // 将消息发送成功回调给发送者客户端
  if (type !== 0) {
    io.emit<string>(senderId, {
      type: 0,
      status: 1,
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
