import { Socket, Server } from 'socket.io';

/**
 * @description 连接到客户端回调
 * @param socket
 * @param io
 */
export function connection(socket: Socket, io: Server) {
  const { token, username } = socket.handshake.headers;
  console.log(username + '客户已连接');

  socket.on('admin', (msg) => receive(msg, io));
  socket.on('disconnect', disconnect);
}
/**
 * @description 收到客户端消息
 * @param msg
 * @param io
 */
export function receive(msg: any, io: Server) {
  const { username } = msg;
  console.log('收到来自客户端的消息: ' + msg);
  io.emit(username, msg); // 将消息发送给所有客户端
}
/**
 * @description 断开客户端连接
 */
export function disconnect() {
  console.log('客户端断开连接');
}
