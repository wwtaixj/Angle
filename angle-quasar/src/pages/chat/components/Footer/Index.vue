<template>
  <q-toolbar class="bg-white text-black row">
    <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
    <q-input
      rounded
      outlined
      dense
      class="WAL__field col-grow q-mr-sm"
      bg-color="white"
      v-model="message"
      placeholder="Type a message"
    />
    <q-btn round flat icon="send" @click="send" />
  </q-toolbar>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useChatStore } from '@/stores/chat';

const chatStore = useChatStore();
const message = ref('');
function send() {
  chatStore.sendMessage(message.value);
  message.value = '';
}
</script>
