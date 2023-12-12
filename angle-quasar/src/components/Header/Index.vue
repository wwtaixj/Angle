<template>
  <div>
    <XWinBar />
    <q-toolbar
      class="bg-grey-2 text-black x-header"
      style="-webkit-app-region: drag"
    >
      <span class="q-subtitle-1 q-pl-md text-h5">
        {{ title }}
      </span>

      <q-space />
    </q-toolbar>
  </div>
</template>
<script lang="ts" setup>
import { XWinBar } from '@/components';

defineOptions({
  name: 'XHeader',
});
defineProps({
  title: {
    type: String,
  },
});
</script>
<style lang="scss" scoped>
.x-header {
  min-height: 42px;
}
</style>
