import { computed } from 'vue';
import { Rule } from 'ant-design-vue/es/form';
import { t } from '@renderer/i18n';

export type Gender = '0' | '1' | null;
export interface UserForm {
  username?: string;
  password?: string;
  remember?: boolean;
  phone?: string;
  age?: string;
  gender?: Gender;
  avatarUrl?: string;
  label?: string;
  newPassword?: string;
  againNewPassword?: string;
  SMSCode?: string;
  description?: string;
}

const phoneRules = computed(() => [
  {
    required: true,
    validator: (_rule: Rule, value: string) => {
      if (!value) {
        return Promise.reject(t('login.Please enter your mobile phone number!'));
      }
      const regExp = /^(?:(?:\+|00)86)?1\d{10}$/;
      if (!regExp.test(value)) {
        return Promise.reject(t('login.Please enter the phone number in the correct format'));
      }
      return Promise.resolve();
    }
  }
]);
const SMSCodeRules = computed(() => [
  { required: true, message: t('login.Please enter the verification code!') },
  { min: 4, max: 4, message: t('login.Verify to 4 bits') }
]);

const usernameRules = computed(() => [
  { required: true, message: t('login.Please input your username!') }
]);
const passwordRules = computed(() => [
  { required: true, message: t('login.Please input your password!') },
  { min: 6, message: t('login.The input content must contain more than 6 characters') }
]);

export { phoneRules, SMSCodeRules, usernameRules, passwordRules };
