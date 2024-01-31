import { withInstall } from '@/utils';
import { QAvatarProps, QAvatarSlots } from 'quasar';
import Avatar from './Index.vue';

export const XAvatar = withInstall(Avatar);

export interface XAvatarProps extends QAvatarProps {
  text?: string;
  src?: string;
}
export type XAvatarSlots = QAvatarSlots;
