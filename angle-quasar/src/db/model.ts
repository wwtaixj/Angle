import { DataTypes, Sequelize, Model } from 'sequelize';
import { ChatHistoryTable } from './types';
import { isObject } from '@/utils';

/**
 * 创建指定id聊天记录表
 * @param sequelize
 * @param id
 */
export async function initChatHistory(
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
      messageId: {
        type: DataTypes.STRING,
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
 * 创建指定id聊天机器人聊天记录表
 * @param sequelize
 * @param id
 */
export async function initChatRobotHistory(
  sequelize: Sequelize,
  id: string | number
) {
  class ChatRobotHistory extends Model {}
  ChatRobotHistory.init(
    {
      message: {
        type: DataTypes.TEXT,
      },
      sent: {
        type: DataTypes.BOOLEAN,
      },
      conversationOptions: {
        type: DataTypes.STRING,
      },
      requestOptions: {
        type: DataTypes.STRING,
      },
      timestamp: {
        type: DataTypes.DATE,
      },
      error: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: true,
      sequelize, // 我们需要传递连接实例
      freezeTableName: true,
      modelName: `ChatRobotHistory${id}`, // 我们需要选择模型名称
    }
  );
}
/**
 * ChatRobotHistory 批量创建
 * @param sequelize 实例
 * @param ChatRobotHistory 列表或单个对象
 */
export const insertChatRobotHistory = async (
  sequelize: Sequelize,
  id: string,
  params: ChatRobot.ChatRobotHistoryTable | ChatRobot.ChatRobotHistoryTable[]
) => {
  if (!sequelize) return;
  if (!params) throw new Error('the ChatRobot history is empty');
  if (Array.isArray(params)) {
    return await sequelize.models[`ChatRobotHistory${id}`].bulkCreate<
      Model<ChatRobot.ChatRobotHistoryTable>
    >(params);
  }
  if (isObject(params)) {
    return await sequelize.models[`ChatRobotHistory${id}`].create<
      Model<ChatRobot.ChatRobotHistoryTable>
    >(params);
  }
};

/**
 * ChatHistory 批量创建
 * @param sequelize 实例
 * @param  ChatHistory 列表或单个对象
 */
export const insertChatHistory = async (
  sequelize: Sequelize,
  id: string,
  params: ChatHistoryTable | ChatHistoryTable[]
) => {
  if (!sequelize) return;
  if (!params) throw new Error('the chat history is empty');
  if (Array.isArray(params)) {
    return await sequelize.models[`ChatHistory${id}`].bulkCreate<
      Model<ChatHistoryTable>
    >(params);
  }
  if (isObject(params)) {
    return await sequelize.models[`ChatHistory${id}`].create<
      Model<ChatHistoryTable>
    >(params);
  }
};

/**
 * 根据 senderId 或 receiverId 进行查询聊天历史记录
 * @param sequelize 实例
 * @param id 查询的 senderId 或 receiverId
 */
export const queryChatHistoryByAll = async (
  sequelize: Sequelize,
  id: string,
  params?: Partial<ChatHistoryTable> & {
    [P in keyof ChatHistoryTable]?: ChatHistoryTable[P];
  }
) => {
  if (!sequelize) return;
  if (params) {
    return await sequelize.models[`ChatHistory${id}`].findAll<
      Model<ChatHistoryTable>
    >({
      where: params,
    });
  }

  return await sequelize.models[`ChatHistory${id}`].findAll<
    Model<ChatHistoryTable>
  >();
};

/**
 * 根据 聊天机器人对话 uuid  进行查询聊天历史记录
 * @param sequelize 实例
 * @param id
 */
export const queryChatRobotHistoryByAll = async (
  sequelize: Sequelize,
  id: string,
  params?: Partial<ChatRobot.ChatRobotHistoryTable> & {
    [P in keyof ChatRobot.ChatRobotHistoryTable]?: ChatRobot.ChatRobotHistoryTable[P];
  }
) => {
  if (!sequelize) return;
  if (params) {
    return await sequelize.models[`ChatRobotHistory${id}`].findAll<
      Model<ChatRobot.ChatRobotHistoryTable>
    >({
      where: params,
    });
  }
  return await sequelize.models[`ChatRobotHistory${id}`].findAll<
    Model<ChatRobot.ChatRobotHistoryTable>
  >();
};
/**
 * 根据 聊天机器人对话 uuid  进行查询聊天历史记录
 * @param sequelize 实例
 * @param id
 */
export const deleteChatRobotHistory = async (
  sequelize: Sequelize,
  id: string
) => {
  if (!sequelize) return;
  await sequelize.models[`ChatRobotHistory${id}`].drop();
};
