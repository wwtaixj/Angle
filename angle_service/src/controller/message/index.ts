import { Socket, Server } from 'socket.io';

export function connection(socket: Socket, io: Server) {
  console.log('有一个客户端连接');

  socket.on('admin', (msg) => receive(msg, io));
  socket.on('disconnect', disconnect);
}
export function receive(msg: any, io: Server) {
  console.log('收到来自客户端的消息: ' + msg);
  io.emit('admin', msg); // 将消息发送给所有客户端
}

export function disconnect() {
  console.log('客户端断开连接');
}
