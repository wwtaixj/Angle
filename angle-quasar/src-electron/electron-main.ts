import { app, BrowserWindow, globalShortcut } from 'electron';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import path from 'path';
import os from 'os';
import { autoUpdater } from 'electron-updater';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

let mainWindow: BrowserWindow | undefined;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      devTools: true,
      contextIsolation: false,
      nodeIntegration: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(
        __dirname,
        process.env.QUASAR_ELECTRON_PRELOAD as string
      ),
    },
  });

  mainWindow.loadURL(process.env.APP_URL as string);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }
  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

app.whenReady().then(() => {
  // 注册全局快捷键
  const ret = globalShortcut.register('F1', () => {
    // 在这里执行你希望触发的操作
    const focusedWindow = BrowserWindow.getFocusedWindow();
    // 如果有活动窗口，则打开开发者工具
    if (focusedWindow) {
      focusedWindow.webContents.openDevTools();
    }
  });
  if (!ret) {
    console.error('注册快捷键失败！');
  }
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow();
  }
});

// 配置自动更新的服务器地址和应用程序包的基本信息
autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'your-github-username',
  repo: 'your-repository-name',
});

// 监听自动更新事件，当有可用更新时触发
autoUpdater.on('update-available', () => {
  // 在这里可以提示用户有新的版本可用
});

// 监听自动更新下载进度
autoUpdater.on('download-progress', (progress) => {
  // 在这里可以显示下载进度给用户
});

// 监听自动更新完成事件
autoUpdater.on('update-downloaded', () => {
  // 在这里可以提示用户下载完成，并要求重启应用程序以应用更新
});

// 检查更新
autoUpdater.checkForUpdates();
