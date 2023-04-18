import db from '../db/index.js';
import tool from '../util/tool.js';
import { decrypt, encrypt } from '../util/cryptoJs.js';

export async function getAllUser(req, res) {
  let url = req.url;
  let method = req.method;
  let initParams = tool.initParams(url);
  if (method === 'GET') {
    if (url.indexOf('?') === -1) {
      const [rows] = await db.query('select * from users');
      res.send({
        return_code: 0,
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
        return_code: 0,
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
          return_code: 0,
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
          return_code: 0,
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
        return_code: 0,
        message: '删除用户列表数据成功！',
      });
    }
  }
}

export async function changePassword(req, res) {
  let return_code;
  try {
    const { username, password, newPassword } = req.body;
    if (!(username && password && newPassword)) {
      return_code = '-1';
      throw new Error('参数错误');
    }
    const usernameDec = decrypt(username);
    const passwordDec = decrypt(password);

    const [[user]] = await db.query(
      `select * from users where username = '${usernameDec}'`
    );

    if (!user) {
      return_code = '-2';
      throw new Error('用户名错误');
    }

    if (passwordDec !== user.password) {
      return_code = '-3';
      throw new Error('密码错误');
    }
    const [result] = await db.query(
      `UPDATE users SET password = '${decrypt(
        newPassword
      )}' WHERE username = '${usernameDec}'`
    );
    if (result.serverStatus !== 2) {
      return_code = '-4';
      throw new Error('更新密码失败!');
    }
    res.send({
      return_code: '0',
      message: '更新密码成功！',
    });
  } catch (e) {
    let { message, code } = e;
    if (code) {
      return_code = code;
      message = '系统内部异常！';
    }
    return res.json({
      return_code,
      message,
    });
  }
}
