<template>
  <XMessagePage
    ref="XMessagePageRef"
    :items="chatStore.getChatActiveMssage"
    :editor="editor as XMessagePageProps['editor']"
    @send="send"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useChatStore } from '@/stores/chat';
import { XMessagePage, XMessagePageProps, SendData } from '@/components';

const editor = computed(() => {
  const toolbar = [['smile']];
  const tool: XMessagePageProps['editor'] = {
    definitions: {
      smile: {
        tip: '表情',
        icon: 'fa-regular fa-face-smile',
        handler: () => {
          //
        },
      },
    },
    toolbar,
    toolbarColor: 'grey-8',
  };
  return tool;
});
const chatStore = useChatStore();
const XMessagePageRef = ref();

function send({ text }: SendData) {
  chatStore.sendMessage(text);
  XMessagePageRef.value?.setMessage('');
}
</script>
