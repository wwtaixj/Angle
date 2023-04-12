import CryptoJS from 'crypto-js';

const key = 'C3F2D8228227742B18ACC8F883F67F11-xj';
const iv = '97EF1845E6E1FC4CDDBB55B3DA89F80D-wwt'
export const encrypt = (data: any) => {
  // 生成哈希值
  return CryptoJS.AES.encrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  }).toString()

}
export const decrypt = (data: any) => {
  return CryptoJS.AES.decrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  }).toString()
}
export default {
  encrypt,
  decrypt
}
