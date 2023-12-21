<template>
  <q-page ref="messagePageRef">
    <q-splitter
      v-model="horizontalSplitter"
      :limits="[60, 80]"
      horizontal
      style="height: calc(100vh - 69px)"
      @update:model-value="setScrollAreaHeight"
      before-class="overflow-hidden"
    >
      <template v-slot:before>
        <q-scroll-area
          :delay="1200"
          id="chat-message-scroll-id"
          ref="scrollAreaRef"
          :style="{ height: scrollAreaHeight }"
        >
          <q-virtual-scroll
            class="q-px-sm"
            scroll-target="#chat-message-scroll-id > .scroll"
            :items="items"
            ref="virtualScrollRef"
            v-slot="{ item, index }"
          >
            <XChatMessage
              :sent="item.sent"
              :avatar="item.avatar"
              :text="item.text"
              :key="index"
              :textHtml="item.textHtml"
              :loading="item.loading"
              :name="formatTimestamp(item.timestamp)"
              :contextMenu="contextMenu"
              :messageId="item.messageId"
            />
          </q-virtual-scroll>
          <slot name="loading" />
        </q-scroll-area>
      </template>
      <template v-slot:after>
        <div class="column fit bg-grey-2 q-pb-xl">
          <q-toolbar class="text-black col-2 q-px-none send-toolbar">
            <XButton
              round
              flat
              v-for="(tool, index) in tools"
              :key="index"
              v-bind="tool"
              @click="tool.click(tool, index)"
            />
          </q-toolbar>
          <textarea
            class="col send-message-field q-ml-md"
            v-model="message"
            type="textarea"
            @keyup.ctrl.enter="send"
            rows="2"
          />
          <XButton
            class="send-button"
            unelevated
            padding="xs lg"
            color="grey-3"
            text-color="primary"
            label="发送"
            @click="send"
          />
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>
<script lang="ts" setup>
import { ref, defineExpose, onMounted, nextTick, PropType } from 'vue';
import { QVirtualScroll, QPage, QScrollArea, debounce } from 'quasar';
import { XChatMessage, XButton, XMessagePageProps } from '@/components';
import { formatTimestamp } from '@/utils';

const $emits = defineEmits(['send']);
defineProps({
  items: {
    type: Array as PropType<XMessagePageProps['items']>,
    required: true,
  },
  tools: {
    type: Array as PropType<XMessagePageProps['tools']>,
    default: () => [],
  },
  contextMenu: {
    type: Array as PropType<XMessagePageProps['contextMenu']>,
  },
});
const virtualScrollRef = ref<QVirtualScroll>();
const horizontalSplitter = ref(80);
const messagePageRef = ref<QPage>();
const scrollAreaRef = ref<QScrollArea>();
const scrollAreaHeight = ref('0');
const message = ref('');

function setScrollAreaHeight() {
  const pageContainer = messagePageRef.value?.$el;
  if (pageContainer) {
    const minHeightPx = pageContainer.style.minHeight as string;
    const minHeight = minHeightPx.substring(0, minHeightPx.length - 2);

    scrollAreaHeight.value = `${
      (Number(minHeight) * horizontalSplitter.value) / 100
    }px`;
  }
}
function setScrollPositionBottom() {
  const scroll = scrollAreaRef.value?.getScroll();
  if (!scroll) return;
  scrollAreaRef.value?.setScrollPosition('vertical', scroll.verticalSize);
}
function send() {
  if (!message.value) {
    return;
  }
  $emits('send', message.value);
}

function clearMessage() {
  message.value = '';
}
// 暴露给父组件的数据和方法
defineExpose({
  clearMessage,
  setScrollPositionBottom,
});

// 监听窗口变化时重新计算高度
window.addEventListener('resize', debounce(setScrollAreaHeight));

onMounted(() => {
  nextTick(() => {
    setScrollAreaHeight();
    setTimeout(() => {
      setScrollPositionBottom();
    }, 100);
  });
});
</script>
<style lang="scss" scoped>
.send-toolbar {
  height: 40px;
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
