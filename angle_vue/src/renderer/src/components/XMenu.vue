<template>
	<Menu
		v-model:selected-keys="currentModel"
		v-model:mode="menuConfigModel.mode"
		v-model:theme="menuConfigModel.theme"
		v-model:inline-collapsed="menuConfigModel.inlineCollapsed"
		@select="select"
		@click="click"
	>
		<MenuItem v-for="item in menuList" :key="item.key">
			<template #icon>
				<slot :name="item.key + 'icon'"></slot>
			</template>
			{{ item.title }}
		</MenuItem>
	</Menu>
</template>
<script lang="ts" setup>
import { PropType, defineProps, defineEmits, computed } from 'vue';
import { Menu, MenuItem } from 'ant-design-vue';
import { MenuClickEventHandler } from 'ant-design-vue/lib/menu/src/interface';
import { Key } from 'ant-design-vue/lib/_util/type';
import type { XMenuItem } from './model';
const $emit = defineEmits(['select', 'update:current', 'update:menuConfig', 'click']);

const props = defineProps({
	menuConfig: {
		type: Object,
		default: () => ({
			mode: 'inline', // vertical | horizontal | inline
			theme: 'light', // light | dark
			inlineCollapsed: false
		})
	},
	menuList: {
		type: Array as PropType<XMenuItem[]>,
		default: () => [],
		required: true
	},
	current: {
		type: Array as () => Key[],
		default: () => [],
		required: true
	}
});
const currentModel = computed({
	get() {
		return props.current;
	},
	set(v) {
		$emit('update:current', v);
	}
});
const menuConfigModel = computed({
	get() {
		return new Proxy(props.menuConfig, {
			set(obj, name, val): boolean {
				$emit('update:menuConfig', {
					...obj,
					[name]: val
				});
				return true;
			}
		});
	},
	set(v) {
		$emit('update:menuConfig', v);
	}
});
const select = ({ item, key, selectedKeys }) => {
	$emit('select', { item, key, selectedKeys });
};
const click: MenuClickEventHandler = ({ item, key, keyPath }) => {
	$emit('click', { item, key, keyPath });
};
</script>
