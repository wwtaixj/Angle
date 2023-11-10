import { withInstall } from '@/utils';
import { QPopupEditProps } from 'quasar';
import PopupEdit from './Index.vue';

export const XPopupEdit = withInstall(PopupEdit);

export interface XPopupEditProps {
  modelValue: string | null;
  options: Omit<QPopupEditProps, 'modelValue'>;
}
