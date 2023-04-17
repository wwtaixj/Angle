<template>
  <a-tabs v-bind="$attrs">
    <a-tab-pane v-for="item in paneList" :key="item.key">
      <template #tab>
        <span>
          <slot :name="item.key + 'icon'"></slot>
          {{ item.name }}
        </span>
      </template>
      <slot :name="item.key + 'content'"></slot>
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from 'vue';
import { TabsPaneItem } from './model';

defineProps({
  paneList: {
    required: true,
    type: Array as PropType<TabsPaneItem[]>,
    default: () => []
  }
});
</script>
