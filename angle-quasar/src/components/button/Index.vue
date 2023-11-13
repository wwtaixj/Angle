<template>
  <q-btn v-bind="useAttrs()">
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
import { useSlots, useAttrs } from 'vue';
import { QBtnSlots } from 'quasar';

const slots: Partial<QBtnSlots> = useSlots();

defineOptions({
  name: 'XButton',
});
</script>
