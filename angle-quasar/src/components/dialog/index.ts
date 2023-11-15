import { CSSProperties } from 'vue';
import { withInstall } from '@/utils';
import Dialog from './Index.vue';
import { QCardProps } from 'quasar';

export const XDialog = withInstall(Dialog);

export enum DialogTypeEnum {
  NATIVE = 'native',
  CARD = 'card',
}

export interface XDialogProps extends QCardProps {
  title?: string;
  style?: CSSProperties;
  class?: string;
}
