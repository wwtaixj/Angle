import { computed } from 'vue';
import { useMessage } from 'naive-ui';
import { t } from '@renderer/i18n';
import { useChatStore } from '@renderer/store';

export function useUsingContext() {
	const ms = useMessage();
	const chatStore = useChatStore();
	const usingContext = computed<boolean>(() => chatStore.usingContext);

	function toggleUsingContext() {
		chatStore.setUsingContext(!usingContext.value);
		if (usingContext.value) ms.success(t('chat.turnOnContext'));
		else ms.warning(t('chat.turnOffContext'));
	}

	return {
		usingContext,
		toggleUsingContext
	};
}
