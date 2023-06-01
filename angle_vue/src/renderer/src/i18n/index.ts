import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import LangCN from './locales/zh-cn';
import LangEN from './locales/en';
import { Language } from './model';

export const i18n = createI18n({
  locale: 'zh-cn',
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
export const t: any = i18n.global.t;

export function setupI18n(app: App) {
  app.use(i18n);
}
export default i18n;
