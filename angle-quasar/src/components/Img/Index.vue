<template>
  <q-img v-bind="attrs">
    <template v-slot:error>
      <q-icon name="broken_image" />
    </template>
    <template #loading>
      <q-spinner-puff :size="attrs.spinnerSize" color="primary" />
    </template>
    <template v-for="key in slots" v-slot:[key]>
      <slot :name="key" />
    </template>
  </q-img>
</template>
<script lang="ts" setup>
import { useAttrs, computed, useSlots } from 'vue';
import { XImgProps } from '@/components';

defineOptions({
  name: 'XImg',
});

const slots = computed(() => Object.keys(useSlots())) as unknown;
const attrs: XImgProps = useAttrs();
</script>
