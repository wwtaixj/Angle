import { DataTypes, Sequelize, Model } from 'sequelize';
import { ChatHistoryTable } from './types';
import { isObject } from '@/utils';

export async function createChatHistory(
  sequelize: Sequelize,
  id: string | number
) {
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
      timestamps: true,
      sequelize, // 我们需要传递连接实例
      freezeTableName: true,
      modelName: `ChatHistory${id}`, // 我们需要选择模型名称
    }
  );
}

/**
 * ChatHistory 批量创建
 * @param sequelize 实例
 * @param  ChatHistory 列表或单个对象
 */
export const insertChatHistory = (
  sequelize: Sequelize,
  id: number,
  params: ChatHistoryTable | ChatHistoryTable[]
) => {
  if (!sequelize) return;
  if (!params) throw new Error('the chat history is empty');
  if (Array.isArray(params)) {
    return sequelize.models[`ChatHistory${id}`].bulkCreate<
      Model<ChatHistoryTable>
    >(params);
  }
  if (isObject(params)) {
    return sequelize.models[`ChatHistory${id}`].create<Model<ChatHistoryTable>>(
      params
    );
  }
};

/**
 * 根据 senderId 或 receiverId 进行查询聊天历史记录
 * @param sequelize 实例
 * @param id 查询的 senderId 或 receiverId
 */
export const queryChatHistoryByAll = (
  sequelize: Sequelize,
  id: number,
  params?: Partial<ChatHistoryTable> & {
    [P in keyof ChatHistoryTable]?: ChatHistoryTable[P];
  }
) => {
  if (!sequelize) return;
  if (params) {
    return sequelize.models[`ChatHistory${id}`].findAll<
      Model<ChatHistoryTable>
    >({
      where: params,
    });
  }
  return sequelize.models[`ChatHistory${id}`].findAll<
    Model<ChatHistoryTable>
  >();
};
