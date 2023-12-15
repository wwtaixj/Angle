<template>
  <div class="column fit bg-grey-2 q-px-md q-pb-xl">
    <q-toolbar class="col-2 text-black q-px-none send-toolbar">
      <q-btn round flat icon="insert_emoticon" />
    </q-toolbar>
    <textarea
      class="col send-message-field"
      v-model="message"
      type="textarea"
      @keyup.ctrl.enter="send"
      rows="2"
    />
    <q-btn
      class="send-button"
      unelevated
      padding="xs lg"
      color="grey-3"
      text-color="positive"
      label="发送"
      @click="send"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { useChatStore } from '@/stores/chat';

const $emits = defineEmits(['send']);
const chatStore = useChatStore();
const message = ref('');
const showTip = ref(false);

function send() {
  if (!message.value) {
    showTip.value = true;
    return;
  }
  $emits('send', message.value);
  chatStore.sendMessage(message.value);
  message.value = '';
}
</script>
<style lang="scss" scoped>
.send-toolbar {
  height: 35px;
}
.send-message-field {
  border: none;
  background-color: transparent;
  resize: none;
  &:focus-visible {
    outline: none;
  }
}
.send-button {
  position: absolute;
  bottom: 16px;
  right: 16px;
}
</style>
