<template>
  <router-view />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useSocketStore } from '@/stores/socket';
import { useMainStore } from '@/stores/main';

const userStore = useUserStore();
const token = userStore.getToken;

// console.log(process.env.VUE_ROUTER_MODE);
// console.log(import.meta.env.VITE_GLOB_SOCKET_URL);
if (token) {
  userStore.initUserStore();
  useUserStore().setFriends();
  useSocketStore().initSocket();
}
useMainStore().initMain();
</script>
<style lang="scss">
@import './css/app.scss';
</style>
