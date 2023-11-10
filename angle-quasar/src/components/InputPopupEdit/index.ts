import { withInstall } from '@/utils';
import InputPopupEdit from './Index.vue';
import { QInputProps } from 'quasar';

export const XInputPopupEdit = withInstall(InputPopupEdit);

export interface XInputPopupEditProps {
  modelValue: QInputProps['modelValue'];
  hint: QInputProps['hint'];
}
