<template>
  <q-chat-message class="x-chat-message" v-bind="attrs"> </q-chat-message>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';
import { XChatMessageProps } from './index';

defineOptions({
  name: 'XChatMessage',
});

const attrs: XChatMessageProps = useAttrs();
</script>
<style lang="scss">
.x-chat-message {
  &:first-child {
    margin-top: 8px;
  }
  .q-message-container {
    align-items: center;
  }
  .q-message-avatar {
    width: 35px;
    height: 35px;
    min-width: 35px;
    .q-message-avatar--sent {
      margin-right: 4px;
    }
  }
  .q-message-text:last-child {
    border-radius: 4px;
    min-height: 0;
    &::before {
      top: 50%;
      transform: translateY(-50%);
      border-style: solid;
    }
  }
  .q-message-text--sent {
    &:last-child:before {
      border-width: 5px 0 5px 5px;
      border-color: transparent transparent transparent #e0e0e0;
    }
  }
  .q-message-text--received {
    &:last-child:before {
      border-width: 5px 5px 5px 0;
      border-color: transparent #81c784 transparent transparent;
    }
  }
}
</style>
