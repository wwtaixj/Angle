<template>
  <ConfigProvider>
    <router-view :locale="language.antdv"></router-view>
  </ConfigProvider>
</template>
<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import { getNavLanguage } from '@renderer/utils';
import { useAppStore } from '@renderer/store';
import { Language } from '@renderer/i18n/model';
import { useLanguage } from '@renderer/hooks/useLanguage';

//设置语言
const appStore = useAppStore();
const { language } = useLanguage();
let defaultLocale = appStore.language;
if (!defaultLocale) {
  defaultLocale = getNavLanguage() as Language;
  appStore.setLanguage(defaultLocale);
}
appStore.setLanguage(defaultLocale);
</script>
