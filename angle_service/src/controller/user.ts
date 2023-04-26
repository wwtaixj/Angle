import db from '../db';
import tool from '../utils/tool';
import { decrypt, encrypt } from '../utils/cryptoJs';

/**
 * /api/user 获取所有用户
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function getAllUser(req: any, res: any) {
  let status: string;
  try {
    const initParams: any = tool.initParams(req.url);
    const { username, avatarUrl, label, phone, age } = initParams;
    if (req.url.indexOf('?') === -1) {
      const [rows] = await db.query('select * from users');
      res.send({
        status: '0',
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
        status: '0',
        message: '查询用户列表数据成功！',
        data: rows,
      });
    }
  } catch (e) {
    console.log(e);
    let { message, code } = e;
    if (code) {
      status = code;
      message = '系统内部异常！';
    }
    return res.json({
      status,
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
export async function deleteUser(req: any, res: any) {
  let status = '1';
  try {
    const initParams: any = tool.initParams(req.url);
    // 解析参数
    const sql = 'delete from users where id = ? , username = ? ';
    if (!initParams['id'] && !initParams['username']) {
      status = '-1';
      throw new Error('参数错误');
    }
    const [result] = await db.query(sql, [
      initParams['id'],
      initParams['username'],
    ]);
    if (result['serverStatus'] === 2) {
      res.send({
        status: '0',
        message: '删除用户列表数据成功！',
      });
    }
  } catch (e) {
    console.log(e);
    let { message, code } = e;
    if (code) {
      status = code;
      message = '系统内部异常！';
    }
    return res.json({
      status,
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
  let status = '1';
  try {
    // 解析参数
    let { avatarUrl, gender, label, phone, age, username } = req.body;
    username = decrypt(username);
    phone = decrypt(phone);
    if (!username) {
      status = '-1';
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
    if (result['serverStatus'] === 2) {
      res.send({
        status: '0',
        message: '更新用户数据成功！',
      });
    }
  } catch (e) {
    console.log(e);
    let { message, code } = e;
    if (code) {
      status = code;
      message = '系统内部异常！';
    }
    return res.json({
      status,
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
  let status = '1';
  try {
    // 解析参数
    const { avatarUrl, gender, label, phone, age, username, password } =
      req.body;
    if (!username || !password) {
      status = '-1';
      throw new Error('参数错误');
    }
    const sql =
      'INSERT INTO users (username, password, avatar_url, gender, label, phone, age) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.query(sql, [
      decrypt(username),
      decrypt(password),
      avatarUrl,
      gender,
      label,
      decrypt(phone),
      age,
    ]);
    if (result['serverStatus'] === 2) {
      res.send({
        status: '0',
        message: '注册用户成功！',
      });
    }
  } catch (e) {
    console.log(e);
    let { message, code } = e;
    if (code) {
      status = code;
      message = '系统内部异常！';
    }
    return res.json({
      status,
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
  let status = '1';
  try {
    const { username, password, newPassword } = req.body;
    if (!(username && password && newPassword)) {
      status = '-1';
      throw new Error('参数错误');
    }
    const usernameDec = decrypt(username);
    const passwordDec = decrypt(password);

    const userList = await db.query(
      `select * from users where username = '${usernameDec}'`
    );
    const user = userList[0][0];
    if (!user) {
      status = '-2';
      throw new Error('用户名错误');
    }

    if (passwordDec !== user.password) {
      status = '-3';
      throw new Error('密码错误');
    }
    const [updateUser] = await db.query(
      `UPDATE users SET password = '${decrypt(
        newPassword
      )}' WHERE username = '${usernameDec}'`
    );
    if (updateUser['serverStatus'] !== 2) {
      status = '-4';
      throw new Error('更新密码失败!');
    }
    res.send({
      status: '0',
      message: '更新密码成功！',
    });
  } catch (e) {
    console.log(e);
    let { message, code } = e;
    if (code) {
      status = code;
      message = '系统内部异常！';
    }
    return res.json({
      status,
      message,
    });
  }
}
