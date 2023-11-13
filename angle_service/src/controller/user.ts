import db from '../db';
import tool from '../utils/tool';
import nodeMailer from 'nodemailer';
import { decrypt, generateRandomCode } from '@/utils';
import { GlobalResponse, GlobalRequest } from '@/types';
import { RegisterParams, SendVerificationCodeParams } from './types';
import verCodeCache from '@/stores/VerificationCode';

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
    const { username, avatarUrl, tag, phone, age } = initParams;
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
          ${tag ? 'AND tag LIKE ?' : ''}
          ${phone ? 'AND phone LIKE ?' : ''}
          ${age ? 'AND age LIKE ?' : ''}`;
      // 过滤空字符串和格式转换
      const params = [username, avatarUrl, tag, phone, age]
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
    let { avatarUrl, gender, tag, phone, age, username } = req.body;
    username = decrypt(username);
    phone = decrypt(phone);
    if (!username) {
      status = '-1';
      throw new Error('用户名不能为空');
    }
    const sql =
      'UPDATE users SET avatar_url = ?, gender = ?, tag = ?, phone = ?, age = ? WHERE username = ?';
    const [result] = await db.query(sql, [
      avatarUrl,
      gender,
      tag,
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
    const { avatarUrl, gender, tag, phone, age, username, password } = req.body;
    if (!username || !password) {
      status = '-1';
      throw new Error('参数错误');
    }
    const sql =
      'INSERT INTO users (username, password, avatar_url, gender, tag, phone, age) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.query(sql, [
      decrypt(username),
      decrypt(password),
      avatarUrl,
      gender,
      tag,
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

export async function sendVerificationCode(
  req: GlobalRequest<SendVerificationCodeParams>,
  res: GlobalResponse<null>
) {
  let status = '1';
  try {
    const { email } = req.body;
    const verCode = generateRandomCode(6);
    // 创建一个SMTP传输对象
    const transporter = nodeMailer.createTransport({
      service: 'QQ邮箱', // 使用的邮箱服务提供商，例如Gmail、QQ邮箱等
      auth: {
        user: '761359511@qq.com', // 发送验证码的邮箱地址
        pass: 'cfmmlhngdxeabbhe', // 邮箱密码或授权码
      },
    });

    // 定义要发送的邮件内容
    const mailOptions = {
      from: '761359511@qq.com', // 发件人邮箱
      to: email, // 收件人邮箱
      subject: `电子邮件验证码：${verCode}`, // 邮件主题
      html: `Angle收到了将<span style="font-weight: bold; color: #1976d2;">${email}</span>申请账号的请求。</br>
       请使用此验证码完成账号注册:&nbsp;&nbsp; <span style="font-weight: bold; font-size: 20px;">${verCode}</span>`, // 邮件正文
    };

    // 发送邮件
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        status = '2';
        throw new Error('发送邮件失败');
      } else {
        verCodeCache.set(email, verCode, 60);
        return res.json({
          status: '0',
          message: '邮件发送成功',
        });
      }
    });
  } catch (e) {
    console.log(e);
    let { code, message } = e;
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
export async function register(
  req: GlobalRequest<RegisterParams>,
  res: GlobalResponse<null>
) {
  let status = '1';
  try {
    // 解析参数
    const { username, password, email, verCode } = req.body;
    if (!username || !password || !email) {
      status = '-1';
      throw new Error('参数错误');
    }
    console.log(verCodeCache.get(email));
    if (!verCodeCache.get(email)) throw new Error('验证码超时');
    if (verCodeCache.get(email) !== verCode) {
      status = '-2';
      throw new Error('验证码错误');
    }
    const sql =
      'INSERT INTO users (username, password, email, status) VALUES (?, ?, ?> ?)';
    const [result] = await db.query(sql, [
      decrypt(username),
      decrypt(password),
      email,
      '1',
    ]);
    if (result['serverStatus'] === 2) {
      res.send({
        status: '0',
        message: '注册成功!',
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
