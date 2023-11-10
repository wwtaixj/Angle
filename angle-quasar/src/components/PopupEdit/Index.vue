<template>
  <div class="cursor-pointer">
    {{ modelValue }}
    <q-popup-edit
      :model-value="modelValue"
      @update:model-value="updateModelValue"
      v-bind="options"
      v-slot="scope"
    >
      <slot v-bind="scope" />
    </q-popup-edit>
  </div>
</template>

<script lang="ts" setup>
import { PropType, defineEmits } from 'vue';
import { XPopupEditProps } from './index';

const $emits = defineEmits(['update:modelValue']);
defineProps({
  modelValue: {
    type: String as PropType<XPopupEditProps['modelValue']>,
  },
  options: {
    type: Object as PropType<XPopupEditProps['options']>,
  },
});
function updateModelValue(value: XPopupEditProps['modelValue']) {
  $emits('update:modelValue', value);
}
</script>
