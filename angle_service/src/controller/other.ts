import fs from 'fs';
import { resolve, join } from 'path';
import { Server } from 'socket.io';
export function updateApp(io: Server) {
  // 文件路径和信息
  const folderPath = resolve(__dirname, '../../public/update/');
  let lastModifiedTime = null;
  // 监听文件变化
  fs.watch(folderPath, (event, filename) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.log('读取文件夹时出错：', err);
        return;
      }
      const regex = /Angle/; // 设置匹配的字符或模式
      const fileNames = files.filter((file) => regex.test(file));
      const filePath = join(folderPath, fileNames.toString());
      if (event === 'change') {
        const stats = fs.statSync(filePath);
        const modifiedTime = stats.mtime.toISOString();

        // 检查文件是否有变化
        if (modifiedTime !== lastModifiedTime) {
          lastModifiedTime = modifiedTime;
          const version = filePath
            .substring(filePath.indexOf('public') + 6)
            .replace(/\\/g, '/');

          // 向所有已连接的客户端发送更新通知
          io.emit('updateAvailable', {
            url: `http://${process.env.UPLOAD_URL}:${process.env.LISTEN_PORT}${version}`,
          });
        }
      }
    });
  });
}
