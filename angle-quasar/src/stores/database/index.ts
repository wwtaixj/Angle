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
  deleteChatRobotHistoryTable,
  deleteChatRobotHistoryRecords,
  initChatRobotListTable,
  deleteChatRobotListRecords,
  updateChatRobotListRecords,
  queryChatRobotListByAll,
  insertChatRobotList,
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
      const chatRobotListTable = await initChatRobotListTable(db);
      const chatRobotList = (await chatRobotListTable.findAll()).map((i) => ({
        ...i.dataValues,
      }));
      // 设置聊天机器人列表
      useChatRobotStore().chatList = chatRobotList;

      const chatIds = useChatStore().getChatList.map((i) => i.chatId);
      await createChatRobotHistoryTable(
        db,
        chatRobotList.map((i) => i.chatId)
      );

      if (chatIds.length) {
        await createChatHistoryTable(db, chatIds);
      }

      this.instance = await db?.sync();
    },
    // 添加聊天记录
    async addChatHistory(id: string, history: ChatHistoryTable) {
      if (!this.instance) await this.initDatabase();
      return await insertChatHistory(this.instance as Sequelize, id, history);
    },
    // 获取聊天记录
    async getChatHistory(id: string, chat?: Partial<ChatHistoryTable>) {
      if (!this.instance) await this.initDatabase();
      return await queryChatHistoryByAll(this.instance as Sequelize, id, chat);
    },
    // 添加机器人聊天记录
    async addChatRobotHistory(
      id: string,
      history: ChatRobot.ChatRobotHistoryTable
    ) {
      if (!this.instance) await this.initDatabase();
      return await insertChatRobotHistory(
        this.instance as Sequelize,
        id,
        history
      );
    },
    // 获取机器人聊天记录
    async getChatRobotHistory(
      id: string,
      chat?: Partial<ChatRobot.ChatRobotHistoryTable>
    ) {
      if (!this.instance) await this.initDatabase();
      return await queryChatRobotHistoryByAll(
        this.instance as Sequelize,
        id,
        chat
      );
    },
    // 删除机器人聊天记录表
    async deleteChatRobotHistoryTable(id: string) {
      if (!this.instance) await this.initDatabase();
      return await deleteChatRobotHistoryTable(this.instance as Sequelize, id);
    },
    // 删除指定messageId机器人聊天记录
    async deleteChatRobotHistoryRecords(
      id: string,
      params: Partial<ChatRobot.ChatRobotHistoryTable>
    ) {
      if (!this.instance) await this.initDatabase();
      return await deleteChatRobotHistoryRecords(
        this.instance as Sequelize,
        id,
        params
      );
    },
    // 插入机器人聊天列表记录
    async insertChatRobotList(params: ChatRobot.Chat | ChatRobot.Chat[]) {
      if (!this.instance) await this.initDatabase();
      return await insertChatRobotList(this.instance as Sequelize, params);
    },
    // 查询指定chatId机器人聊天列表记录
    async getChatRobotList(params?: Partial<ChatRobot.Chat>) {
      if (!this.instance) await this.initDatabase();
      return await queryChatRobotListByAll(this.instance as Sequelize, params);
    },
    // 更新指定chatId机器人聊天列表记录
    async updateChatRobotListRecords(
      params: Partial<ChatRobot.Chat>,
      values: Partial<ChatRobot.Chat>
    ) {
      if (!this.instance) await this.initDatabase();
      return await updateChatRobotListRecords(
        this.instance as Sequelize,
        params,
        values
      );
    },
    // 删除指定chatId机器人聊天列表记录
    async deleteChatRobotListRecords(params: Partial<ChatRobot.Chat>) {
      if (!this.instance) await this.initDatabase();
      return await deleteChatRobotListRecords(
        this.instance as Sequelize,
        params
      );
    },
  },
});
