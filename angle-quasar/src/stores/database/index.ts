import { defineStore } from 'pinia';
import { isNumber } from '@/utils/is';
import { Sequelize } from 'sequelize';
import { useUserStore } from '../user';
import { useChatStore } from '@/stores/chat';
import {
  initDatabase,
  insertChatHistory,
  ChatHistoryTable,
  queryChatHistoryByAll,
} from '@/db';

interface DBState {
  instance?: Sequelize;
}

export const useDBStore = defineStore('database', {
  state: (): DBState => ({
    instance: void 0,
  }),
  actions: {
    async initDatabase() {
      const userStore = useUserStore();
      this.instance = await initDatabase({
        username: userStore.getUserName,
        password: userStore.getPassword,
        ids: useChatStore().getChatList.map((i) => i.id),
      });
    },
    async addChatHistory(
      history: ChatHistoryTable,
      id: number = useChatStore().getChatActive?.id as number
    ) {
      if (!this.instance) await this.initDatabase();
      return insertChatHistory(this.instance as Sequelize, id, history);
    },
    async getChatHistory(
      chat?: Partial<ChatHistoryTable>,
      id: number = useChatStore().getChatActive?.id as number
    ) {
      if (!this.instance) await this.initDatabase();
      return queryChatHistoryByAll(this.instance as Sequelize, id, chat);
    },
  },
});
