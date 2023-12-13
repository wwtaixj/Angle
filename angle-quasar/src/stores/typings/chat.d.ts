import { Result } from '@/axios/typings';
export type Chat = Omit<
  Result.User,
  'password' | 'roleId' | 'createTime' | 'updateTime'
>;
