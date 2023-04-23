import db from '../db';
import multer from 'multer';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //指定文件路径存储地
    cb(null, './static/images/');
  },
  filename: function (req, file, cb) {
    //指定存储后的文件名(有两个问题)
    //1文件名重复覆盖  时间戳
    //2后缀名发生改变
    console.log('---', file);
    //获取后缀名
    let exts = file.originalname.split('.');
    let ext = exts[exts.length - 1];
    let tepname =
      new Date().getTime() + parseInt((Math.random() * 9999).toString());
    //拼接名字
    cb(null, `${tepname}.${ext}`);
  },
});
export const upload = multer({
  storage: storage,
});

export async function uploadPhoto(req, res) {
  //hehe 要上传图片数据的key值 必须和前端保持统一   {   'hehe':图片数据}
  // console.log(req.file);
  // { fieldname: 'images',//接受数据库的key值
  //     originalname: '2019-12-06_102017.jpg',//原始名字
  //     encoding: '7bit', //转码
  //     mimetype: 'image/jpeg', //文件类型
  //     destination: './uploads', //存储位置
  //     filename: 'aaa.jpg',//文件名字
  //     path: 'uploads\\aaa.jpg',//文件地址
  //     size: 33479 }
  let { size, mimetype, path } = req.file;
  console.log(mimetype);
  let types = ['jpeg', 'jpg', 'png', 'gif']; //允许上传的类型
  let tmpType = mimetype.split('/')[1];

  console.log(tmpType);
  if (size > 5000000) {
    return res.send({ err: -1, msg: '上传的内容不能超过5000000' });
  } else if (types.indexOf(tmpType) == -1) {
    return res.send({ err: -2, msg: '上传的类型错误' });
  } else {
    // 服务器静态化目录 app.use('/filename',express.static(path.join(process.cwd(),'./uploads')));
    let url = `${req.file.filename}`;
    const http = 'http://192.168.68.125:3000/' + url;
    let Studens = db.model('studens');
    Studens.insert({ hdname: 'dsadas', hdjieshao: http }, (err, data) => {
      console.log(err);
      // res.send(data)
      res.send({ err: 0, msg: '上传成功', img: url });
    });
  }
}
