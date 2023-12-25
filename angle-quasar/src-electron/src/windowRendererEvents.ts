import { BrowserWindow, ipcMain } from 'electron';
import { createWindow } from '../electron-main';
export function windowRendererEventsHandle({
  mainWindow,
}: {
  mainWindow: BrowserWindow;
}) {
  ipcMain.on('close', () => {
    mainWindow.close();
  });
  ipcMain.on('minimize', () => {
    mainWindow.minimize();
  });
  ipcMain.on('maximize', () => {
    mainWindow.maximize();
  });
  ipcMain.on('unmaximize', () => {
    mainWindow.unmaximize();
  });
  // 监听从渲染进程发送过来的 change-window-size 事件
  ipcMain.on('change-window-size', (event, { width, height, resizable }) => {
    if (mainWindow) {
      mainWindow.setSize(width, height);
      mainWindow.resizable = resizable;
      mainWindow.setMinimumSize(width, height);
    }
  });
  // 监听从渲染进程发送过来的 change-window-size 事件
  ipcMain.on('create-window', (event, options) => {
    if (mainWindow) {
      createWindow({
        ...options,
      });
    }
  });
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('maximized');
  });
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('unmaximized');
  });
}
