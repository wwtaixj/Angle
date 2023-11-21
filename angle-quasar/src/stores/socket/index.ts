import { defineStore } from 'pinia';
//import { isNumber } from '@/utils/is';
import { createSocket, TransmissionBody } from '@/socket';
import { Socket } from 'socket.io-client';
import { useUserStore } from '@/stores/user';
import { useDBStore } from '@/stores/database';

const { VITE_GLOB_SOCKET_URL } = import.meta.env;

interface SocketState {
  socketIO?: Socket;
}

export const useSocketStore = defineStore('socket', {
  state: (): SocketState => ({
    socketIO: void 0,
  }),
  actions: {
    initSocket() {
      const userStore = useUserStore();
      const userId = String(userStore.getUserId);
      this.socketIO = createSocket({
        url: VITE_GLOB_SOCKET_URL,
        username: userStore.getUserName,
        token: userStore.getToken,
        userId: userId,
      });
      this.socketOn(userId, (data) => {
        useDBStore().addChatHistory(data, data.senderId);
        console.log('Received message from server:');
        console.log(data);
      });
      this.updateApp();
    },
    socketOn(userId: string, callback: (data: TransmissionBody) => void) {
      if (!this.socketIO) this.initSocket();
      this.socketIO?.on(userId, (data: TransmissionBody) => {
        callback(data);
      });
    },
    socketEmit(userId: string, data: TransmissionBody) {
      if (!this.socketIO) this.initSocket();
      this.socketIO?.emit(userId, data);
    },
    /**
     * @description 监听更新
     */
    updateApp() {
      this.socketOn('updateAvailable', (data) => {
        console.log(data);
      });
    },
  },
});
