<template>
  <q-input
    v-bind="attrs"
    ref="inputRef"
    :model-value="modelValue"
    @update:model-value="updateModelValue"
  >
    <template v-slot:append>
      <q-icon
        v-if="modelValue !== ''"
        name="close"
        @click="updateModelValue('')"
        class="cursor-pointer"
      />
      <slot name="append" />
    </template>
    <template v-for="key in slots">
      <slot :name="key" />
    </template>
  </q-input>
</template>
<script lang="ts" setup>
import { PropType, defineEmits, useSlots, useAttrs, computed } from 'vue';
import { QInputSlots } from 'quasar';
import { XInputProps } from './index';

const attrs = useAttrs();

const slots = computed(
  () =>
    Object.keys(useSlots()).filter(
      (i) => i !== 'append'
    ) as Partial<QInputSlots>
);

const $emits = defineEmits(['update:modelValue']);

defineOptions({
  name: 'XInput',
});
defineProps({
  modelValue: {
    type: String as PropType<XInputProps['modelValue']>,
  },
});

function updateModelValue(value: XInputProps['modelValue']) {
  $emits('update:modelValue', value);
}
</script>
