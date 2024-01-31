import { defineStore } from 'pinia';
import { uid } from 'quasar';
import {
  lStorage,
  isObject,
  isArray,
  isNumber,
  isString,
  notify,
} from '@/utils';
import { useUserStore } from '@/stores/user';
import { getModelList } from '@/assets/constant';
import { useDBStore } from '@/stores/database';
//import { useRoute } from '@/router';

export function getLocalState(): ChatRobot.ChatState {
  const localModel = lStorage.get<ChatRobot.ChatRobotModel>('CHAT_ROBOT_MODEL');
  const currentDate = new Date().toISOString().split('T')[0];
  return {
    active: lStorage.get<ChatRobot.ChatState['active']>('CHAT_ROBOT_ACTIVE'),
    activeMssage: [],
    chatList: [],
    model: localModel ? localModel.value : getModelList()[0].value, // API Model
    xSplitter:
      lStorage.get<ChatRobot.ChatState['xSplitter']>('X_SPLITTER') || 80,
    ySplitter:
      lStorage.get<ChatRobot.ChatState['ySplitter']>('Y_SPLITTER') || 25,
    role:
      lStorage.get<ChatRobot.ChatState['role']>('ROLE') ||
      `你是智能语言模型ChatGPT,回答要尽可能简明扼要,知识截止: 2021-09-01,当前日期:${currentDate}`,
    maxWidth: '0px',
  };
}
export const useChatRobotStore = defineStore('chatRobot', {
  state: (): ChatRobot.ChatState => getLocalState(),
  getters: {
    getChatList(state) {
      const chatList = state.chatList;
      if (chatList.length) return chatList;
      return [];
    },
    getActive(state) {
      const active = state.active;
      if (isObject(active)) return active;
      return isObject(active) ? active : null;
    },
    getChatModel(state) {
      const model = state.model;
      if (!!model) {
        return getModelList().find((item) => item.value === model);
      }
    },
    getActiveMssage(state) {
      const activeMssage = state.activeMssage;
      if (activeMssage.length) return activeMssage;
      return [];
    },
  },
  actions: {
    setYSplitter(y: number) {
      this.ySplitter = y;
      lStorage.set('Y_SPLITTER', y);
    },
    setXSplitter(x: number) {
      this.xSplitter = x;
      lStorage.set('X_SPLITTER', x);
    },
    setActive(
      active: Partial<ChatRobot.ChatState['active']> | null,
      isQuery = true
    ) {
      this.active = isObject(active)
        ? (Object.assign(
            this.active ?? {},
            active
          ) as ChatRobot.ChatState['active'])
        : active;
      lStorage.set('CHAT_ROBOT_ACTIVE', this.active);
      const chatActive = this.getActive;
      if (!isObject(chatActive) || !isQuery) return;
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
            textHtml: true,
            isMarkdown: !i.dataValues.sent,
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
        if (chat.chatId === this.getActive?.chatId) this.setActive(chat, false);
        Object.assign(this.chatList[index], chat);
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

      const chat: ChatRobot.Chat = {
        title: 'New Chat',
        chatId: uuid,
        model: model?.value as ChatRobot.Model,
        timestamp: Date.now(),
        avatar: model?.avatar as string,
        usingContext: true,
        serialNumber: this.getChatList.length - 1,
      };
      this.addChatList(chat);
    },
    setRole(role: string) {
      if (!isString(role)) return;
      this.role = role;
      lStorage.set('ROLE', role);
      notify({
        message: '角色设置成功',
        type: 'positive',
      });
    },
  },
});
