<template>
  <q-avatar v-bind="attrsComputed">
    <XImg
      class="full-height"
      :src="customComputed.src"
      v-if="customComputed.src"
      :spinnerSize="attrsComputed.size"
    >
      <template v-for="key in slots" v-slot:[key]>
        <slot :name="key" />
      </template>
    </XImg>

    <span class="text-subtitle1" v-else>{{ text }}</span>
  </q-avatar>
</template>

<script lang="ts" setup>
import { useAttrs, computed, useSlots } from 'vue';
import { XAvatarProps, XImg } from '@/components';

defineOptions({
  name: 'XAvatar',
});

defineProps({
  text: {
    type: String,
  },
});
const slots = computed(() => Object.keys(useSlots())) as unknown;
const attrs: XAvatarProps = useAttrs();

const attrsComputed = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { text, src, size, color, ...attr } = {
    size: '32px',
    color: attrs.src ? '' : 'primary',
    ...attrs,
  };

  return {
    ...attr,
    size,
    color,
  };
});
const customComputed = computed(() => {
  const { src } = attrs;

  return {
    src,
  };
});
</script>
