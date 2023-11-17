import { defineStore } from 'pinia';
import { isNumber } from '@/utils/is';
import { Sequelize } from 'sequelize';
import { useUserStore } from '../user';
import { initDatabase, insertChatHistory, ChatHistoryTable } from '@/db';

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
      });
    },
    async addChatHistory(history: ChatHistoryTable) {
      if (!this.instance) await this.initDatabase();
      return insertChatHistory(this.instance as Sequelize, history);
    },
  },
});
