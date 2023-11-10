<template>
  <q-btn v-bind="options">
    <slot />
    <template v-slot:loading>
      <template v-if="slots.loading">
        <slot name="loading" />
      </template>
      <q-spinner-facebook v-else />
    </template>
  </q-btn>
</template>
<script lang="ts" setup>
import { PropType, useSlots } from 'vue';
import { QBtnProps, QBtnSlots } from 'quasar';

const slots: Partial<QBtnSlots> = useSlots();

defineOptions({
  name: 'XButton',
});
defineProps({
  options: {
    type: Object as PropType<QBtnProps>,
    default: () => ({}),
  },
});
</script>
