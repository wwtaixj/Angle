import {
  app,
  BrowserWindow,
  globalShortcut,
  BrowserWindowConstructorOptions,
} from 'electron';
import { resolve } from 'path';
import os from 'os';
import { updateHandle } from './src/updater';
import { windowRendererEventsHandle } from './src/windowRendererEvents';
// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

let mainWindow: BrowserWindow | undefined;

export function createWindow({
  key,
  ...options
}: {
  key: 'ready' | 'activate';
} & BrowserWindowConstructorOptions) {
  mainWindow = new BrowserWindow({
    frame: false,
    icon: resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 430,
    height: 500,
    useContentSize: true,
    autoHideMenuBar: true,
    resizable: true,
    webPreferences: {
      devTools: true,
      contextIsolation: false,
      nodeIntegration: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
    ...options,
  });

  mainWindow.loadURL(process.env.APP_URL);
  mainWindow.setMinimumSize(mainWindow.getSize()[0], mainWindow.getSize()[1]);
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
    if (key === 'ready' && mainWindow) {
      updateHandle({ mainWindow });
      windowRendererEventsHandle({ mainWindow });
    }
  });
}

app.on('ready', () => {
  createWindow({ key: 'ready' });
  // 注册全局快捷键
  const ret = globalShortcut.register('CommandOrControl+F12', () => {
    // 在这里执行你希望触发的操作
    const focusedWindow = BrowserWindow.getFocusedWindow();
    // 如果有活动窗口，则打开开发者工具
    if (focusedWindow) {
      focusedWindow.webContents.openDevTools();
    }
  });
  globalShortcut.register('CommandOrControl+F5', () => {
    mainWindow?.webContents.reload();
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
    createWindow({ key: 'ready' });
  }
});
