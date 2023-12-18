import { defineStore } from 'pinia';
import { isObject, lStorage, isArray } from '@/utils';
import { Chat } from '../typings/chat';
import { useRoute } from '@/router';
import { useDBStore } from '@/stores/database';
import { useSocketStore } from '@/stores/socket';
import { useUserStore } from '@/stores/user';
import { useMainStore } from '@/stores/main';
import { SideListKeyEnum } from '@/enums/main';
import { TransmissionBody } from '@/socket/types';
import { uid } from 'quasar';
import { MessageSendStatus, MessageSendType } from '@/enums/chat';

interface ActiveMessage {
  text: TransmissionBody['message'][];
  status?: TransmissionBody['status'];
  avatar: Chat['avatarUrl'];
  sent: boolean;
}
interface ChatState {
  chatList: Chat[];
  chatActive: Chat | null;
  chatActiveMssage: ActiveMessage[];
}

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    chatList: [],
    chatActive: null,
    chatActiveMssage: [],
  }),
  getters: {
    getChatList(state) {
      const chatList = state.chatList;
      if (chatList.length) return chatList;
      return lStorage.get<Chat[]>('CHAT_LIST') || [];
    },
    getChatActive(state) {
      let active = state.chatActive;
      if (isObject(active)) return active;
      active = lStorage.get<Chat>('CHAT_ACTIVE');
      return isObject(active) ? active : null;
    },
    getChatActiveMssage(state) {
      const activeMssage = state.chatActiveMssage;
      if (activeMssage.length) return activeMssage;
      return [];
    },
  },
  actions: {
    /**
     * @description 设置聊天记录
     * @param message
     */
    setChatActiveMssage(message: ActiveMessage | ActiveMessage[]) {
      if (isArray(message)) {
        this.chatActiveMssage = message;
        return;
      }
      this.chatActiveMssage.push(message);
    },
    /**
     * @description 设置聊天列表
     * @param chatList
     */
    async setChatList(chatList: Chat[], isSplice = false) {
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
        lStorage.set('CHAT_LIST', chatList);
      }
    },
    /**
     * @description 设置选中的聊天用户
     * @param active
     * @returns
     */
    setChatActive(active: Chat | null) {
      this.chatActive = active;
      lStorage.set('CHAT_ACTIVE', active);
      const chatActive = this.getChatActive;
      if (!isObject(chatActive)) return;
      //获取选中用户历史消息
      useDBStore()
        .getChatHistory(chatActive?.id)
        .then((result) => {
          const userStore = useUserStore();
          if (!isArray(result)) return;
          this.chatActiveMssage = result.map((i) => ({
            text: [i.dataValues.message],
            avatar: (i.dataValues.senderId === userStore.getUserId
              ? userStore.getAvatarUrl
              : this.chatActive?.avatarUrl) as string,
            status: i.dataValues.status,
            sent: i.dataValues.senderId === userStore.getUserId,
          }));
        });
    },
    /**
     * @description 发送消息
     * @returns
     */
    sendMessage(message: string) {
      const userStore = useUserStore();
      const senderId = userStore.getUserId;
      const receiverId = this.getChatActive?.id as string;
      const messageId = uid();
      const status = MessageSendStatus.HAVE_SEND;
      const messageBody: TransmissionBody = {
        message,
        type: MessageSendType.TEXT_MESSAGE,
        senderId,
        receiverId,
        timestamp: Date.now(),
        status,
        messageId,
      };
      // 发送消息到服务器
      useSocketStore().socketEmit(receiverId, messageBody);
      // 存储消息到数据库
      useDBStore().addChatHistory(
        this.getChatActive?.id as string,
        messageBody
      );
      this.setChatActiveMssage({
        text: [message],
        avatar: userStore.getAvatarUrl,
        status,
        sent: true,
      });
    },
    /**
     * @description 打开聊天
     * @param chat
     */
    openChat(chat: Chat) {
      this.setChatList([chat], true);
      useDBStore()
        .initDatabase()
        .then(() => {
          this.setChatActive(chat);
          useMainStore().setToolActive(SideListKeyEnum.CHAT);
          const route = useRoute();
          route.replace({
            name: 'chatBox',
            params: { uuid: chat.id },
          });
        });
    },
  },
});
