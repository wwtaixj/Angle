import { Result } from '@/axios/typings';

export interface Chat
  extends Omit<
    Result.User,
    'password' | 'roleId' | 'createTime' | 'updateTime' | 'id'
  > {
  chatId: string;
}
