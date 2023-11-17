<template>
  <q-toolbar class="text-black bg-grey-3">
    <q-btn round flat>
      <q-avatar>
        <img :src="currentConversation?.avatar" />
      </q-avatar>
    </q-btn>

    <span class="q-subtitle-1 q-pl-md">
      {{ currentConversation?.name }}
    </span>

    <q-space />

    <q-btn round flat icon="cancel" @click="mainStore.closeDialog" />
  </q-toolbar>
</template>
<script lang="ts" setup>
import { ref, computed, reactive } from 'vue';
import { useMainStore } from '@/stores/main';
import { useChatStore } from '@/stores/chat';

const mainStore = useMainStore();
const chatStore = useChatStore();
const currentConversation = computed(() =>
  chatStore.getChatList.find((i) => i.id === chatStore.getChatActive)
);
</script>
