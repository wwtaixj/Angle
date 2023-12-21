import { Result } from '@/axios/typings';

export interface Friend
  extends Omit<
    Result.User,
    'password' | 'roleId' | 'createTime' | 'updateTime' | 'id'
  > {
  chatId: string;
}
