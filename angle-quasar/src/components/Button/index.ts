import { withInstall } from '@/utils';
import Button from './Index.vue';
import ButtonVerifyCode from './components/ButtonVerifyCode.vue';

export const XButton = withInstall(Button);
export const XButtonVerifyCode = withInstall(ButtonVerifyCode);

export interface XButtonVerifyCodeProps {
  modelValue: number;
  beforeClick?: () => Promise<boolean> | boolean;
  time: number;
}
