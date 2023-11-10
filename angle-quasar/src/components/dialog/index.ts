import { withInstall } from '@/utils';
import Dialog from './Index.vue';

export const XDialog = withInstall(Dialog);

export enum DialogTypeEnum {
  NATIVE = 'native',
  CARD = 'card',
}
