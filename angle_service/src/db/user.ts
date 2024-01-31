import db from './index';
import { Sql } from '@/enums/sql';
import {
  SelectUserInfoRespone,
  SelectApiPermissionsRespone,
  User,
  UserId,
} from './types';

/**
 * 获取除指定用户外得所有用户信息
 * @param username
 * @returns
 */
export async function selectUserInfoExcludeName(username: string) {
  return await db.query<UserId[]>(Sql.EXCLUDE_NAME);
}

/**
 * 用于获取指定用户名的用户权限
 * @param {string} username - 用户名
 * @returns {Promise<Array<Array<string|number>>} - 包含api名称和api类型的权限列表
 */
export async function getUserPermissions(username: User['username']) {
  return await db.query<SelectApiPermissionsRespone[]>(
    Sql.SELECT_API_PERMISSIONS_FROM_USERNAME,
    [username]
  );
}
/**
 * 用于查询用户信息
 * @param {string} username - 用户名
 * @returns {Promise<Array<Array<string|number>>} - 包含用户信息列表
 */
export async function selectUserInfo(username: User['username']) {
  return await db.query<SelectUserInfoRespone[]>(
    Sql.SELECT_USER_FROM_USERNAME,
    [username]
  );
}
export async function selectUserInfoWhereAllDB(
  params: Omit<User, 'roleId' | 'id'>
) {
  let fieldsStr = ``,
    values = [];
  for (let key of Object.keys(params)) {
    if (params[key]) {
      fieldsStr += fieldsStr ? ` AND ${key} = ? ` : ` ${key} = ? `;
      values.push(params[key]);
    }
  }
  return await db.query<User[]>(
    `select * from users where ${fieldsStr}`,
    values.filter(Boolean)
  );
}
/**
 * 用于模糊查询所有用户信息
 * @returns {Promise<Array<Array<string|number>>} - 所有用户信息列表
 */
export async function selectUserInfoLikeAll(
  params?: Omit<User, 'roleId' | 'id'>
) {
  let fieldsStr = ``,
    values = [];
  for (let key in params) {
    if (params[key]) {
      fieldsStr += ` AND ${key}  LIKE ?`;
      values.push(params[key]);
    }
  }
  return await db.query<User[]>(
    `SELECT * FROM users WHERE 1=1 ${fieldsStr}`,
    values
  );
}

export async function deleteUserDB({
  id,
  username,
}: Pick<User, 'id' | 'username'>) {
  return await db.query(Sql.DELETE_USER_FROM_ID, [id, username]);
}

export async function updateUserDB(user: Omit<User, 'roleId' | 'id'>) {
  let fieldsStr = ``,
    values = [];
  for (let key in user) {
    if (user[key] && key !== 'username') {
      fieldsStr += ` ${key} = ?,`;
      values.push(user[key]);
    }
  }
  values.push(user['username']);
  console.log(
    `UPDATE users SET ${fieldsStr.substring(
      0,
      fieldsStr.length - 1
    )} WHERE username = ?`
  );
  console.log(values);

  return await db.query(
    `UPDATE users SET ${fieldsStr.substring(
      0,
      fieldsStr.length - 1
    )} WHERE username = ?`,
    values
  );
}
export async function addUserDB(params: Omit<User, 'id'>) {
  let fieldsStr = ``,
    valuesStr = ``,
    values = [];
  for (let key of Object.keys(params)) {
    if (params[key]) {
      fieldsStr += `${key},`;
      valuesStr += '?,';
      values.push(params[key]);
    }
  }
  return await db.query(
    `INSERT INTO users (${fieldsStr.slice(0, -1)}) VALUES (${valuesStr.slice(
      0,
      -1
    )})`,

    values.filter(Boolean)
  );
}
/**
 * @description 获取所有用户id
 * @returns
 */
export async function getAllUserId() {
  return await db.query<UserId[]>(`SELECT id FROM users`);
}
