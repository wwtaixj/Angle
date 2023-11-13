import { useI18n } from '@/boot/i18n';
import { QInputProps } from 'quasar';
const { t } = useI18n();

export interface LoginFormRules {
  username: QInputProps['rules'];
  password: QInputProps['rules'];
  phone: QInputProps['rules'];
  verCode: QInputProps['rules'];
  email: QInputProps['rules'];
}

export function getLoginFormRules(): LoginFormRules {
  return {
    username: [
      (val) => (val && val.length > 0) || t('login.PleaseNputYourUsername'),
    ],
    password: [
      (val) => (val && val.length > 0) || t('login.PleaseInputYourNewPassword'),
      (val) =>
        val.length >= 6 ||
        t('login.TheInputContentMustContainMoreThan6Characters'),
    ],
    phone: [
      (val) =>
        (val && val.length > 0) || t('login.PleaseEnterYourMobilePhoneNumber'),
      (val) =>
        /^(?:(?:\+|00)86)?1\d{10}$/.test(val) ||
        t('login.PleaseEnterThePhoneNumberInTheCorrectFormat'),
    ],
    verCode: [
      (val) =>
        (val && val.length > 0) || t('login.PleaseEnterTheVerificationcCode'),
    ],
    email: [
      (val) => (val && val.length > 0) || '请输入邮箱',
      (val) =>
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
          val
        ) || '邮箱格式不正确',
    ],
  };
}
