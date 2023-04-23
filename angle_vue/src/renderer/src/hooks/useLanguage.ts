import { computed } from 'vue';
import { enUS, zhCN } from 'naive-ui';
import { useAppStore } from '@renderer/store';
import { setLocale } from '@renderer/i18n';

export function useLanguage() {
	const appStore = useAppStore();

	const language = computed(() => {
		switch (appStore.language) {
			case 'en-us':
				setLocale('en-us');
				return enUS;
			case 'zh-cn':
				setLocale('zh-cn');
				return zhCN;
			default:
				setLocale('zh-cn');
				return enUS;
		}
	});

	return { language };
}
