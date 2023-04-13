import { createI18n } from 'vue-i18n';
import LangCN from './locales/zh-cn';
import LangEN from './locales/en';
import { getNavLanguage } from '@renderer/utils';
import { createPinia } from 'pinia';
import { useUserStore } from '@renderer/store/userStore';
import { Language } from './model';

const userStore = useUserStore(createPinia());
let defaultLocale = userStore.getLanguage;
if (!defaultLocale) {
  defaultLocale = getNavLanguage();
  userStore.setLanguage(defaultLocale);
}
const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'zh-cn', // 不存在默认则为中文
  allowComposition: true, // 允许组合式api
  messages: {
    'zh-cn': LangCN,
    en: LangEN,
    'en-us': LangEN
  }
});

export function setLocale(locale: Language) {
  i18n.global.locale = locale;
}
export const useI18n: any = () => {
  const { t, ...methods } = i18n.global;
  return {
    ...methods,
    t
  };
};

export default i18n;
