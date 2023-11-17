import { defineStore } from 'pinia';
import { io, Socket } from 'socket.io-client';
import { sStorage } from '@/utils/webStorage';
import { isNumber, isObject } from '@/utils/is';
import { Chat, Message } from '../typings/chat';
const { VITE_GLOB_SOCKET_URL } = import.meta.env;

interface ChatState {
  chatList: Chat[];
  chatActive?: {
    id: number;
    message: Message[];
  };
  socket: Socket | null;
}

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    chatList: [
      {
        id: 1,
        username: 'Razvan Stoenescu',
        avatarUrl: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
        caption: "I'm working on Quasar!",
        time: '15:00',
        sent: true,
        deleted: true,
      },
      {
        id: 2,
        username: 'Dan Popescu',
        avatarUrl: 'https://cdn.quasar.dev/team/dan_popescu.jpg',
        caption: "I'm working on Quasar!",
        time: '16:00',
        sent: true,
      },
    ],
    chatActive: void 0,
    socket: null,
  }),
  getters: {
    getChatList(state) {
      const chatList = state.chatList;
      if (chatList.length) return chatList;
      return sStorage.get('CHAT_LIST') as Chat[];
    },
    getChatActive(state) {
      const active = state.chatActive;
      if (active) return active;
      return sStorage.get<ChatState['chatActive']>('CHAT_ACTIVE');
    },
    getSocket(state) {
      const socket = state.socket;
      if (socket) return socket;
    },
  },
  actions: {
    setChatList(chatList: Chat[]) {
      if (!chatList.length) return;
      this.chatList = chatList;
      sStorage.set('CHAT_LIST', chatList);
    },
    setChatActive(active: ChatState['chatActive']) {
      if (!isObject(active)) return;
      this.chatActive = active;
      sStorage.set('CHAT_ACTIVE', active);
    },
    connectionSocket(token: string, username: string) {
      this.socket = io(VITE_GLOB_SOCKET_URL, {
        path: '/socket.io',
        extraHeaders: {
          token,
          username,
        },
      });
    },
  },
});
