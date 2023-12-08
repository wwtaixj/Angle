<template>
  <div class="position-relative" :style="style">
    <q-splitter
      v-model="splitterModel"
      :limits="[30, 50]"
      class="window-height"
    >
      <template v-slot:before>
        <Side />
      </template>
      <template v-slot:after>
        <div class="fit bg-grey-2" v-show="!chatStore.getChatActive">
          <XWinBar />
          <q-icon
            class="absolute-center"
            size="5em"
            color="grey-5"
            name="fa-regular fa-comments"
          />
        </div>
        <q-layout v-show="chatStore.getChatActive" view="hHh lpR fFf" container>
          <q-header class="text-black bg-grey-2" bordered>
            <XWinBar />
            <Header />
          </q-header>

          <q-page-container>
            <q-page class="q-mx-xs" ref="messagePageRef">
              <q-infinite-scroll
                id="chat-message-scroll-id"
                :style="{ height: scrollAreaHeight }"
                reverse
              >
                <router-view v-slot="{ Component, route }">
                  <component :is="Component" :key="route.fullPath" />
                </router-view>
              </q-infinite-scroll>
              <!-- <q-scroll-area
                :delay="1200"
                :style="{ height: scrollAreaHeight }"
                id="chat-message-scroll-id"
                ref="scrollAreaRef"
              > -->

              <!-- </q-scroll-area> -->
            </q-page>
          </q-page-container>

          <q-footer class="bg-grey-2" bordered>
            <Footer @send="setScrollPositionBottom" />
          </q-footer>
        </q-layout>
      </template>
    </q-splitter>
  </div>
</template>

<script lang="ts" setup>
import { useQuasar, QPage, QScrollArea, debounce } from 'quasar';
import { ref, computed, nextTick, onMounted } from 'vue';
import Header from './components/Header/Index.vue';
import Side from './components/Side/Index.vue';
import Footer from './components/Footer/Index.vue';
// import { useMainStore } from '../../stores/main';
import { useChatStore } from '@/stores/chat';
//import { useUserStore } from '@/stores/user';
import { XWinBar } from '@/components';

const $q = useQuasar();
const chatStore = useChatStore();
//const userStore = useUserStore();
//const socketStore = useSocketStore();
const splitterModel = ref(30);
const messagePageRef = ref<QPage>();
const scrollAreaRef = ref<QScrollArea>();
const scrollAreaHeight = ref('0');

const style = computed(() => {
  return {
    height: $q.screen.height + 'px',
  };
});

function setScrollAreaHeight() {
  const pageContainer = messagePageRef.value?.$el;
  if (pageContainer) {
    scrollAreaHeight.value = pageContainer.style.minHeight;
  }
}
function setScrollPositionBottom() {
  const scroll = scrollAreaRef.value?.getScroll();

  if (!scroll) return;
  scrollAreaRef.value?.setScrollPosition('vertical', scroll.verticalSize);
}
// 监听窗口变化时重新计算高度
window.addEventListener('resize', debounce(setScrollAreaHeight, 100));
onMounted(() => {
  nextTick(() => {
    setScrollAreaHeight();
  });
});
</script>
