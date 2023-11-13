import db from './index';
import { Sql } from '@/enums/sql';
import { RolesJoinApiPermissions } from './types';

/**
 * 异步函数，用于获取指定用户名的用户权限
 * @param {string} username - 用户名
 * @returns {Promise<Array<Array<string|number>>} - 包含api名称和api类型的权限列表
 */
export async function getUserPermissions(username: string) {
  return await db.query<RolesJoinApiPermissions[]>(
    Sql.ROLES_JOIN_API_PERMISSIONS,
    [username]
  );
}
