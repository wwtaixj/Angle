import { Result } from '@/axios/typings';
export type Friend = Omit<
  Result.User,
  'password' | 'roleId' | 'createTime' | 'updateTime'
>;
