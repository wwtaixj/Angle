<template>
  <q-toolbar class="text-black bg-white">
    <q-btn round flat>
      <q-avatar>
        <img :src="currentConversation?.avatarUrl" />
      </q-avatar>
    </q-btn>

    <span class="q-subtitle-1 q-pl-md">
      {{ currentConversation?.username }}
    </span>

    <q-space />

    <q-btn round flat icon="cancel" @click="mainStore.closeDialog" />
  </q-toolbar>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useMainStore } from '@/stores/main';
import { useChatStore } from '@/stores/chat';

const mainStore = useMainStore();
const chatStore = useChatStore();
const currentConversation = computed(() =>
  chatStore.getChatList.find((i) => i.id === chatStore.getChatActive?.id)
);
</script>
