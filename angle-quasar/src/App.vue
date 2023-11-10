<template>
  <router-view />
</template>

<script setup lang="ts">
import { useUserStore } from './stores/user';
useUserStore().initUserStore();
</script>
