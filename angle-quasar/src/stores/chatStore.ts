/*
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-12 11:08:01
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-16 17:59:59
 * @FilePath: \angle-quasar\src\stores\chatStore.ts
 */
import { defineStore } from 'pinia';
import { sStorage } from '../utils/webStorage';
import { isNumber } from '@/utils/is';
import { Chat } from './typings/chat';

interface ChatState {
  chatList: Chat[];
  chatListSelectedId: number | null;
}

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    chatList: [
      {
        id: 1,
        name: 'Razvan Stoenescu',
        avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
        caption: "I'm working on Quasar!",
        time: '15:00',
        sent: true,
        deleted: true,
      },
      {
        id: 2,
        name: 'Dan Popescu',
        avatar: 'https://cdn.quasar.dev/team/dan_popescu.jpg',
        caption: "I'm working on Quasar!",
        time: '16:00',
        sent: true,
      },
    ],
    chatListSelectedId: null,
  }),
  getters: {
    getChatList(state) {
      const chatList = state.chatList;
      if (chatList.length) return chatList;
      return sStorage.get('CHAT_LIST') as Chat[];
    },
    getChatListSelectedId(state) {
      const id = state.chatListSelectedId;
      if (id) return id;
      return sStorage.get('CHAT_LIST_SELECTED_ID') as number;
    },
  },
  actions: {
    setChatList(chatList: Chat[]) {
      if (!chatList.length) return;
      this.chatList = chatList;
      sStorage.set('CHAT_LIST', chatList);
    },
    setChatListSelectedId(id: number) {
      if (!isNumber(id)) return;
      this.chatListSelectedId = id;
      sStorage.set('CHAT_LIST_SELECTED_ID', id);
    },
  },
});
