<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { NButton } from 'naive-ui';
import { HoverButton, SvgIcon, PromptStore } from '@renderer/components/chat';

const Setting = defineAsyncComponent(() => import('@renderer/components/chat/Setting/index.vue'));

const show = ref(false);
const promptShow = ref(false);
</script>

<template>
	<footer
		class="flex items-center justify-between min-w-0 p-4 overflow-hidden border-t dark:border-neutral-800"
	>
		<div class="flex-1 flex-shrink-0 overflow-hidden">
			<NButton block @click="promptShow = true"> Prompt Store </NButton>
		</div>

		<HoverButton @click="show = true">
			<span class="text-xl text-[#4f555e] dark:text-white">
				<SvgIcon icon="ri:settings-4-line" />
			</span>
		</HoverButton>

		<Setting v-if="show" v-model:visible="show" />
		<PromptStore v-model:visible="promptShow" />
	</footer>
</template>
