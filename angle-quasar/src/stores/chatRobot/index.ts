import { defineStore } from 'pinia';
import { uid } from 'quasar';
import { lStorage, isObject, isArray, isNumber } from '@/utils';
import { useUserStore } from '@/stores/user';
import { getModelList } from '@/assets/constant';
import { useDBStore } from '@/stores/database';
import { useRoute } from '@/router';

export const useChatRobotStore = defineStore('chatRobot', {
  state: (): ChatRobot.ChatState => ({
    active: null,
    activeMssage: [],
    chatList: [],
    model: '', // API Model
    usingContext: true, // 是否使用上下文
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
      let active = state.active;
      if (isObject(active)) return active;
      active = lStorage.get<ChatRobot.ChatState['active']>('CHAT_ROBOT_ACTIVE');
      return isObject(active) ? active : null;
    },
    getChatModel(state) {
      const model = state.model;
      if (!!model) {
        return getModelList().find((item) => item.value === model);
      }
      const locaModel =
        lStorage.get<ChatRobot.ChatRobotModel>('CHAT_ROBOT_MODEL');
      if (!!locaModel) return locaModel;
      return getModelList()[0];
    },
    getActiveMssage(state) {
      const activeMssage = state.activeMssage;
      if (activeMssage.length) return activeMssage;
      return [];
    },
  },
  actions: {
    setActive(active: ChatRobot.ChatState['active'] | null) {
      this.active = active;
      lStorage.set('CHAT_ROBOT_ACTIVE', active);
      const chatActive = this.getActive;
      if (!isObject(chatActive)) return;
      const modelObj = getModelList().find(
        (item) => item.value === chatActive.model
      );
      //获取选中用户历史消息
      useDBStore()
        .getChatRobotHistory(active?.id as string)
        .then((result) => {
          const userStore = useUserStore();
          if (!isArray(result)) return;
          this.activeMssage = result.map((i) => ({
            timestamp: i.dataValues.timestamp,
            text: [i.dataValues.message],
            avatar: (i.dataValues.sent
              ? userStore.getAvatarUrl
              : modelObj?.avatar) as string,
            sent: i.dataValues.sent,
            textHtml: !i.dataValues.sent,
            ...i,
            conversationOptions: i.dataValues.conversationOptions
              ? JSON.parse(i.dataValues.conversationOptions)
              : null,
            requestOptions: i.dataValues.requestOptions
              ? JSON.parse(i.dataValues.requestOptions)
              : null,
          }));
        });
    },
    setChatModel(model: ChatRobot.ChatState['model']) {
      if (!model) return;
      this.model = model;
      lStorage.set(
        'CHAT_ROBOT_MODEL',
        getModelList().find((item) => item.value === model)
      );
    },
    /**
     * @description 设置聊天记录
     * @param message
     */
    setChatActiveMssage(
      message: ChatRobot.ChatState['activeMssage'] | Partial<ChatRobot.Message>,
      index?: number
    ) {
      if (isArray(message)) {
        this.activeMssage = message;
        return;
      }
      if (isNumber(index) && isObject(message)) {
        Object.assign(this.activeMssage[index], message);
        return;
      }
      this.activeMssage.push(message as ChatRobot.Message);
    },
    setChatList(
      chatList: ChatRobot.ChatState['chatList'] | Partial<ChatRobot.Chat>,
      index?: number
    ) {
      if (isArray(chatList)) {
        this.chatList = chatList;
      }
      if (isObject(chatList)) {
        const list = this.chatList.length ? this.chatList : this.getChatList;
        if (isNumber(index) && isObject(chatList)) {
          list[index] = Object.assign({ ...list[index] }, chatList);
        } else {
          list.push(chatList as ChatRobot.Chat);
        }
        this.chatList = list;
      }
      lStorage.set('CHAT_ROBOT_LIST', this.chatList);
    },
    addChat() {
      const uuid = uid();
      const model = this.getChatModel;
      const chat = {
        title: 'New Chat',
        id: uuid,
        model: model?.value as string,
        timestamp: Date.now(),
        avatar: model?.avatar as string,
      };
      this.setChatList(chat);
      useDBStore()
        .initDatabase()
        .then(() => {
          this.setActive(chat);
          useRoute().push({ name: 'chatRobotBox', params: { uuid: uuid } });
        });
    },
  },
});
