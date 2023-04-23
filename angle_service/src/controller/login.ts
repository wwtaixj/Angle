import db from '../db';
import { decrypt, encrypt } from '../utils/cryptoJs';

export const login = async (req, res) => {
  let return_code = '1';
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
    const result = await db.query(
      `select * from users where username = '${hashedUsername}'`
    );
    const user = result[0][0];
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
        token: encrypt(`${user.username},${Date.now()}`),
        phone: encrypt(phone),
        avatar_url: avatar_url,
        age,
        label,
        gender,
      },
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
};
