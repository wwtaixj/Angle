<template>
  <q-input
    v-bind="attrs"
    ref="inputRef"
    :model-value="modelValue"
    @update:model-value="updateModelValue"
  >
    <template v-for="key in slots" v-slot:[key]>
      <slot :name="key" />
    </template>
  </q-input>
</template>
<script lang="ts" setup>
import { PropType, defineEmits, useSlots, useAttrs, computed } from 'vue';
import { XInputProps } from './index';

defineOptions({
  name: 'XInput',
});
const attrs = useAttrs();

const slots = computed(() => Object.keys(useSlots())) as unknown;

const $emits = defineEmits(['update:modelValue']);

defineProps({
  modelValue: {
    type: String as PropType<XInputProps['modelValue']>,
  },
});

function updateModelValue(value: XInputProps['modelValue']) {
  $emits('update:modelValue', value);
}
</script>
