import db from '../db/index.js';
import tool from '../util/tool.js';

export async function getAllUser(req, res) {
  let url = req.url;
  let method = req.method;
  let initParams = tool.initParams(url);
  if (method === 'GET') {
    if (url.indexOf('?') === -1) {
      const [rows] = await db.query('select * from users');
      res.send({
        status: 0,
        message: '获取用户列表数据成功！',
        data: rows,
      });
    } else {
      let urlKey = Object.keys(initParams)[0];
      const [rows] = await db.query(
        'select * from users where ' +
          urlKey +
          ' like "%' +
          initParams[urlKey] +
          '%"'
      );
      res.send({
        status: 0,
        message: '查询用户列表数据成功！',
        data: rows,
      });
    }
  }
  if (method === 'POST') {
    let body = '';
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', async function () {
      // 解析参数
      body = JSON.parse(body);
      let bodyKey = Object.keys(body);
      let sqlStr = '',
        sqlDataStr = '';
      bodyKey.forEach((item) => {
        sqlStr += item + ',';
        sqlDataStr += '"' + body[item] + '",';
      });
      sqlStr = sqlStr.substring(0, sqlStr.length - 1);

      sqlDataStr = sqlDataStr.substring(0, sqlDataStr.length - 1);

      const [ResultSetHeader] = await db.query(
        'insert into users (' + sqlStr + ') values (' + sqlDataStr + ')'
      );
      if (ResultSetHeader.serverStatus === 2) {
        res.send({
          status: 0,
          message: '添加用户列表数据成功！',
        });
      }
    });
  }
  if (method === 'PUT') {
    let body = '';
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', async function () {
      // 解析参数
      body = JSON.parse(body);
      let bodyKey = Object.keys(body);
      let sqlStr = '';
      bodyKey.forEach((item) => {
        if (item !== 'id') {
          sqlStr += item + '="' + body[item] + '",';
        }
      });
      sqlStr = sqlStr.substring(0, sqlStr.length - 1);
      const [ResultSetHeader] = await db.query(
        'update users set ' + sqlStr + ' where id=' + body.id + ''
      );
      if (ResultSetHeader.serverStatus === 2) {
        res.send({
          status: 0,
          message: '更新用户列表数据成功！',
        });
      }
    });
  }
  if (method === 'DELETE') {
    let urlKey = Object.keys(initParams)[0];
    const [ResultSetHeader] = await db.query(
      'delete from users where ' + urlKey + "='" + initParams[urlKey] + "'"
    );
    if (ResultSetHeader.serverStatus === 2) {
      res.send({
        status: 0,
        message: '删除用户列表数据成功！',
      });
    }
  }
}
