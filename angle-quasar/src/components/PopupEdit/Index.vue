<template>
  <div class="cursor-pointer">
    {{ modelValue }}
    <q-popup-edit
      v-bind="useAttrs()"
      v-slot="scope"
      :model-value="modelValue"
      @update:model-value="updateModelValue"
    >
      <slot v-bind="scope" />
    </q-popup-edit>
  </div>
</template>

<script lang="ts" setup>
import { PropType, defineEmits, useAttrs } from 'vue';
import { XPopupEditProps } from './index';

const $emits = defineEmits(['update:modelValue']);
defineProps({
  modelValue: {
    type: String as PropType<XPopupEditProps['modelValue']>,
  },
});
function updateModelValue(value: XPopupEditProps['modelValue']) {
  $emits('update:modelValue', value);
}
</script>
