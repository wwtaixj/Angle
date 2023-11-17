const { join } = require('path');
import { createChatHistory } from './model';
const DB_PATH = join('C:AppData\\Angle');

export async function initDatabase({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const db = await connectDatabase(DB_PATH, username, password);
  return db;
}

/**
 * @description: 连接数据库
 */
export async function connectDatabase(
  path: string,
  username: string,
  password: string
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
    await createChatHistory(db);
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  return db;
}

export * from './model';
export * from './typings';
