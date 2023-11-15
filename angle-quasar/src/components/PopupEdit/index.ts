import { withInstall } from '@/utils';
import { QPopupEditProps } from 'quasar';
import PopupEdit from './Index.vue';

export const XPopupEdit = withInstall(PopupEdit);

export interface XPopupEditProps extends QPopupEditProps {
  modelValue: string | null;
}
