import CryptoJS from 'crypto-js';

// 加密
export const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, process.env.AUTH_ENCRYPTION_KEY, {
    iv: CryptoJS.enc.Utf8.parse(process.env.AUTH_ENCRYPTION_IV),
  }).toString();
};
// 解密
export const decrypt = (data: string | CryptoJS.lib.CipherParams) => {
  return CryptoJS.AES.decrypt(data, process.env.AUTH_ENCRYPTION_KEY, {
    iv: CryptoJS.enc.Utf8.parse(process.env.AUTH_ENCRYPTION_IV),
  }).toString(CryptoJS.enc.Utf8);
};
export const md5 = (data: any) => {
  return CryptoJS.MD5(data).toString();
};
export const SHA256 = (data: any) => {
  return CryptoJS.SHA256(data).toString();
};
export default {
  encrypt,
  decrypt,
  md5,
  SHA256,
};
