import { BrowserWindow, ipcMain, dialog, MessageBoxOptions } from 'electron';
const { autoUpdater } = require('electron-updater');
// const fs = require('fs-extra');
// const path = require('path');

// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写
export function updateHandle({ mainWindow }: { mainWindow: BrowserWindow }) {
  // 设置更新服务器的URL
  autoUpdater.setFeedURL({
    provider: 'generic',
    url: 'http://localhost:9310/update',
  });

  // 每次启动时检查更新
  autoUpdater.checkForUpdates();

  // 监听更新可用事件
  autoUpdater.on('update-available', () => {
    // 向渲染进程发送消息，提示有新版本
    //mainWindow.webContents.send('update-available');
    const options: MessageBoxOptions = {
      type: 'info',
      title: '检测到新版本',
      message: '是否立即更新？',
      buttons: ['立即更新', '取消'],
    };
    dialog.showMessageBox(mainWindow, options).then(({ response }) => {
      if (response === 0) {
        // 点击立即更新，向主进程发送消息，执行更新操作
        autoUpdater.quitAndInstall();
      }
    });
  });

  // 监听更新下载完成事件
  autoUpdater.on('update-downloaded', () => {
    const options: MessageBoxOptions = {
      type: 'info',
      title: '更新已下载',
      message: '应用程序将在几秒钟后退出并安装更新',
    };
    dialog.showMessageBox(mainWindow, options);
  });

  // 监听更新下载进度事件
  autoUpdater.on('download-progress', (progressObj: number) => {
    // 向渲染进程发送消息，更新进度条
    mainWindow.webContents.send('download-progress', progressObj);
  });

  // 监听渲染进程的消息，执行更新操作
  ipcMain.on('update-app', () => {
    autoUpdater.quitAndInstall();
  });
}
