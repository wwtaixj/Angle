import { defineStore } from 'pinia';
import { uid } from 'quasar';
import { lStorage, isObject, isArray } from '@/utils';
import { getModelList } from '@/assets/constant';
import { useUserStore } from '@/stores/user';

//import { useRoute } from '@/router';

export const useChatRobotStore = defineStore('chatRobot', {
  state: (): ChatRobot.ChatState => ({
    active: null,
    activeMssage: [],
    chatList: [],
    model: getModelList()[0].value, // API Model
  }),
  getters: {
    getChatList(state) {
      const chatList = state.chatList;
      if (chatList.length) return chatList;
      return (
        lStorage.get<ChatRobot.ChatState['chatList']>('CHAT_ROBOT_LIST') || []
      );
    },
    getActive(state) {
      const chatList = state.active;
      if (isObject(chatList)) return chatList;
      return lStorage.get<ChatRobot.ChatState['active']>('CHAT_ROBOT_ACTIVE');
    },
    getChatModel(state) {
      const model = state.model;
      if (!!model && model !== getModelList()[0].value) return model;
      return lStorage.get<ChatRobot.ChatState['model']>('CHAT_ROBOT_MODEL');
    },
    getActiveMssage(state) {
      const activeMssage = state.activeMssage;
      if (activeMssage.length) return activeMssage;
      return [];
    },
  },
  actions: {
    setActive(active: ChatRobot.ChatState['active']) {
      this.active = active;
      lStorage.set('CHAT_ROBOT_ACTIVE', active);
    },
    setChatModel(model: ChatRobot.ChatState['model']) {
      this.model = model;
      lStorage.set('CHAT_ROBOT_MODEL', model);
    },
    /**
     * @description 设置聊天记录
     * @param message
     */
    setChatActiveMssage(
      message: ChatRobot.ChatState['activeMssage'] | ChatRobot.Message
    ) {
      if (isArray(message)) {
        this.activeMssage = message;
        return;
      }
      this.activeMssage.push(message);
    },
    setChatList(chatList: ChatRobot.ChatState['chatList'], isSplice = false) {
      if (isArray(chatList)) {
        if (isSplice) {
          const list = this.chatList.length ? this.chatList : this.getChatList;
          const newList = chatList.filter((i) => {
            return list.findIndex((j) => j.id === i.id) === -1;
          });
          if (!newList.length) return;
          chatList = list.concat(newList);
        }
        this.chatList = chatList;
        lStorage.set('CHAT_ROBOT_LIST', chatList);
      }
    },
    addChat() {
      this.setChatList(
        [
          {
            title: 'New Chat',
            id: uid(),
            model: this.getChatModel,
            timestamp: Date.now(),
          },
        ],
        true
      );
    },
    sendMessage(text: string) {
      const userStore = useUserStore();
      this.setChatActiveMssage({
        text: [text],
        avatar: userStore.getAvatarUrl,
        sent: true,
      });
    },
  },
});
