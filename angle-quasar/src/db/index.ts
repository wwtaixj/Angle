const { join, resolve, dirname } = require('path');
import { Sequelize } from 'sequelize';
import { initChatHistory, initChatRobotHistory } from './model';
import { $Window } from '@/types/env';
import { isArray } from '@/utils';
import { ChatDBIds } from './types';

const DB_PATH =
  process.env.NODE_ENV === 'development'
    ? resolve()
    : dirname(process.execPath);

/**
 * @description: 连接数据库
 */
export async function connectDatabase({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const { api } = window as unknown as $Window;
  if (!api) return null;
  const { Sequelize } = api;
  if (!Sequelize) return null;
  const db = new Sequelize('database', username, password, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: join(DB_PATH + '\\' + username + '.db'),
    logging: false,
    define: {
      freezeTableName: true,
    },
  });
  //使用 .authenticate() 函数测试连接是否正常
  try {
    await db.authenticate();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  return db;
}

export async function createChatHistoryTable(db: Sequelize, ids?: ChatDBIds) {
  if (ids === undefined) return;
  if (isArray(ids)) {
    for (const id of ids) {
      await initChatHistory(db, id);
    }
  }
}
export async function createChatRobotHistoryTable(
  db: Sequelize,
  ids?: ChatDBIds
) {
  if (ids === undefined) return;
  if (isArray(ids)) {
    for (const id of ids) {
      await initChatRobotHistory(db, id);
    }
  }
}

export * from './model';
export * from './types';
