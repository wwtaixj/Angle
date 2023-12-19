<template>
  <XPopupEdit
    ref="inputPopupEditRef"
    v-bind="attrs"
    v-slot="scope"
    :model-value="modelValue"
    @update:model-value="updateModelValue"
  >
    <q-input
      autofocus
      dense
      v-model="scope.value"
      :hint="attrs.hint"
      :rules="[(val) => scope.validate(val)]"
    >
      <template v-slot:after>
        <q-btn
          flat
          dense
          color="negative"
          icon="cancel"
          @click.stop.prevent="scope.cancel"
        />

        <q-btn
          flat
          dense
          color="positive"
          icon="check_circle"
          @click.stop.prevent="scope.set"
          :disable="
            scope.validate(scope.value) === false ||
            scope.initialValue === scope.value
          "
        />
      </template>
    </q-input>
  </XPopupEdit>
</template>

<script lang="ts" setup>
import { PropType, defineEmits, useAttrs, ref } from 'vue';
import { XPopupEdit } from '../PopupEdit';
import { XInputPopupEditProps } from './index';

defineOptions({
  name: 'XInputPopupEdit',
});
const attrs: Omit<XInputPopupEditProps, 'modelValue'> = useAttrs();

const $emits = defineEmits(['update:modelValue']);
defineProps({
  modelValue: {
    type: String as PropType<XInputPopupEditProps['modelValue']>,
  },
});
const inputPopupEditRef = ref<HTMLElement>();
function updateModelValue(value: XInputPopupEditProps['modelValue']) {
  $emits('update:modelValue', value);
}
defineExpose({ inputPopupEditRef });
</script>
