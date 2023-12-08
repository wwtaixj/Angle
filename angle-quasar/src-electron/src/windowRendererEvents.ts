import { BrowserWindow, ipcMain } from 'electron';
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
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('maximized');
  });
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('unmaximized');
  });
}
