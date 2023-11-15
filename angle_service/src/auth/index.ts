import { decrypt } from '../utils/cryptoJs';
import { NextFunction } from 'express';
import { getUserPermissions } from '@/db/user';
import { SelectApiPermissionsRespone } from '@/db/types';
import { GlobalResponse, GlobalRequest } from '@/types';
import { Url } from '@/enums/url';
import Cache from '@/stores/user';

/**
 * token 校验
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const authentication = async (
  req: GlobalRequest<any>,
  res: GlobalResponse<any>,
  next: NextFunction
) => {
  let status = '1000';
  try {
    if (
      req.url === Url.API + Url.LOGIN ||
      req.url === Url.API + Url.REGISTER ||
      req.url === Url.API + Url.LOGOUT ||
      req.url === Url.API + Url.VERIFICATION_CODE
    ) {
      next();
      return;
    }
    if (!req.headers.username || !req.headers.token) {
      throw new Error('身份认证异常！');
    }
    const headerUserName = decrypt(req.headers.username as string);
    const [username, oldDate] = decrypt(req.headers.token as string).split(',');
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
      Cache.del(headerUserName);
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
export const apiPermission = async (
  req: GlobalRequest<any>,
  res: GlobalResponse<any>,
  next: NextFunction
) => {
  let status = '1';
  try {
    const headerUserName = decrypt(
      (req.headers.username as string) || req.body.username
    );
    // 登录 退出登录 注册跳过
    if (
      req.url === Url.API + Url.LOGIN ||
      req.url === Url.API + Url.REGISTER ||
      req.url === Url.API + Url.LOGOUT ||
      req.url === Url.API + Url.VERIFICATION_CODE
    ) {
      next();
      return;
    }
    let permissions = Cache.get<SelectApiPermissionsRespone[]>(headerUserName);
    if (!permissions) {
      permissions = (await getUserPermissions(headerUserName))[0];
    }
    if (permissions.length === 0) {
      status = '1003';
      throw new Error('此账号没有权限');
    }
    const method = req.method.toLocaleLowerCase();
    const url = req.originalUrl.split('?')[0];
    if (!permissions.some((i) => i.api_name === url && i.api_type === method)) {
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

// corsky:表示cors跨域
export const corsky = (req, res, next) => {
  // CORS→Cross Origin Resource Sharing
  //const allwo_origin = ['loose.net.cn', 'localhost'];
  // 设置可以用如下三行的写法,也可以用对象去写即res.set({}).二选一即可
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header(
  //   'Access-Control-Allow-Headers',
  //   'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
  // );
  // res.header(
  //   'Access-Control-Allow-Methods',
  //   'PUT,POST,GET,PATCH,DELETE,OPTIONS'
  // );
  // req.get("host")这个方法是获取请求者的域名
  // allwo_origin.includes(req.get("host"))这段代码的意思就是如果请求的域名包含在allwo_origin数组中
  // 思路就是如果请求者的域名是我们是想给的域名那么就允许跨域,否则不允许跨域
  // console.log('请求者域名Origin:', req.get('Origin'));
  // console.log('请求者域名host:', req.get('host'));
  // console.log(allwo_origin.includes(req.get('host')));
  // req.get()这个方法,获取的是控制台Network，里面的属性名为Origin的属性值,还可以获取属性名为host的属性值
  // if (allwo_origin.includes(req.get('host').split(':')[0])) {

  // } else {
  //   // 401表示服务器限值你访问
  //   res.send({
  //     status: 401,
  //     message: '服务器限制访问!',
  //     data: [],
  //   });
  // }
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Content-Type,Content-Length, Authorization, Accept,X-Requested-With, authorization, Content-Type, token, username',
    'Access-Control-Allow-Methods': '*',
  });
  // 跨域请求CORS中的预请求
  if (req.method === 'OPTIONS') {
    res.sendStatus(200); /*让options请求快速返回*/
  } else {
    next();
  }
};
