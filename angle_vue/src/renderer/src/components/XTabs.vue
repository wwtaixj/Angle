<template>
	<Tabs v-bind="$attrs">
		<TabPane v-for="item in paneList" :key="item.key">
			<template #tab>
				<span>
					<slot :name="item.key + 'icon'"></slot>
					{{ item.name }}
				</span>
			</template>
			<slot :name="item.key + 'content'"></slot>
		</TabPane>
	</Tabs>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from 'vue';
import { Tabs, TabPane } from 'ant-design-vue';
import { TabsPaneItem } from './model';

defineProps({
	paneList: {
		required: true,
		type: Array as PropType<TabsPaneItem[]>,
		default: () => []
	}
});
</script>
