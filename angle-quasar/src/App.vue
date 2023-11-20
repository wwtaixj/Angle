<template>
  <router-view />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useSocketStore } from '@/stores/socket';
import { useDBStore } from '@/stores/database';
import { useChatStore } from '@/stores/chat';

const userStore = useUserStore();
const token = userStore.getToken;
userStore.initUserStore();
// console.log(process.env.VUE_ROUTER_MODE);
// console.log(import.meta.env.VITE_GLOB_SOCKET_URL);
if (token) {
  useChatStore()
    .setChatList()
    .then(() => {
      useDBStore().initDatabase();
    });
  useSocketStore().initSocket();
}
</script>
