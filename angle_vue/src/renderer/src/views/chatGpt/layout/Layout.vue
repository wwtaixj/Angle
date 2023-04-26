<script setup lang="ts">
import { computed } from 'vue';
import { NLayout, NLayoutContent, NConfigProvider } from 'naive-ui';
import { NaiveProvider } from '@renderer/components/chat';
import { useRouter } from 'vue-router';
import Sider from './sider/index.vue';
import { useBasicLayout } from '@renderer/hooks/useBasicLayout';
import { useAppStore, useChatStore } from '@renderer/store';
import { useTheme } from '@renderer/hooks/useTheme';
import { useLanguage } from '@renderer/hooks/useLanguage';

const router = useRouter();
const appStore = useAppStore();
const chatStore = useChatStore();

const { theme, themeOverrides } = useTheme();
const { language } = useLanguage();

router.replace({ name: 'Chat', params: { uuid: chatStore.active } });

const { isMobile } = useBasicLayout();

const collapsed = computed(() => appStore.siderCollapsed);

const getMobileClass = computed(() => {
	if (isMobile.value) return ['rounded-none', 'shadow-none'];
	return ['border', 'rounded-md', 'shadow-md', 'dark:border-neutral-800'];
});

const getContainerClass = computed(() => {
	return ['h-full', { 'pl-[260px]': !isMobile.value && !collapsed.value }];
});
</script>

<template>
	<NConfigProvider
		class="h-full"
		:theme="theme"
		:theme-overrides="themeOverrides"
		:locale="language"
	>
		<NaiveProvider>
			<div class="h-full dark:bg-[#24272e] transition-all" :class="[isMobile ? 'p-0' : 'p-4']">
				<div class="h-full overflow-hidden" :class="getMobileClass">
					<NLayout class="z-40 transition" :class="getContainerClass" has-sider>
						<Sider />
						<NLayoutContent class="h-full">
							<RouterView v-slot="{ Component, route }">
								<component :is="Component" :key="route.fullPath" />
							</RouterView>
						</NLayoutContent>
					</NLayout>
				</div>
			</div>
		</NaiveProvider>
	</NConfigProvider>
</template>
