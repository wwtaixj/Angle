import { DataTypes, Sequelize, Model } from 'sequelize';
import { ChatHistoryTable } from './typings';
import { isObject } from '@/utils';

export async function createChatHistory(sequelize: Sequelize) {
  class ChatHistory extends Model {}
  ChatHistory.init(
    {
      senderId: {
        type: DataTypes.INTEGER,
      },
      receiverId: {
        type: DataTypes.INTEGER,
      },
      message: {
        type: DataTypes.TEXT,
      },
      type: {
        type: DataTypes.INTEGER,
      },
      timestamp: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize, // 我们需要传递连接实例
      freezeTableName: true,
      modelName: 'ChatHistory', // 我们需要选择模型名称
    }
  );
  await ChatHistory.sync();
}

/**
 * ChatHistory 批量创建
 * @param sequelize 实例
 * @param  ChatHistory 列表或单个对象
 */
export const insertChatHistory = (
  sequelize: Sequelize,
  params: ChatHistoryTable | ChatHistoryTable[]
) => {
  if (!sequelize) return;
  if (!params) throw new Error('the chat history is empty');
  if (Array.isArray(params)) {
    return sequelize.models.ChatHistory.bulkCreate<Model<ChatHistoryTable>>(
      params
    );
  }
  if (isObject(params)) {
    return sequelize.models.ChatHistory.create<Model<ChatHistoryTable>>(params);
  }
};
