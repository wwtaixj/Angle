import { defineStore } from 'pinia';
import { uid } from 'quasar';
import { lStorage, isObject } from '@/utils';
//import { useRoute } from '@/router';

export const useChatRobotStore = defineStore('chatRobot', {
  state: (): ChatRobot.ChatState => ({
    active: null,
    activeMssage: [],
    chatList: [],
  }),
  getters: {
    getChatList(state) {
      const chatList = state.chatList;
      if (chatList.length) return chatList;
      return lStorage.get<ChatRobot.Chat[]>('CHAT_ROBOT_LIST') || [];
    },
    getActive(state) {
      const chatList = state.active;
      if (isObject(chatList)) return chatList;
      return lStorage.get<ChatRobot.Chat>('CHAT_ROBOT_ACTIVE');
    },
  },
  actions: {
    setActive(active: ChatRobot.Chat) {
      this.active = active;
      lStorage.set('CHAT_ROBOT_ACTIVE', active);
    },
    addChat() {
      this.chatList.push({
        title: 'New ChatGptdddddddddddd',
        id: uid(),
        model: 'gpt-3.5-turbo',
      });
    },
  },
});
