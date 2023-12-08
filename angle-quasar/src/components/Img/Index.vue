<template>
  <q-img v-bind="useAttrs()">
    <template v-slot:error>
      <q-icon name="broken_image" />
    </template>
  </q-img>
</template>
<script lang="ts" setup>
import { useAttrs } from 'vue';

defineOptions({
  name: 'XImg',
});
</script>
