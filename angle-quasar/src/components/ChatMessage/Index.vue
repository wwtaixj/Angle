<template>
  <q-chat-message v-bind="attrs">
    <slot v-for="slot in slots" :name="slot" />
  </q-chat-message>
</template>

<script lang="ts" setup>
import { useSlots, useAttrs } from 'vue';
import { XChatMessageProps, XChatMessageSlots } from './index';

const attrs: XChatMessageProps = useAttrs();
const slots: Partial<XChatMessageSlots> = useSlots();
</script>
