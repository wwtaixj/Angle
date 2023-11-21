const { join, resolve, dirname } = require('path');
import { createChatHistory } from './model';
const DB_PATH =
  process.env.NODE_ENV === 'development'
    ? resolve()
    : dirname(process.execPath);

export async function initDatabase({
  username,
  password,
  ids,
}: {
  username: string;
  password: string;
  ids: (string | number)[];
}) {
  return await connectDatabase(DB_PATH, username, password, ids);
}

/**
 * @description: 连接数据库
 */
export async function connectDatabase(
  path: string,
  username: string,
  password: string,
  ids: (string | number)[]
) {
  const { Sequelize } = require('sequelize');
  const db = new Sequelize('database', username, password, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: join(path + '\\' + username + '.db'),
    define: {
      freezeTableName: true,
    },
  });
  //使用 .authenticate() 函数测试连接是否正常
  try {
    await db.authenticate();
    for (const id of ids) {
      await createChatHistory(db, id);
    }
    await db.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  return db;
}

export * from './model';
export * from './types';
