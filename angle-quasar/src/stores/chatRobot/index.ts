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
  }),
  getters: {
    getChatList(state) {
      const chatList = state.chatList;
      if (chatList.length) return chatList;
      return [];
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
        .getChatRobotHistory(active?.chatId as string)
        .then((result) => {
          const userStore = useUserStore();
          if (!isArray(result)) return;

          this.activeMssage = result.map((i) => ({
            messageId: i.dataValues.messageId,
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
    addChatList(chat: ChatRobot.Chat) {
      if (!isObject(chat)) return;
      const dbStore = useDBStore();
      this.chatList.push(chat);
      dbStore.insertChatRobotList(chat);
    },
    updateChatList(chat: Partial<ChatRobot.Chat>, index?: number) {
      if (!isObject(chat)) return;
      if (isNumber(index)) {
        for (const key of Object.keys(chat)) {
          this.chatList[index][key] = chat[key];
        }
      }
      const dbStore = useDBStore();
      const { chatId, ...values } = chat;
      dbStore.updateChatRobotListRecords({ chatId }, values);
    },
    deleteChatList(chat: Partial<ChatRobot.Chat>, index?: number) {
      if (!isObject(chat)) return;
      if (isNumber(index)) {
        this.chatList.splice(index, 1);
      }
      const dbStore = useDBStore();
      dbStore.deleteChatRobotListRecords({ chatId: chat.chatId });
    },
    addChat() {
      const uuid = uid();
      const model = this.getChatModel;
      const dbStore = useDBStore();
      const chat = {
        title: 'New Chat',
        chatId: uuid,
        model: model?.value as string,
        timestamp: Date.now(),
        avatar: model?.avatar as string,
        usingContext: true,
      };
      this.addChatList(chat);
      dbStore.initDatabase().then(() => {
        this.setActive(chat);
        useRoute().push({ name: 'chatRobotBox', params: { uuid: uuid } });
      });
    },
  },
});
