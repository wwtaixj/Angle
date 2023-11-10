/*
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-16 19:52:35
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-26 14:32:25
 * @FilePath: \angle-quasar\src\enums\main.ts
 */
// 侧边栏key
export enum SideListKeyEnum {
  CHAT = 'chat',
  PHOTO = 'photo',
}
export enum DialogEventEnum {
  CHAT = SideListKeyEnum.CHAT,
  LOGIN = 'login',
  ACCOUNT = 'account',
}

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}
