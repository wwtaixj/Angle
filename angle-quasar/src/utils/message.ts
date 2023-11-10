import { Notify, QNotifyCreateOptions } from 'quasar';

export function notify(options: QNotifyCreateOptions) {
  Notify.create({
    actions: [{ icon: 'cancel', color: 'white' }],
    position: 'top-right',
    progress: true,
    ...options,
  });
}
