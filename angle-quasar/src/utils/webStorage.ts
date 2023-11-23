import { LocalStorage, SessionStorage } from 'quasar';

function WebStorage(storage: LocalStorage | SessionStorage) {
  const set = (key: string, value: unknown): void => {
    storage.set(key, value);
  };
  const get = <T = unknown>(key: string) => {
    const valueStr = storage.getItem(key);
    try {
      return valueStr as T;
    } catch (e) {
      throw new Error('WebStorage is set error: ' + e);
    }
  };
  const remove = (key: string) => {
    storage.remove(key);
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
export const sStorage = WebStorage(SessionStorage);
export const lStorage = WebStorage(LocalStorage);
