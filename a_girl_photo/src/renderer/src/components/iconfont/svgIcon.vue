<template>
  <svg :class="classList" aria-hidden="true" :style="`transform: rotate(${props.rotate}deg)`">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  iconClass: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  size: {
    type: String,
    default: '20px'
  },
  spin: {
    type: Boolean,
    default: false
  },
  rotate: {
    type: Number,
    default: 0
  }
});
const classList = computed(() => {
  return ['icon', props.spin ? 'anticon-spin' : '', props.className || ''];
});
const iconName = computed(() => {
  return `#${props.iconClass}`;
});
</script>
<style scoped>
.icon {
  /* v-bind可以将CSS的值与js的值绑定 */
  width: v-bind('props.size');
  height: v-bind('props.size');
  position: relative;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
