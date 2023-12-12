<template>
  <router-view />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useSocketStore } from '@/stores/socket';
import { useDBStore } from '@/stores/database';
import { useMainStore } from '@/stores/main';

const userStore = useUserStore();
const token = userStore.getToken;

// console.log(process.env.VUE_ROUTER_MODE);
// console.log(import.meta.env.VITE_GLOB_SOCKET_URL);
if (token) {
  userStore.initUserStore();
  useUserStore()
    .setFriends()
    .then(() => {
      useDBStore().initDatabase();
    });
  useSocketStore().initSocket();
}
useMainStore().initMain();
</script>
