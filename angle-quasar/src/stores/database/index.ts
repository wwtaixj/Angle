import { defineStore } from 'pinia';
//import { isNumber } from '@/utils/is';
import { Sequelize } from 'sequelize';
import { useUserStore } from '../user';
import { useChatStore } from '@/stores/chat';
import { useChatRobotStore } from '@/stores/chatRobot';
import {
  connectDatabase,
  insertChatHistory,
  ChatHistoryTable,
  queryChatHistoryByAll,
  insertChatRobotHistory,
  queryChatRobotHistoryByAll,
  createChatHistoryTable,
  createChatRobotHistoryTable,
} from '@/db';

interface DBState {
  instance: Sequelize | null;
}

export const useDBStore = defineStore('database', {
  state: (): DBState => ({
    instance: null,
  }),
  actions: {
    // 初始化数据库
    async initDatabase() {
      const userStore = useUserStore();
      const db = await connectDatabase({
        username: userStore.getUserName,
        password: userStore.getPassword,
      });
      if (!db) return;
      const chatIds = useChatStore().getChatList.map((i) => i.id);
      if (chatIds.length) {
        await createChatHistoryTable(db, chatIds);
      }
      const chatRobotIds = useChatRobotStore().getChatList.map((i) => i.id);
      if (chatRobotIds.length) {
        await createChatRobotHistoryTable(db, chatRobotIds);
      }
      this.instance = await db?.sync();
    },
    // 添加聊天记录
    async addChatHistory(id: string, history: ChatHistoryTable) {
      if (!this.instance) await this.initDatabase();
      return insertChatHistory(this.instance as Sequelize, id, history);
    },
    // 获取聊天记录
    async getChatHistory(id: string, chat?: Partial<ChatHistoryTable>) {
      if (!this.instance) await this.initDatabase();
      return queryChatHistoryByAll(this.instance as Sequelize, id, chat);
    },
    // 添加机器人聊天记录
    async addChatRobotHistory(
      id: string,
      history: ChatRobot.ChatRobotHistoryTable
    ) {
      if (!this.instance) await this.initDatabase();
      return insertChatRobotHistory(this.instance as Sequelize, id, history);
    },
    // 获取机器人聊天记录
    async getChatRobotHistory(
      id: string,
      chat?: Partial<ChatRobot.ChatRobotHistoryTable>
    ) {
      if (!this.instance) await this.initDatabase();
      return queryChatRobotHistoryByAll(this.instance as Sequelize, id, chat);
    },
  },
});
