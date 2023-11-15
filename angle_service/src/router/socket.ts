// routes/socket.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { connection } from '@/controller/message';

const router = express.Router();

export default (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });
  // 在这里定义和处理 Socket.io 相关的路由逻辑
  io.on('connection', (socket) => connection(socket, io));

  return router;
};
