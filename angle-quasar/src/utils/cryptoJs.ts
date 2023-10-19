/*
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-13 16:53:51
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-13 17:01:09
 * @FilePath: \angle-quasar\src\utils\cryptoJs.ts
 */
import CryptoJS from 'crypto-js';

const key = 'C3F2D8228227742B18ACC8F883F67F11-xj';
const iv: any = '97EF1845E6E1FC4CDDBB55B3DA89F80D-wwt';

export const encrypt = (data: string | CryptoJS.lib.WordArray) => {
  // 生成哈希值
  return CryptoJS.AES.encrypt(data, key, {
    iv,
  }).toString();
};
export const decrypt = (data: string | CryptoJS.lib.CipherParams) => {
  return CryptoJS.AES.decrypt(data, key, {
    iv,
  }).toString(CryptoJS.enc.Utf8);
};
export const md5 = (data: string | CryptoJS.lib.WordArray) => {
  return CryptoJS.MD5(data).toString();
};
export const SHA256 = (data: string | CryptoJS.lib.WordArray) => {
  return CryptoJS.SHA256(data).toString();
};
export default {
  encrypt,
  decrypt,
  md5,
  SHA256,
};
