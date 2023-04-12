class WebStorage {
  storage: Storage;
  constructor(storage: Storage) {
    this.storage = storage;
  }
  set(key: string, value: any): void {
    const valueStr = JSON.stringify(value);
    this.storage.setItem(key, valueStr);
  }
  get(key: string, def: any = null): any {
    const valueStr = this.storage.getItem(key);
    if (!valueStr) return def;
    return JSON.parse(valueStr);
  }
  remove(key: string) {
    this.storage.removeItem(key);
  }
  clear(): void {
    this.storage.clear();
  }
}
export const sStorage = new WebStorage(sessionStorage);
export const lStorage = new WebStorage(localStorage);
