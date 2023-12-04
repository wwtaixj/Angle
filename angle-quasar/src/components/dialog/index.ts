import { CSSProperties } from 'vue';
import { withInstall } from '@/utils';
import Dialog from './Index.vue';
import { QCardProps, QBtnProps } from 'quasar';

export const XDialog = withInstall(Dialog);

export enum DialogTypeEnum {
  NATIVE = 'native',
  CARD = 'card',
}

export interface XDialogButton {
  show: boolean;
  ok?: Partial<QBtnProps>;
  cancel?: Partial<QBtnProps>;
}
export interface XDialogProps extends QCardProps {
  title?: string;
  style?: CSSProperties;
  class?: string;
  button?: XDialogButton;
  type?: DialogTypeEnum;
  isShowClose?: boolean;
}
