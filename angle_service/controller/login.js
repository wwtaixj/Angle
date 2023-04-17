import db from '../db/index.js';
import { decrypt, encrypt } from '../util/cryptoJs.js';
export const login = async (req, res, next) => {
  let return_code, message;
  try {
    const { username, password, token } = req.body;
    if (token) {
      return res.json({
        return_code: '0',
        message: '退出登录成功',
      });
    }
    // 没有用户名或密码
    if (!username || !password) {
      return_code = '-1';
      throw new Error('未输入用户名或密码！');
    }
    // 解密
    const hashedPassword = decrypt(password);
    const hashedUsername = decrypt(username);
    // 在用户数据中查找是否存在与请求提供的用户名及密码匹配的用户记录
    const [[user]] = await db.query(
      `select * from users where username = '${hashedUsername}'`
    );
    // 用户不存在或密码错误
    if (!user) {
      return_code = '-2';
      throw new Error('用户不存在!');
    }
    // 密码错误
    if (hashedPassword !== user.password) {
      return_code = '-3';
      throw new Error('密码错误,请再试一次!');
    }
    const { phone, avatar_url, age, label, gender } = user;
    // 返回包含 token、return_code 和 message 的 JSON 响应
    return res.json({
      return_code: '0',
      message: null,
      data: {
        token: encrypt(`${user.username},${new Date().getTime()}`),
        phone: encrypt(phone),
        avatar_url: avatar_url,
        age,
        label,
        gender,
      },
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
};
