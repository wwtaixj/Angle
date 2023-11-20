<template>
  <q-page class="q-pa-md">
    <q-virtual-scroll
      :items="chatStore.getChatActiveMssage"
      v-slot="{ item, index }"
    >
      <XChatMessage
        :sent="item.sent"
        :avatar="item.avatarUrl"
        :text="item.message"
        :key="index"
      />
    </q-virtual-scroll>
  </q-page>
</template>
<script setup lang="ts">
// import { ref } from 'vue';
//import { useQuasar } from 'quasar';
import { useChatStore } from '@/stores/chat';
import { XChatMessage } from '@/components';
//import { useDBStore } from '@/stores/database';

//const $q = useQuasar();
const chatStore = useChatStore();
</script>
