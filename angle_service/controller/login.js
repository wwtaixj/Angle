import db from '../db/index.js';
import jwt from 'jsonwebtoken';
const Key = 'wwtxjsdas';
export async function login(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    // 没有用户名或密码
    return res.status(401).json({
      status: -1,
      message: '未输入用户名或密码！',
    });
  }
  // 在用户数据中查找是否存在与请求提供的用户名及密码匹配的用户记录
  const user = await db.query(
    `select password from user where username = ${username}`
  );
  console.log(user);
  if (!user) {
    // 用户不存在或密码错误
    return res.status(401).json({
      status: -2,
      message: '用户名或密码错误！',
    });
  }

  // 生成 token
  const token = generateToken(user);

  // 返回包含 token、returnCode 和 errorMessage 的 JSON 响应
  res.json({
    token,
    status: 0,
    message: null,
  });
}

// 生成 token
function generateToken(user) {
  const payload = {
    sub: user.id,
    name: user.username,
    role: user.role,
  };
  jwt.sign(payload, Key);
  // TODO: 使用实际的 JWT 库生成 token
  return 'fake_token';
}
