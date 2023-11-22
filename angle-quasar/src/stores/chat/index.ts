import { defineStore } from 'pinia';
import { isObject, sStorage, isArray } from '@/utils';
import { Chat } from '../typings/chat';
import { getUser } from '@/axios';
import { useDBStore } from '@/stores/database';
import { useSocketStore } from '@/stores/socket';
import { useUserStore } from '@/stores/user';
import { TransmissionBody } from '@/socket/types';
import { uid } from 'quasar';
import { MessageSendStatus, MessageSendType } from '@/enums/chat';

interface ActiveMessage {
  message: TransmissionBody['message'][];
  status: TransmissionBody['status'];
  avatarUrl: Chat['avatarUrl'];
  sent: boolean;
}
interface ChatState {
  chatList: Chat[];
  chatActive?: Chat;
  chatActiveMssage: ActiveMessage[];
}

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    chatList: [],
    chatActive: void 0,
    chatActiveMssage: [],
  }),
  getters: {
    getChatList(state) {
      const chatList = state.chatList;
      if (chatList.length) return chatList;
      return (sStorage.get('CHAT_LIST') as Chat[]) || [];
    },
    getChatActive(state) {
      const active = state.chatActive;
      if (!active) return active;
      return sStorage.get<Chat>('CHAT_ACTIVE');
    },
    getChatActiveMssage(state) {
      const activeMssage = state.chatActiveMssage;
      if (activeMssage.length) return activeMssage;
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
    async setChatList() {
      const { data } = await getUser();
      if (!data.length) return;
      const userId = useUserStore().getUserId;
      const chatList = data.filter((i) => i.id !== userId);
      this.chatList = chatList;
      sStorage.set('CHAT_LIST', chatList);
    },
    /**
     * @description 设置选中的聊天用户
     * @param active
     * @returns
     */
    setChatActive(active: Chat) {
      if (!isObject(active)) return;
      this.chatActive = active;
      sStorage.set('CHAT_ACTIVE', active);
      //获取选中用户历史消息
      useDBStore()
        .getChatHistory(this.getChatActive?.id as number)
        .then((result) => {
          const userStore = useUserStore();
          if (!isArray(result)) return;
          this.chatActiveMssage = result.map((i) => ({
            message: [i.dataValues.message],
            avatarUrl: (i.dataValues.senderId === userStore.getUserId
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
      const receiverId = this.getChatActive?.id as number;
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
      useSocketStore().socketEmit(String(receiverId), messageBody);
      // 存储消息到数据库
      useDBStore().addChatHistory(
        this.getChatActive?.id as number,
        messageBody
      );
      this.setChatActiveMssage({
        message: [message],
        avatarUrl: userStore.getAvatarUrl,
        status,
        sent: true,
      });
    },
  },
});
