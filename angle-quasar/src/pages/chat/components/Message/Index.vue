<template>
  <XMessagePage
    ref="XMessagePageRef"
    :items="chatStore.getChatActiveMssage"
    @send="send"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useChatStore } from '@/stores/chat';
import { XMessagePage } from '@/components';

const chatStore = useChatStore();
const XMessagePageRef = ref();

function send(text: string) {
  chatStore.sendMessage(text);
  XMessagePageRef.value.clearMessage();
}
</script>
