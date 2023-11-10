/*
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-13 15:43:30
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-13 18:10:35
 * @FilePath: \angle-quasar\src\utils\webStorage.ts
 */
import { md5, encrypt, decrypt } from './cryptoJs';

function WebStorage(storage: Storage, crypto = true) {
  const set = (key: string, value: unknown): void => {
    storage.setItem(
      md5(key),
      crypto ? encrypt(JSON.stringify(value)) : JSON.stringify(value)
    );
  };
  const get = <T = unknown>(key: string, def = null) => {
    const valueStr = storage.getItem(md5(key));
    try {
      return (valueStr ? JSON.parse(decrypt(valueStr)) : def) as T;
    } catch (e) {
      throw new Error('WebStorage is set error: ' + e);
    }
  };
  const remove = (key: string) => {
    storage.removeItem(md5(key));
  };
  const clear = (): void => {
    storage.clear();
  };
  return {
    set,
    get,
    remove,
    clear,
  };
}
export const sStorage = WebStorage(sessionStorage);
export const lStorage = WebStorage(localStorage);
