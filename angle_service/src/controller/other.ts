import fs from 'fs';
import path from 'path';
import { Server } from 'socket.io';
export function updateApp(io: Server) {
  console.log(path.resolve(__dirname, '../../public/update'));

  // 文件路径和信息
  const folderPath = 'public/update/';
  let lastModifiedTime = null;
  // 监听文件变化
  fs.watch(folderPath, (event, filename) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.log('读取文件夹时出错：', err);
        return;
      }

      const regex = /angle/; // 设置匹配的字符或模式

      const fileNames = files.filter((file) => regex.test(file));
      console.log('含有"angle"字符的文件名：', fileNames);
      const filePath = folderPath + fileNames;
      if (event === 'change') {
        const stats = fs.statSync(filePath);
        const modifiedTime = stats.mtime.toISOString();

        // 检查文件是否有变化
        if (lastModifiedTime !== null && modifiedTime !== lastModifiedTime) {
          lastModifiedTime = modifiedTime;

          // 向所有已连接的客户端发送更新通知
          io.emit('updateAvailable', {
            url: `http://${process.env.UPLOAD_URL}:${
              process.env.LISTEN_PORT
            }${filePath.substring(filePath.indexOf('public') + 6)}`,
          });
        }
      }
    });
  });
}
