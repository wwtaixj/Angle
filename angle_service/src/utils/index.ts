import multer from 'multer';
import iconv from 'iconv-lite';
import fs from 'fs';
import { resolve } from 'path';
export function generateRandomCode(
  length: number,
  type: 'number' | 'string' = 'number'
): string {
  // 定义包含所有可能字符的字符串
  const characters: string =
    type === 'number'
      ? '0123456789'
      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // 初始化代码字符串
  let code: string = '';

  // 循环生成指定长度的随机代码
  for (let i: number = 0; i < length; i++) {
    // 生成随机索引
    const randomIndex: number = Math.floor(Math.random() * characters.length);
    // 将随机字符添加到代码字符串中
    code += characters.charAt(randomIndex);
  }

  // 返回生成的随机代码
  return code;
}
interface SendResponseOptions<T = any> {
  type: '0' | 'Fail';
  message?: string;
  data?: T;
}

export function sendResponse<T>(options: SendResponseOptions<T>) {
  if (options.type === '0') {
    return Promise.resolve({
      message: options.message ?? null,
      data: options.data ?? null,
      status: options.type,
    });
  }

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({
    message: options.message ?? 'Failed',
    data: options.data ?? null,
    status: options.type,
  });
}

export const formatDate = () => {
  const date = new Date();
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};
export function uploadFile({ path, fileTypes }) {
  const folderPath = resolve(__dirname, `../../${path}`);
  if (!fs.existsSync(folderPath)) {
    // 如果文件夹不存在，就新建文件夹
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(folderPath + ' created successfully.');
  }
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      //指定文件路径存储地
      cb(null, path);
    },
    filename(req, file, cb) {
      try {
        //获取后缀名
        const ext = file.originalname.split('.').pop();
        const filename = file.originalname.split('.').shift();
        // 将 ASCII 字符串转换为 Buffer 对象
        const asciiBuffer = Buffer.from(filename, 'ascii');
        // 将 Buffer 对象解码为 UTF-8 编码的字符串
        const utf8String = iconv.decode(asciiBuffer, 'utf-8');
        cb(null, `${utf8String}_w${formatDate()}.${ext}`);
      } catch (e) {
        console.log('set upload images filename error:' + e);
      }
    },
  });
  return multer({
    storage: storage,
    fileFilter(req, file, cb) {
      const allowedTypes = Array.isArray(fileTypes) ? fileTypes : [fileTypes];

      if (!allowedTypes.some((type) => file.mimetype.startsWith(type))) {
        return cb(new Error(`只支持${allowedTypes.join(', ')}类型`));
      }
      cb(null, true);
    },
  });
}

export * from './cryptoJs';
export * from './chatGPT';
export * from './is';
export * from './nodeCache';
export * from './tool';
export * from './logs';
