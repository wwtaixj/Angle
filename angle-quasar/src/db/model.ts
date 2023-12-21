import { DataTypes, Sequelize, Model } from 'sequelize';
import { ChatHistoryTable } from './types';
import { isObject } from '@/utils';

/**
 * 创建指定id聊天记录表
 * @param sequelize
 * @param id
 */
export async function initChatHistoryTable(
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
export async function initChatRobotHistoryTable(
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
      messageId: {
        type: DataTypes.STRING,
        allowNull: false,
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
 * 创建聊天机器人列表数据表
 * @param sequelize
 */
export async function initChatRobotListTable(sequelize: Sequelize) {
  class ChatRobotList extends Model {}
  ChatRobotList.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      chatId: {
        type: DataTypes.STRING,
      },
      model: {
        type: DataTypes.STRING,
      },
      timestamp: {
        type: DataTypes.NUMBER,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      usingContext: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize, // 我们需要传递连接实例
      freezeTableName: true,
      modelName: 'ChatRobotList', // 我们需要选择模型名称
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
 * 删除指定id聊天机器人聊天记录表
 * @param sequelize 实例
 * @param id
 */
export const deleteChatRobotHistoryTable = async (
  sequelize: Sequelize,
  id: string
) => {
  if (!sequelize) return;
  return await sequelize.models[`ChatRobotHistory${id}`].drop();
};
/**
 * 删除指定id聊天机器人聊天记录表记录
 * @param sequelize 实例
 * @param id
 */
export const deleteChatRobotHistoryRecords = async (
  sequelize: Sequelize,
  id: string,
  params: Partial<ChatRobot.ChatRobotHistoryTable>
) => {
  if (!sequelize) return;
  return await sequelize.models[`ChatRobotHistory${id}`].destroy({
    where: {
      ...params,
    },
  });
};

/**
 * ChatRobotList 批量创建
 * @param sequelize 实例
 * @param  ChatRobotList 列表或单个对象
 */
export const insertChatRobotList = async (
  sequelize: Sequelize,
  params: ChatRobot.Chat | ChatRobot.Chat[]
) => {
  if (!sequelize) return;
  if (!params) throw new Error('the chat history is empty');
  if (Array.isArray(params)) {
    return await sequelize.models['ChatRobotList'].bulkCreate<
      Model<ChatRobot.Chat>
    >(params);
  }
  if (isObject(params)) {
    return await sequelize.models['ChatRobotList'].create<
      Model<ChatRobot.Chat>
    >(params);
  }
};
/**
 * 根据 params 进行查询聊天历史记录
 * @param sequelize 实例
 * @param params 查询的参数
 */
export const queryChatRobotListByAll = async (
  sequelize: Sequelize,
  params?: Partial<ChatRobot.Chat> & {
    [P in keyof ChatRobot.Chat]?: ChatRobot.Chat[P];
  }
) => {
  if (!sequelize) return;
  if (params) {
    return await sequelize.models['ChatRobotList'].findAll<
      Model<ChatRobot.Chat>
    >({
      where: params,
    });
  }
  return await sequelize.models['ChatRobotList'].findAll<
    Model<ChatRobot.Chat>
  >();
};
/**
 * 更新指定 chatId 聊天机器人聊天列表记录
 * @param sequelize 实例
 * @param params
 */
export const updateChatRobotListRecords = async (
  sequelize: Sequelize,
  params: Partial<ChatRobot.Chat>,
  values: Partial<ChatRobot.Chat>
) => {
  if (!sequelize) return;
  return await sequelize.models['ChatRobotList'].update(
    { ...values },
    {
      where: {
        params,
      },
    }
  );
};
/**
 * 删除指定 chatId 聊天机器人聊天列表记录
 * @param sequelize 实例
 * @param params
 */
export const deleteChatRobotListRecords = async (
  sequelize: Sequelize,
  params: Partial<ChatRobot.Chat>
) => {
  if (!sequelize) return;
  return await sequelize.models['ChatRobotList'].destroy({
    where: {
      ...params,
    },
  });
};
