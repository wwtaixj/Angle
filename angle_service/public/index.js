import { decrypt, encrypt } from '../util/cryptoJs.js';
import db from '../db/index.js';
// corsky:表示cors跨域
export const corsky = (req, res, next) => {
  // CORS→Cross Origin Resource Sharing
  const allwo_origin = ['loose.net.cn', 'localhost'];
  // 设置可以用如下三行的写法,也可以用对象去写即res.set({}).二选一即可
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  // res.header("Access-Control-Allow-Methods","PUT,POST,GET,PATCH,DELETE,OPTIONS");
  // req.get("host")这个方法是获取请求者的域名
  // allwo_origin.includes(req.get("host"))这段代码的意思就是如果请求的域名包含在allwo_origin数组中
  // 思路就是如果请求者的域名是我们是想给的域名那么就允许跨域,否则不允许跨域
  // console.log("请求者域名Origin:", req.get("Origin"));
  // console.log("请求者域名host:", req.get("host"));
  // console.log(allwo_origin.includes(req.get("host")));
  // req.get()这个方法,获取的是控制台Network，里面的属性名为Origin的属性值,还可以获取属性名为host的属性值
  if (allwo_origin.includes(req.get('host').split(':')[0])) {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Content-Type,Content-Length, Authorization, Accept,X-Requested-With',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,PATCH,DELETE,OPTIONS',
    });
    // 跨域请求CORS中的预请求
    if (req.method === 'OPTIONS') {
      res.sendStatus(200); /*让options请求快速返回*/
    } else {
      next();
    }
  } else {
    // 401表示服务器限值你访问
    res.send({
      status: 401,
      message: '服务器限制访问!',
      data: [],
    });
  }
};
// 登录超时时长
const LOGIN_TIMEOUT = 8 * 60 * 60 * 1000;

/**
 * token 校验
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const authentication = async (req, res, next) => {
  let return_code = '1000';
  try {
    const headerUserName = decrypt(req.headers.username);
    const [username, oldDate] = decrypt(req.headers.token).split(',');
    if (!headerUserName || !username) {
      return_code = '1001';
      throw new Error('无权访问');
    }
    if (headerUserName !== username) {
      return_code = '1001';
      throw new Error('身份信息错误');
    }
    if (Date.now() - new Date(Number(oldDate)).getTime() > LOGIN_TIMEOUT) {
      return_code = '1002';
      throw new Error('登录超时');
    }
    next();
  } catch (e) {
    console.log(e);
    let { message, code } = e;
    if (code) {
      return_code = code;
      message = '身份认证异常！';
    }
    return res.json({
      return_code,
      message,
    });
  }
};

/**
 * API permission check
 * @param {*} req
 * @param {*} res
 */
export const apiPermission = async (req, res, next) => {
  let return_code = '1';
  try {
    const headerUserName = decrypt(req.headers.username);
    const sql = `SELECT api_permissions.api_name, api_permissions.api_type
    FROM users
    JOIN roles ON users.role_id = roles.id
    JOIN roles_relation_api_permissions ON roles.id = roles_relation_api_permissions.role_id
    JOIN api_permissions ON roles_relation_api_permissions.api_permission_id = api_permissions.id
    WHERE users.username = ?`;

    const [userList] = await db.query(sql, [headerUserName]);
    if (userList.length === 0) {
      return_code = '1003';
      throw new Error('此账号没有权限');
    }
    const method = req.method.toLocaleLowerCase();
    const url = req.originalUrl.split('?')[0];
    if (!userList.some((i) => i.api_name === url && i.api_type === method)) {
      return_code = '1004';
      throw new Error('账号权限不足');
    }
    // 下一步
    next();
  } catch (e) {
    console.log(e);
    let { message, code } = e;
    if (code) {
      return_code = code;
      message = 'API权限异常';
    }
    return res.json({
      return_code,
      message,
    });
  }
};
