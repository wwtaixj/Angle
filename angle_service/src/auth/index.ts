import { decrypt } from '../utils/cryptoJs';
import { NextFunction } from 'express';
import { getUserPermissions } from '@/db/user';
import { RolesJoinApiPermissions } from '@/db/types';
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
    // 登录 退出登录 注册逃过
    if (
      req.url === Url.API + Url.LOGIN ||
      req.url === Url.API + Url.REGISTER ||
      req.url === Url.API + Url.LOGOUT ||
      req.url === Url.API + Url.VERIFICATION_CODE
    ) {
      next();
      return;
    }
    let permissions = Cache.get<RolesJoinApiPermissions[]>(headerUserName);
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
