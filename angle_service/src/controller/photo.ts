import { GlobalResponse, GlobalRequest } from '@/types';

export async function uploadPhoto(req, res) {
  try {
    const filename = `${req.file.filename}`;
    const url =
      `http://${process.env.UPLOAD_URL}:${process.env.LISTEN_PORT}/upload/images/photo/` +
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
