<template>
  <XMessagePage
    ref="XMessagePageRef"
    :items="chatRobotStore.getActiveMssage"
    @send="send"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useChatRobotStore } from '@/stores/chatRobot';
import { XMessagePage } from '@/components';

const chatRobotStore = useChatRobotStore();
const XMessagePageRef = ref();

function send(text: string) {
  chatRobotStore.sendMessage(text);
  XMessagePageRef.value.clearMessage();
}
</script>
