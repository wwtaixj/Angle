import { defineStore } from 'pinia';
import { CSSProperties } from 'vue';
import { DialogEventEnum } from '@/enums/main';
import { useUserStore } from '../user';
import { useI18n } from '@/boot/i18n';
const { ipcRenderer, dialog } = require('electron');

interface Dialog {
  visible: boolean;
  event: DialogEventEnum;
  title: string;
  style: CSSProperties;
  class: string;
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
      style: {},
    },
  }),
  actions: {
    setLeftDrawerOpen() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    setLeftDrawerMini() {
      this.leftDrawerMini = !this.leftDrawerMini;
    },
    setDialog(config: Partial<Dialog>) {
      Object.assign(this.dialog, config);
    },
    openDialog(dialogEvent: DialogEventEnum) {
      if (dialogEvent) this.setDialog({ event: dialogEvent });
      if (!useUserStore().getToken) {
        const { t } = useI18n();
        this.setDialog({
          event: DialogEventEnum.LOGIN,
          title: t('login.Login'),
          class: 'q-dialog-plugin',
        });
      }
      this.setDialog({ visible: true });
    },
    closeDialog() {
      this.setDialog({ visible: false });
    },
    resetDialog() {
      this.setDialog({ title: '', style: {}, class: '' });
    },
    updateApp() {
      // 接收主进程的消息，更新进度条
      ipcRenderer.on('download-progress', (event, progressObj) => {
        const progress = document.getElementById('progress');
        const bar = document.getElementById('bar');
        // 显示进度条
        if (progress) {
          progress.style.display = 'block';
          // 设置进度条的值
        }
        if (bar) {
          bar.value = progressObj.percent;
        }
      });
    },
  },
});
