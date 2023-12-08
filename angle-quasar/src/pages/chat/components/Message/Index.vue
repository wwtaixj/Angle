<template>
  <q-virtual-scroll
    class="q-mx-md"
    scroll-target="#chat-message-scroll-id > .scroll"
    :items="chatStore.getChatActiveMssage"
    separator
    ref="virtualScrollRef"
    v-slot="{ item, index }"
  >
    <XChatMessage
      :sent="item.sent"
      :avatar="item.avatarUrl"
      :text="item.message"
      :key="index"
    />
  </q-virtual-scroll>
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { QVirtualScroll } from 'quasar';
import { useChatStore } from '@/stores/chat';
import { XChatMessage } from '@/components';
//import { useDBStore } from '@/stores/database';

//const $q = useQuasar();
const virtualScrollRef = ref<QVirtualScroll>();
const chatStore = useChatStore();

onMounted(() => {
  nextTick(() => {
    virtualScrollRef.value?.scrollTo(chatStore.getChatActiveMssage.length - 1);
  });
});
</script>
