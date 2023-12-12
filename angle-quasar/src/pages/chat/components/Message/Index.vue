<template>
  <q-page class="q-mx-xs" ref="messagePageRef">
    <q-splitter
      v-model="horizontalSplitter"
      :limits="[60, 80]"
      horizontal
      style="height: calc(100vh - 75px)"
      @update:model-value="setScrollAreaHeight"
      before-class="hide-scrollbar"
    >
      <template v-slot:before>
        <q-scroll-area
          :delay="1200"
          id="chat-message-scroll-id"
          ref="scrollAreaRef"
          :style="{ height: scrollAreaHeight }"
        >
          <q-virtual-scroll
            class="q-mx-md"
            scroll-target="#chat-message-scroll-id > .scroll"
            :items="chatStore.getChatActiveMssage"
            separator
            ref="virtualScrollRef"
            component="q-chat-message"
            v-slot="{ item, index }"
          >
            <XChatMessage
              :sent="item.sent"
              :avatar="item.avatarUrl"
              :text="item.message"
              :key="index"
            />
          </q-virtual-scroll>
        </q-scroll-area>
      </template>
      <template v-slot:after>
        <Footer @send="setScrollPositionBottom" />
      </template>
    </q-splitter>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { QVirtualScroll, QPage, QScrollArea, debounce } from 'quasar';
import { useChatStore } from '@/stores/chat';
import { XChatMessage } from '@/components';
import Footer from '../Footer/Index.vue';
//import { useDBStore } from '@/stores/database';

//const $q = useQuasar();
const virtualScrollRef = ref<QVirtualScroll>();
const chatStore = useChatStore();
const horizontalSplitter = ref(80);
const messagePageRef = ref<QPage>();
const scrollAreaRef = ref<QScrollArea>();
const scrollAreaHeight = ref('0');

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
