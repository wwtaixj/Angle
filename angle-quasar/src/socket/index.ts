import { io } from 'socket.io-client';
import { CreateSoket } from './types';

export function createSocket({ url, token, username, userId }: CreateSoket) {
  return io(url, {
    path: '/socket.io',
    extraHeaders: {
      token,
      username,
      userId,
    },
  });
}

export * from './types';
