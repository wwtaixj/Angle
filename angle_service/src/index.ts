import express from 'express';
import router from './router/index';
import { corsky } from './utils/index';
// import { send } from "express/lib/response";
import express_art_template from 'express-art-template';
import path from 'path';

const port = 9310;
const __dirname = './';
const app = express();

app.use(corsky);
app.use(express.json());
app.use(express.urlencoded());
app.use('/api', router);

app.listen(port, 'localhost', () => {
  console.log('server running at http://localhost:9310');
});

// 在一个项目中会有一个静态资源文件夹
app.use(express.static(path.join(__dirname, 'public/images'))); //设置在public下查找资源(以public为根去找静态资源)

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
