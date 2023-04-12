<template>
  <a-menu
    v-model:selected-keys="currentModel"
    v-model:mode="menuConfigModel.mode"
    v-model:theme="menuConfigModel.theme"
    v-model:inline-collapsed="menuConfigModel.inlineCollapsed"
    @select="select"
    @click="click"
  >
    <a-menu-item v-for="item in menuList" :key="item.key">
      <template #icon>
        <slot :name="item.key + 'icon'"></slot>
      </template>
      {{ item.title }}
    </a-menu-item>
  </a-menu>
</template>
<script lang="ts" setup>
import { PropType, defineProps, defineEmits, computed } from 'vue';
import { MenuItem } from './model';
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
    type: Array as PropType<MenuItem[]>,
    default: () => [],
    required: true
  },
  current: {
    type: Array,
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
const click = ({ item, key, keyPath }) => {
  $emit('click', { item, key, keyPath });
};
</script>
