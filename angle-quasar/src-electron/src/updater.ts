import { BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';

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
    mainWindow.webContents.send('update-available');
  });

  // 监听更新下载完成事件
  autoUpdater.on('update-downloaded', () => {
    console.log('update-downloaded');
    mainWindow.webContents.send('update-downloaded');
  });

  // 监听更新下载进度事件
  autoUpdater.on('download-progress', (progressObj) => {
    console.log('progressObj', progressObj);
    // 向渲染进程发送消息，更新进度条
    mainWindow.webContents.send('download-progress', progressObj);
  });

  // 监听渲染进程的消息，执行更新操作
  ipcMain.on('update-app', () => {
    autoUpdater.quitAndInstall();
  });
  ipcMain.on('update-available', () => {
    autoUpdater.checkForUpdates();
  });
}
