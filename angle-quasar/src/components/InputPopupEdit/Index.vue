<template>
  <XPopupEdit
    :model-value="modelValue"
    @update:model-value="updateModelValue"
    v-bind="options"
    v-slot="scope"
  >
    <q-input
      autofocus
      dense
      v-model="scope.value"
      :hint="options?.hint"
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
import { PropType, defineEmits } from 'vue';
import { XPopupEdit, XPopupEditProps } from '../PopupEdit';
import { XInputPopupEditProps } from './index';

const $emits = defineEmits(['update:modelValue']);
defineProps({
  modelValue: {
    type: String as PropType<XPopupEditProps['modelValue']>,
  },
  options: {
    type: Object as PropType<
      XPopupEditProps['options'] & Omit<XInputPopupEditProps, 'modelValue'>
    >,
  },
});
function updateModelValue(value: XPopupEditProps['modelValue']) {
  $emits('update:modelValue', value);
}
</script>
