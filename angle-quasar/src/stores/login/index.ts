import { defineStore } from 'pinia';
import { CSSProperties } from 'vue';
import { DialogEventEnum } from '@/enums/main';
import { useUserStore } from '../user';
import { useI18n } from '@/boot/i18n';

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
  getters: {},
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
  },
});
