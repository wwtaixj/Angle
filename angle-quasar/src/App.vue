<template>
  <router-view />
</template>

<script setup lang="ts">
import { useUserStore } from './stores/user';
import { useChatStore } from '@/stores/chat';

const userStore = useUserStore();
const token = userStore.getToken;
const username = userStore.getUserName;
userStore.initUserStore();

if (token) {
  useChatStore().connectionSocket(token, username);
}
</script>
