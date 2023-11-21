import { unref } from 'vue';
import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
//import { useUserStore } from '../stores/user';
import messages, { LOCALE } from 'src/i18n';

export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = (typeof messages)['en-US'];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-interface */

const i18n = createI18n({
  locale: LOCALE.ZH_CN,
  legacy: false,
  messages,
});
export function useI18n() {
  const { t, ...methods } = i18n.global;
  return {
    ...methods,
    t,
  };
}

export function setLocale(locale: LOCALE) {
  if (!locale) return;
  if (!messages[locale]) return;
  if (locale === (unref(i18n.global.locale) as LOCALE)) return;
  if (i18n.mode === 'legacy') {
    (i18n.global.locale as unknown as LOCALE) = locale;
  } else {
    i18n.global.locale.value = locale;
  }
}

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
});
