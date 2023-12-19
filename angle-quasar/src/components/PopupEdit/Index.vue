<template>
  <div class="cursor-pointer">
    {{ modelValue }}
    <q-popup-edit
      ref="popupEditRef"
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
import { PropType, defineEmits, useAttrs, ref } from 'vue';
import { XPopupEditProps } from './index';

defineOptions({
  name: 'XPopupEdit',
});

const $emits = defineEmits(['update:modelValue']);
defineProps({
  modelValue: {
    type: String as PropType<XPopupEditProps['modelValue']>,
  },
});
const popupEditRef = ref<HTMLElement>();
function updateModelValue(value: XPopupEditProps['modelValue']) {
  $emits('update:modelValue', value);
}
defineExpose({ popupEditRef });
</script>
