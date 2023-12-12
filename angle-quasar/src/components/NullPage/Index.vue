<template>
  <div class="fit bg-grey-2" style="-webkit-app-region: drag">
    <XWinBar />
    <q-icon
      class="absolute-center"
      size="5em"
      color="grey-5"
      name="fa-regular fa-comments"
    />
  </div>
</template>

<script setup lang="ts">
import { XWinBar } from '@/components';
defineOptions({
  name: 'XNullPage',
});
</script>
