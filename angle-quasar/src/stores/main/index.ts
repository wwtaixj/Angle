import { defineStore } from 'pinia';
import { CSSProperties, reactive } from 'vue';
import { DialogEventEnum } from '@/enums/main';
import { useUserStore } from '../user';
import { useI18n } from '@/boot/i18n';
import { XUpdate } from '@/components';
import { useQuasar } from 'quasar';
import { $Window } from '@/types/env';

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
    /**
     * @description 初始化
     */
    initMain() {
      this.updateApp();
    },
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
    async updateApp() {
      try {
        const $q = useQuasar();
        const { electron } = window as unknown as $Window;
        if (!electron) return;
        electron.ipcRenderer.on('update-available', () => {
          $q.dialog({
            title: '检测到新版本',
            message: '是否立即更新？',
            persistent: true,
            ok: '立即更新',
            cancel: '取消',
          }).onOk(() => {
            electron.ipcRenderer.send('update-app');
            const updateProps = reactive({
              progress: 0,
            });
            const dialog = $q.dialog({
              component: XUpdate,
              componentProps: updateProps,
              persistent: true, // we want the user to not be able to close it
              ok: false, // we want the user to not be able to close it
            });

            // 接收主进程的消息，更新进度条
            electron.ipcRenderer.on('download-progress', (e, progressObj) => {
              updateProps.progress = Math.min(
                1,
                updateProps.progress + Number((progressObj / 100).toFixed(2))
              );
              if (updateProps.progress === 1) {
                dialog.hide();
              }
            });
          });
        });
        electron.ipcRenderer.on('update-downloaded', () => {
          $q.dialog({
            title: '更新下载完成',
            message: '将立即安装应用',
            persistent: true,
            ok: '确认',
          });
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
});
