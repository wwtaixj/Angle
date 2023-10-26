/*
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-12 11:08:01
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-25 17:40:58
 * @FilePath: \Angle\angle-quasar\src\stores\mainStore.ts
 */
import { defineStore } from 'pinia';
import { DialogEventEnum } from '@/enums/main';
import { useUserStore } from './userStore';
import { useI18n } from '@/boot/i18n';

interface Dialog {
  visible: boolean;
  event: DialogEventEnum;
  title: string;
}
interface MainState {
  leftDrawerOpen: boolean;
  leftDrawerMini: boolean;
  dialog: Partial<Dialog>;
}

export const useMainStore = defineStore('main', {
  state: (): MainState => ({
    leftDrawerOpen: true,
    leftDrawerMini: false,
    dialog: {
      visible: false,
      event: DialogEventEnum.LOGIN,
      title: '',
    },
  }),
  getters: {},
  actions: {
    setLeftDrawerOpen() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    setLeftDrawerMini() {
      this.leftDrawerMini = !this.leftDrawerMini;
    },
    setDialog(config: Partial<Dialog>) {
      this.dialog = config;
    },
    openDialog(dialogEvent: DialogEventEnum) {
      if (dialogEvent) this.setDialog({ event: dialogEvent });
      if (!useUserStore().getToken) {
        const { t } = useI18n();
        this.setDialog({
          event: DialogEventEnum.LOGIN,
          title: t('login.Login'),
        });
      }

      this.dialog.visible = true;
    },
    closeDialog() {
      this.dialog.visible = false;
    },
  },
});
