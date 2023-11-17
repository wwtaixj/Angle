<template>
  <q-page class="q-pa-md">
    <q-virtual-scroll :items="heavyList" separator v-slot="{ item, index }">
      <XChatMessage
        :name="item.username"
        :avatar="item.avatarUrl"
        :text="item.text"
        :key="index"
        dense
      >
      </XChatMessage>
    </q-virtual-scroll>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useChatStore } from '@/stores/chat';
import { Message } from '@/stores/typings/chat';
import { XChatMessage } from '@/components';

const $q = useQuasar();
const chatStore = useChatStore();
const maxSize = 10000;
const heavyList = ref<Message[]>([]);
</script>
