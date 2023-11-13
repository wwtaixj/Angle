import db from '../db';
import { getUserPermissions } from '@/db/user';
import { decrypt, encrypt } from '../utils/cryptoJs';
import { GlobalResponse, GlobalRequest } from '@/types';
import { LoginParams, LoginResponse, LogoutParams } from './types';
import { User } from '@/db/types';
import Cache from '@/utils/nodeCache';

export const login = async (
  req: GlobalRequest<LoginParams>,
  res: GlobalResponse<LoginResponse>
) => {
  let status = '1';
  try {
    const { username, password, longitude, latitude, date } = req.body;
    const hashedUsername = decrypt(username);
    const insertLoaSql =
      'INSERT INTO location (longitude, latitude, username, login_time ) VALUES (?, ?, ?, ?)';
    const dateFormat = new Date(date);
    const mysqlDatetime = dateFormat
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    db.query(insertLoaSql, [
      longitude,
      latitude,
      hashedUsername,
      mysqlDatetime,
    ]);
    // 没有用户名或密码
    if (!username || !password) {
      status = '-1';
      throw new Error('未输入用户名或密码！');
    }
    // 解密
    const hashedPassword = decrypt(password);
    // 在用户数据中查找是否存在与请求提供的用户名及密码匹配的用户记录
    const result = await db.query<User[]>(
      'SELECT password, phone, avatar_url, age, tag, gender, email FROM users WHERE username = ?',
      [hashedUsername]
    );
    const user = result[0][0];
    // 用户不存在或密码错误
    if (!user) {
      status = '-2';
      throw new Error('用户不存在或密码错误!');
    }
    // 密码错误
    if (hashedPassword !== user.password) {
      status = '-3';
      throw new Error('密码错误,请再试一次!');
    }
    const { phone, avatar_url, age, tag, gender, email } = user;
    // 登录添加权限列表到缓存
    const [userList] = await getUserPermissions(hashedUsername);

    Cache.set(hashedUsername, userList);
    // 返回包含 token、status 和 message 的 JSON 响应
    return res.json({
      status: '0',
      message: '登录成功',
      data: {
        token: encrypt(`${hashedUsername},${Date.now()}`),
        phone: encrypt(phone),
        avatar_url: avatar_url,
        age,
        tag,
        gender,
        email,
      },
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
};

export async function logout(
  req: GlobalRequest<LogoutParams>,
  res: GlobalResponse<any>
) {
  let status = '1';
  try {
    const { username } = req.body;
    const hashedUsername = decrypt(username);
    Cache.del(hashedUsername);
    return res.json({
      status: '0',
      message: '退出登录成功',
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
