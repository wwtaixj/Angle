import { defineStore } from 'pinia';
import { DialogEventEnum } from '@/enums/main';
import { useUserStore } from '../user';
import { useI18n } from '@/boot/i18n';
import { LoginDialogTypeEnum } from '@/enums/login';

interface LoginState {
  loginDialogType: LoginDialogTypeEnum;
}

export const useLoginStore = defineStore('login', {
  state: (): LoginState => ({
    loginDialogType: LoginDialogTypeEnum.LOGIN,
  }),
  getters: {},
  actions: {
    setLoginDialogType(type: LoginDialogTypeEnum) {
      this.loginDialogType = type;
    },
  },
});
