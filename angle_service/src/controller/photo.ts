import multer from 'multer';
import iconv from 'iconv-lite';
import { formatDate } from '../utils';

const storagePath = 'public/upload/images/';
const storage = multer.diskStorage({
  destination(req, file, cb) {
    //指定文件路径存储地
    cb(null, storagePath);
  },
  filename(req, file, cb) {
    try {
      //获取后缀名
      const ext = file.originalname.split('.').pop();
      const filename = file.originalname.split('.').shift();
      // 将 ASCII 字符串转换为 Buffer 对象
      const asciiBuffer = Buffer.from(filename, 'ascii');
      // 将 Buffer 对象解码为 UTF-8 编码的字符串
      const utf8String = iconv.decode(asciiBuffer, 'utf-8');
      cb(null, `${utf8String}_w${formatDate()}.${ext}`);
    } catch (e) {
      console.log('set upload images filename error:' + e);
    }
  },
});
export const upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('只支持图片类型'));
    }
    cb(null, true);
  },
});

export async function uploadPhoto(req, res) {
  try {
    const filename = `${req.file.filename}`;
    const url =
      `http://${process.env.UPLOAD_IMAGES_RETURN_URL}:${process.env.LISTEN_PORT}/upload/images/` +
      filename;
    console.log(url);
    res.send({
      success: true,
      message: '上传成功！',
      url,
    });
  } catch (e) {
    console.log('uploadPhoto api error:' + e);
    res.send({
      success: false,
      message: e.message,
      url: null,
    });
  }
}
