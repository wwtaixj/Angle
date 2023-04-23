import CryptoJS from 'crypto-js';

const key = import.meta.env.AUTH_ENCRYPTION_KEY;
const iv = import.meta.env.AUTH_ENCRYPTION_IV;
export const encrypt = (data: any) => {
	// 生成哈希值
	return CryptoJS.AES.encrypt(data, key, {
		iv
	}).toString();
};
export const decrypt = (data: any) => {
	return CryptoJS.AES.decrypt(data, key, {
		iv
	}).toString(CryptoJS.enc.Utf8);
};
export const md5 = (data) => {
	return CryptoJS.MD5(data).toString();
};
export const SHA256 = (data) => {
	return CryptoJS.SHA256(data).toString();
};
export default {
	encrypt,
	decrypt,
	md5,
	SHA256
};
