<template>
	<router-view></router-view>
</template>
<script setup lang="ts">
import { getNavLanguage } from '@renderer/utils';
import { store } from '@renderer/store';
import { useUserStore } from '@renderer/store';
import { setLocale } from '@renderer/i18n';
//设置语言
const userStore = useUserStore(store);
let defaultLocale = userStore.getLanguage;
if (!defaultLocale) {
	defaultLocale = getNavLanguage();
	userStore.setLanguage(defaultLocale);
}
setLocale(defaultLocale);
</script>
