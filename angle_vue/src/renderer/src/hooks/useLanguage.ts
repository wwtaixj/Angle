import { computed } from 'vue';
import { enUS, zhCN } from 'naive-ui';
import zhCNA from 'ant-design-vue/es/locale/zh_CN';
import enUSA from 'ant-design-vue/es/locale/en_US';
import { useAppStore } from '@renderer/store';
import { setLocale } from '@renderer/i18n';

export function useLanguage() {
  const appStore = useAppStore();

  const language = computed(() => {
    switch (appStore.language) {
      case 'en-us':
        setLocale('en-us');
        return { antdv: enUSA, nui: enUS };
      case 'zh-cn':
        setLocale('zh-cn');
        return { antdv: zhCNA, nui: zhCN };
      default:
        setLocale('zh-cn');
        return { antdv: zhCNA, nui: zhCN };
    }
  });

  return { language };
}
