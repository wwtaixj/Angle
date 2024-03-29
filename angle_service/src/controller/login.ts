import { insertLoginUserLogs } from '../db';
import { getUserPermissions, selectUserInfo } from '@/db/user';
import { decrypt, encrypt } from '../utils/cryptoJs';
import { GlobalResponse, GlobalRequest } from '@/types';
import { LoginParams, LoginResponse, LogoutParams } from './types';
import Cache from '@/stores/user';

export const login = async (
  req: GlobalRequest<LoginParams>,
  res: GlobalResponse<LoginResponse>
) => {
  let status = '1';
  try {
    const { username, password, longitude, latitude } = req.body;
    const hashedUsername = decrypt(username);
    insertLoginUserLogs({
      longitude,
      latitude,
      username: hashedUsername,
    });
    // 没有用户名或密码
    if (!username || !password) {
      status = '-1';
      throw new Error('未输入用户名或密码！');
    }
    // 解密
    const hashedPassword = decrypt(password);

    // 在用户数据中查找是否存在与请求提供的用户名及密码匹配的用户记录
    const result = await selectUserInfo(hashedUsername);
    const user = result[0][0];
    // 用户不存在或密码错误
    if (!user) {
      status = '-2';
      0;
      throw new Error('用户不存在或密码错误!');
    }
    // 密码错误
    if (hashedPassword !== user.password) {
      status = '-3';
      throw new Error('密码错误,请再试一次!');
    }
    const { id, phone, avatarUrl, age, tag, gender, email } = user;
    // 登录添加权限列表到缓存
    const [userList] = await getUserPermissions(hashedUsername);
    console.log(userList);
    //
    Cache.set(hashedUsername, userList, 3600 * 8);
    // 返回包含 token、status 和 message 的 JSON 响应
    return res.json({
      status: '0',
      message: '登录成功',
      data: {
        token: encrypt(`${hashedUsername},${Date.now()}`),
        phone: encrypt(phone),
        avatarUrl,
        age,
        tag,
        gender,
        email,
        id: id.toString(),
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
