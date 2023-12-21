import { Notify, QNotifyCreateOptions } from 'quasar';

const defaultOptions: QNotifyCreateOptions = {
  actions: [{ icon: 'cancel', color: 'white', size: 'sm' }],
  position: 'top-right',
  progress: true,
  iconSize: '20px',
};

export function notify(options: QNotifyCreateOptions) {
  Notify.create({
    ...defaultOptions,
    ...options,
  });
}
