import express from 'express';
import router from './router/index.js';
import Public from './public/index.js';
// import { send } from "express/lib/response";
import express_art_template from 'express-art-template';
import path from 'path';
const app = express();

app.use(Public.corsky);
app.use(express.json());
app.use(express.urlencoded());

const port = 9310;
app.use('/api', router);

app.listen(port, '0.0.0.0', () => {
  console.log('server running at http://0.0.0.0:9310');
});
const __dirname = './';
// 在一个项目中会有一个静态资源文件夹
app.use(express.static(path.join(__dirname, 'static/images'))); //设置在public下查找资源(以public为根去找静态资源)

// 这四句代码，模板引擎初始化工作
// 引入express-art-template 使用对应的引擎
app.engine('html', express_art_template);
// 项目环境的设置
// 生产环境（线上） production
// 开发环境  development
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production',
});
// 设置在哪一个路径下查找模板文件
app.set('views', path.join(__dirname, 'views'));
// 设置模板的后缀名
app.set('view engine', 'html');
