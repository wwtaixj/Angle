import { defineStore } from 'pinia';
//import { isNumber } from '@/utils/is';
import { createSocket, TransmissionBody } from '@/socket';
import { Socket } from 'socket.io-client';
import { useUserStore } from '@/stores/user';
import { useDBStore } from '@/stores/database';
import { useChatStore } from '@/stores/chat';
import { MessageSendStatus, MessageSendType } from '@/enums/chat';
import { $Window } from '@/types/env';

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
      this.socketOnServer(userId);
      this.updateApp();
    },
    socketOn<T = TransmissionBody>(
      userId: string,
      callback: (data: T) => void
    ) {
      if (!this.socketIO) this.initSocket();
      this.socketIO?.on(userId, (data: T) => {
        callback(data);
      });
    },
    socketEmit<T = TransmissionBody>(userId: string, data: T) {
      if (!this.socketIO) this.initSocket();
      this.socketIO?.emit(userId, data);
    },
    /**
     * @description 监听服务器消息
     */
    socketOnServer(userId: string) {
      this.socketOn(userId, (data) => {
        // 不是系统消息时, 接收消息并存储到数据库
        if (data.type !== MessageSendType.SYSTEM_MESSAGE) {
          const chatStore = useChatStore();
          chatStore.setChatActiveMssage({
            message: [data.message],
            avatarUrl: chatStore.getChatActive?.avatarUrl as string,
            status: MessageSendStatus.CLIENT_RECEIVED,
            sent: false,
          });
          useDBStore().addChatHistory(data.senderId, data);
        }
      });
    },
    /**
     * @description 监听应用更新推送
     */
    updateApp() {
      this.socketOn<null>('updateAvailable', () => {
        const { electron } = window as unknown as $Window;
        if (!electron) return;
        electron.ipcRenderer.send('update-available');
      });
    },
  },
});
