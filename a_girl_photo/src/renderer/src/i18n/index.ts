import { createI18n } from 'vue-i18n';
import LangCN from './language/zh-cn';
import LangEN from './language/en';

const languageFile = {
  'zh-cn': LangCN,
  en: LangEN
};

const i18n = createI18n({
  locale: 'zh-cn',
  fallbackLocale: 'zh-cn', // 不存在默认则为中文
  allowComposition: true, // 允许组合式api
  globalInjection: true, //全局生效$t
  messages: languageFile
});
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useI18n = () => {
  const { t, ...methods } = i18n.global;
  return {
    ...methods,
    t
  };
};

export default i18n;
