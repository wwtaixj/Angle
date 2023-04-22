import db from '../db/index.js';
import tool from '../util/tool.js';
import { decrypt, encrypt } from '../util/cryptoJs.js';

/**
 * /api/user 获取所有用户
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function getAllUser(req, res) {
  let url = req.url,
    return_code;
  const method = req.method;
  const initParams = tool.initParams(url);
  try {
    const { username, avatarUrl, label, phone, age } = initParams;
    if (url.indexOf('?') === -1) {
      const [rows] = await db.query('select * from users');
      res.send({
        return_code: 0,
        message: '获取用户列表数据成功！',
        data: rows,
      });
    } else {
      // 准备查询语句
      const sql = `SELECT * FROM users
        WHERE 1=1
          ${username ? 'AND username LIKE ?' : ''}
          ${avatarUrl ? 'AND avatarUrl LIKE ?' : ''}
          ${label ? 'AND label LIKE ?' : ''}
          ${phone ? 'AND phone LIKE ?' : ''}
          ${age ? 'AND age LIKE ?' : ''}`;
      // 过滤空字符串和格式转换
      const params = [username, avatarUrl, label, phone, age]
        .filter(Boolean)
        .map((value) => `%${value}%`);
      const [rows] = await db.query(sql, params);
      res.send({
        return_code: '0',
        message: '查询用户列表数据成功！',
        data: rows,
      });
    }
  } catch (e) {
    console.log(e);
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
/**
 * /api/user 删除用户
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function deleteUser(req, res) {
  let return_code = '1';
  try {
    // 解析参数
    const sql = 'delete from users where id = ? , username = ? ';
    if (!initParams['id'] && !initParams['username']) {
      return_code = '-1';
      throw new Error('参数错误');
    }
    const [result] = await db.query(sql, [
      initParams['id'],
      initParams['username'],
    ]);
    if (result.serverStatus === 2) {
      res.send({
        return_code: '0',
        message: '删除用户列表数据成功！',
      });
    }
  } catch (e) {
    console.log(e);
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
/**
 * /api/user 更新用户
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function updateUser(req, res, next) {
  let return_code = '1';
  try {
    // 解析参数
    let { avatarUrl, gender, label, phone, age, username } = req.body;
    username = decrypt(username);
    phone = decrypt(phone);
    if (!username) {
      return_code = '-1';
      throw new Error('用户名不能为空');
    }
    const sql =
      'UPDATE users SET avatar_url = ?, gender = ?, label = ?, phone = ?, age = ? WHERE username = ?';
    const [result] = await db.query(sql, [
      avatarUrl,
      gender,
      label,
      phone,
      age,
      username,
    ]);
    if (result.serverStatus === 2) {
      res.send({
        return_code: '0',
        message: '更新用户数据成功！',
      });
    }
  } catch (e) {
    console.log(e);
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
/**
 * /api/user 新增用户
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function addUser(req, res) {
  let return_code = '1';
  try {
    // 解析参数
    const { avatarUrl, gender, label, phone, age, username, password } =
      req.body;
    if (!username || !password) {
      return_code = '-1';
      throw new Error('参数错误');
    }
    const sql =
      'INSERT INTO users (username, avatar_url, gender, label, phone, age) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.query(sql, [
      decrypt(username),
      password,
      avatarUrl,
      gender,
      label,
      decrypt(phone),
      age,
    ]);
    if (result.serverStatus === 2) {
      res.send({
        return_code: '0',
        message: '注册用户成功！',
      });
    }
  } catch (e) {
    console.log(e);
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

/**
 * /api/v1/user 修改密码
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function changePassword(req, res) {
  let return_code = '1';
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
    console.log(e);
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