<template>
  <XInput
    :model-value="modelValue"
    @update:model-value="updateModelValue"
    :type="isPwd ? 'password' : 'text'"
    v-bind="useAttrs()"
  >
    <template v-slot:append>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
      <slot name="append" />
    </template>
    <template v-for="key in slots" v-slot:[key]>
      <slot :name="key" />
    </template>
  </XInput>
</template>
<script lang="ts" setup>
import { ref, PropType, defineEmits, useSlots, computed, useAttrs } from 'vue';
import { XInputPasswordProps, XInput } from '../index';

const isPwd = ref(true);
const slots = computed(
  () => Object.keys(useSlots()).filter((i) => i !== 'append') as unknown
);

const $emits = defineEmits(['update:modelValue']);

defineOptions({
  name: 'XInputPassword',
});
defineProps({
  modelValue: {
    type: String as PropType<XInputPasswordProps['modelValue']>,
  },
});

function updateModelValue(value: XInputPasswordProps['modelValue']) {
  $emits('update:modelValue', value);
}
</script>
