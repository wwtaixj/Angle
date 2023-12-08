// 侧边栏key
export enum SideListKeyEnum {
  CHAT = 'chat',
  PHOTO = 'photo',
  MENU = 'menu',
  ADDRESS_BOOK = 'address book',
  CHAT_ROBOT = 'chat robot',
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
