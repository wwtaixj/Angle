import {
  selectUserInfoLikeAll,
  deleteUserDB,
  updateUserDB,
  addUserDB,
  selectUserInfoWhereAllDB,
  selectUserInfoExcludeName,
} from '../db';
import tool from '../utils/tool';
import nodeMailer from 'nodemailer';
import { decrypt, generateRandomCode } from '@/utils';
import { GlobalResponse, GlobalRequest } from '@/types';
import { RegisterParams, SendVerificationCodeParams } from './types';
import verCodeCache from '@/stores/VerificationCode';

/**
 * /api/user 获取登录用户好友列表
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function getFriends(req: any, res: any) {
  let status: string;
  try {
    const { username } = req.headers;
    const [rows] = await selectUserInfoExcludeName(decrypt(username));
    res.send({
      status: '0',
      message: '获取好友列表数据成功！',
      data: rows,
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
    if (req.url.indexOf('?') === -1) {
      const [rows] = await selectUserInfoLikeAll();
      res.send({
        status: '0',
        message: '获取用户列表数据成功！',
        data: rows,
      });
    } else {
      const [rows] = await selectUserInfoLikeAll(initParams);
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

    if (!initParams['id'] && !initParams['username']) {
      status = '-1';
      throw new Error('参数错误');
    }
    const [result] = await deleteUserDB(initParams);
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
    let { avatarUrl, gender, tag, phone, age, username, email } = req.body;
    username = decrypt(username);
    phone = decrypt(phone);
    if (!username) {
      status = '-1';
      throw new Error('用户名不能为空');
    }

    const [result] = await updateUserDB({
      avatarUrl,
      gender,
      tag,
      phone,
      age,
      username,
      email,
    });
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
    const { avatarUrl, gender, tag, phone, age, username, password, email } =
      req.body;
    if (!username || !password) {
      status = '-1';
      throw new Error('参数错误');
    }

    const [result] = await addUserDB({
      avatarUrl,
      gender,
      tag,
      phone,
      age,
      username,
      password,
      email,
    });
    if (result['serverStatus'] === 2) {
      res.send({
        status: '0',
        message: '新增用户成功！',
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

    const userList = await selectUserInfoWhereAllDB({ usernameDec });
    const user = userList[0][0];
    if (!user) {
      status = '-2';
      throw new Error('用户名错误');
    }

    if (passwordDec !== user.password) {
      status = '-3';
      throw new Error('密码错误');
    }
    const [updateUser] = await updateUserDB({
      username: usernameDec,
      password: newPassword,
    });
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
    if (verCodeCache.get(email)) {
      throw new Error('验证码已经发送');
    }
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
    const [rows] = await selectUserInfoWhereAllDB({ email });
    if (rows && rows.length > 0) {
      status = '-1';
      throw new Error('邮箱已被注册');
    }
    if (!username || !password || !email) {
      status = '-2';
      throw new Error('参数错误');
    }
    if (!verCodeCache.get(email)) throw new Error('验证码已超时');
    if (verCodeCache.get(email) !== verCode) {
      status = '-3';
      throw new Error('验证码错误');
    }
    const [result] = await addUserDB({
      username: decrypt(username),
      password: decrypt(password),
      email,
      status: '1',
    });
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
