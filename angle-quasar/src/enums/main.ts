// 侧边栏key
export enum SideListKeyEnum {
  CHAT = 'chat',
  PHOTO = 'photo',
  MENU = 'menu',
  FRIENDS = 'friends',
  CHAT_ROBOT = 'chatRobot',
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
