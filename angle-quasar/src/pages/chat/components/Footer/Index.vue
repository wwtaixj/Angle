<template>
  <div class="bg-grey-2 column fit q-px-md q-pb-md">
    <q-toolbar class="col-2 text-black q-px-none">
      <q-btn round flat icon="insert_emoticon" />
    </q-toolbar>
    <XInput
      :clearable="false"
      class="col-8 send-message-field"
      v-model="message"
      type="textarea"
      @keyup.ctrl.enter="send"
    />
    <div class="row justify-end">
      <q-btn
        unelevated
        padding="xs lg"
        color="grey-3"
        text-color="positive"
        label="发送"
        @click="send"
      >
      </q-btn>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { useChatStore } from '@/stores/chat';
import { XInput } from '@/components';

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
<style lang="scss">
.send-message-field {
  .q-field__control:after {
    display: none;
  }
  .q-field__control:before {
    display: none;
  }
  .q-field__native {
    padding: 0;
    resize: none;
  }
}
</style>
