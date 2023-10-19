/*
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-12 11:08:01
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-16 19:56:22
 * @FilePath: \angle-quasar\src\stores\mainStore.ts
 */
import { defineStore } from 'pinia';
import { DialogEventEnum } from '@/enums/main';

interface MainState {
  leftDrawerOpen: boolean;
  leftDrawerMini: boolean;
  dialogVisible: boolean;
  dialogEvent: DialogEventEnum;
}

export const useMainStore = defineStore('main', {
  state: (): MainState => ({
    leftDrawerOpen: true,
    leftDrawerMini: false,
    dialogVisible: false,
    dialogEvent: DialogEventEnum.LOGIN,
  }),
  getters: {},
  actions: {
    setLeftDrawerOpen() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    setLeftDrawerMini() {
      this.leftDrawerMini = !this.leftDrawerMini;
    },
    setDialogEvent(dialogEvent: DialogEventEnum) {
      this.dialogEvent = dialogEvent;
    },
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
  },
});
