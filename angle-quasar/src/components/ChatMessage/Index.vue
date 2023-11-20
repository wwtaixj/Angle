<template>
  <q-chat-message v-bind="attrs"> </q-chat-message>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';
import { XChatMessageProps } from './index';

defineOptions({
  name: 'XChatMessage',
});

const attrs: XChatMessageProps = useAttrs();
</script>
