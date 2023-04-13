<template>
  <iframe class="chat-iframe" :src="chatGpt"></iframe>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '@renderer/store/userStore';
const userStore = useUserStore();
const { getUserName, getToken, getLanguage } = userStore;
const chatGpt = ref('');
chatGpt.value = `http://192.168.3.166:1002/#/chat?username=${getUserName}&token=${getToken}&lang=${getLanguage}`;
</script>
<style lang="less" scoped>
.chat-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
