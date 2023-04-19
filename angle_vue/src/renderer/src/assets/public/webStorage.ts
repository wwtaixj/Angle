import { md5, encrypt, decrypt } from './cryptoJs';
class WebStorage {
  storage: Storage;
  constructor(storage: Storage) {
    this.storage = storage;
  }
  set(key: string, value: any): void {
    const valueStr = encrypt(JSON.stringify(value));
    this.storage.setItem(md5(key), valueStr);
  }
  get(key: string, def: any = null): any {
    const valueStr = this.storage.getItem(md5(key));
    if (!valueStr) return def;
    return JSON.parse(decrypt(valueStr));
  }
  remove(key: string) {
    this.storage.removeItem(md5(key));
  }
  clear(): void {
    this.storage.clear();
  }
}
export const sStorage = new WebStorage(sessionStorage);
export const lStorage = new WebStorage(localStorage);
