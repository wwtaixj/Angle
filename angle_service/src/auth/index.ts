import { decrypt } from '../utils/cryptoJs';
import db from '../db';

/**
 * token 校验
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const authentication = async (req, res, next) => {
  let status = '1000';
  try {
    const headerUserName = decrypt(req.headers.username);
    const [username, oldDate] = decrypt(req.headers.token).split(',');
    if (!headerUserName || !username) {
      status = '1001';
      throw new Error('无权访问');
    }
    if (headerUserName !== username) {
      status = '1001';
      throw new Error('身份信息错误');
    }
    // 判断登录时长
    if (
      Date.now() - new Date(Number(oldDate)).getTime() >
      3600000 * Number(process.env.LOGIN_TIMEOUT)
    ) {
      status = '1002';
      throw new Error('登录超时');
    }
    next();
  } catch (e) {
    console.log(e);
    let { message, code } = e;
    if (code) {
      status = code;
      message = '身份认证异常！';
    }
    return res.json({
      status,
      message,
      data: null,
    });
  }
};

/**
 * API permission check
 * @param {*} req
 * @param {*} res
 */
export const apiPermission = async (req, res, next) => {
  let status = '1';
  try {
    const headerUserName = decrypt(req.headers.username);
    const sql = `SELECT api_permissions.api_name, api_permissions.api_type
    FROM users
    JOIN roles ON users.role_id = roles.id
    JOIN roles_relation_api_permissions ON roles.id = roles_relation_api_permissions.role_id
    JOIN api_permissions ON roles_relation_api_permissions.api_permission_id = api_permissions.id
    WHERE users.username = ?`;

    const [userList] = await db.query(sql, [headerUserName]);
    if ((userList as Array<any>).length === 0) {
      status = '1003';
      throw new Error('此账号没有权限');
    }
    const method = req.method.toLocaleLowerCase();
    const url = req.originalUrl.split('?')[0];
    if (
      !(userList as Array<any>).some(
        (i) => i.api_name === url && i.api_type === method
      )
    ) {
      status = '1004';
      throw new Error('账号权限不足');
    }
    // 下一步
    next();
  } catch (e) {
    console.log(e);
    let { message, code } = e;
    if (code) {
      status = code;
      message = 'API权限异常';
    }
    return res.json({
      status,
      message,
      data: null,
    });
  }
};
