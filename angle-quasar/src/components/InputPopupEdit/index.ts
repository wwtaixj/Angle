import { withInstall } from '@/utils';
import InputPopupEdit from './Index.vue';
import { QInputProps } from 'quasar';
import { XPopupEditProps } from '../PopupEdit';

export const XInputPopupEdit = withInstall(InputPopupEdit);

export interface XInputPopupEditProps extends XPopupEditProps {
  hint?: QInputProps['hint'];
}
