<template>
  <q-toolbar class="bg-grey-2 text-black">
    <span class="q-subtitle-1 q-pl-md text-h5">
      {{ currentConversation?.username }}
    </span>

    <q-space />
  </q-toolbar>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
// import { useMainStore } from '@/stores/main';
import { useChatStore } from '@/stores/chat';

const chatStore = useChatStore();
const currentConversation = computed(() =>
  chatStore.getChatList.find((i) => i.id === chatStore.getChatActive?.id)
);
</script>
