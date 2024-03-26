import * as log4js from 'log4js';
import { join } from 'path';

export type Category = 'error' | 'info' | 'aiChat';

// 创建 logs 文件夹的绝对路径
const logsFolderPath = join(process.cwd(), 'logs');
log4js.configure({
  appenders: {
    error: { type: 'file', filename: join(logsFolderPath, 'error.log') }, // 错误日志记录到 error.log 文件
    info: { type: 'file', filename: join(logsFolderPath, 'info.log') }, // 信息日志记录到 info.log 文件
    aiChat: { type: 'file', filename: join(logsFolderPath, 'aiChat.log') }, // 信息日志记录到 aiChat.log 文件
  },
  categories: {
    default: { appenders: ['info'], level: 'info' }, // 将名为 'info' 的类型日志记录到 info
    error: { appenders: ['error'], level: 'error' }, // 将默认类型的日志记录到 error
    aiChat: { appenders: ['aiChat'], level: 'info' }, // 将名为 'aiChat' 的类型日志记录到 aiChat
  },
});

const logger = log4js.getLogger();
export const useLogger = (category: Category) =>
  log4js.getLogger(category as unknown as string);
export default logger;
