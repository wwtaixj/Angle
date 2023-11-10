import { useI18n } from '@/boot/i18n';
import { QInputProps } from 'quasar';
const { t } = useI18n();

export function getLoginFormRules(): { [key: string]: QInputProps['rules'] } {
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
    SMSCode: [
      (val) =>
        (val && val.length > 0) || t('login.PleaseEnterTheVerificationcCode'),
      (val) => (val.length = 4) || t('login.VerifyTo4Bits'),
    ],
  };
}
