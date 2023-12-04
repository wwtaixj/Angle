import { app, BrowserWindow, globalShortcut } from 'electron';
import { resolve } from 'path';
import os from 'os';
import { updateHandle } from './src/updater';
// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

let mainWindow: BrowserWindow | undefined;

function createWindow(key?: number) {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    autoHideMenuBar: false,
    webPreferences: {
      devTools: true,
      contextIsolation: false,
      nodeIntegration: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    // mainWindow.webContents.on('devtools-opened', () => {
    //   mainWindow?.webContents.closeDevTools();
    // });
  }
  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();
    if (key === 1 && mainWindow) {
      updateHandle({ mainWindow });
    }
  });
}

app.on('ready', () => {
  createWindow(1);
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
});

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow(2);
  }
});
