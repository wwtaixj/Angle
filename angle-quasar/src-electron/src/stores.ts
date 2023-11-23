/* eslint-disable @typescript-eslint/no-explicit-any */
const { ipcMain } = require('electron');
const Store = require('electron-store');
const store = new Store();

export function initStores() {
  ipcMain.on('setLocalStorage', (event, key, value) => {
    store.set(key, value);
  });
  ipcMain.handle('getLocalStorage', (event, key) => {
    return store.get(key);
  });
}
export function set(key: any, value: any) {
  store.set(key, value);
}

export function get(key: any) {
  return store.get(key);
}
