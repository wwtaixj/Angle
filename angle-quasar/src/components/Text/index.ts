import { withInstall } from '@/utils';
import Text from './Index.vue';

export const XText = withInstall(Text);

export interface XTextProps {
  inversion?: boolean;
  error?: boolean;
  text?: string;
  loading?: boolean;
  asRawText?: boolean;
}
