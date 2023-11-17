<template>
  <router-view />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useChatStore } from '@/stores/chat';
import { useDBStore } from '@/stores/database';

const userStore = useUserStore();
const token = userStore.getToken;
const username = userStore.getUserName;
userStore.initUserStore();
// console.log(process.env.VUE_ROUTER_MODE);
// console.log(import.meta.env.VITE_GLOB_SOCKET_URL);
if (token) {
  useChatStore().connectionSocket(token, username);
  useDBStore().initDatabase();
}
</script>
