import { withInstall } from '@/utils';
import Input from './Index.vue';
import InputPassword from './components/InputPassword.vue';
import { QInputProps } from 'quasar';

export const XInput = withInstall(Input);
export const XInputPassword = withInstall(InputPassword);

export interface XInputProps extends QInputProps {
  modelValue: QInputProps['modelValue'];
}

export type XInputPasswordProps = XInputProps;
