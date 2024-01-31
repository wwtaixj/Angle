<template>
  <q-page :style="style" ref="chatRobotPageRef">
    <q-splitter
      v-model="chatRobotStore.ySplitter"
      :limits="[25, 40]"
      @update:model-value="setScrollAreaWidth"
      class="window-height"
    >
      <template v-slot:before>
        <Side />
      </template>
      <template v-slot:after>
        <XNullPage v-if="!chatRobotStore.getActive" />
        <q-layout class="chat-layout" v-else view="hHh lpR fFf" container>
          <q-header class="text-black bg-grey-2" bordered>
            <XHeader :title="chatRobotStore.getActive?.title" />
          </q-header>

          <q-page-container>
            <router-view v-slot="{ Component, route }">
              <component :is="Component" :key="route.fullPath" />
            </router-view>
          </q-page-container>
        </q-layout>
      </template>
    </q-splitter>
  </q-page>
</template>

<script lang="ts" setup>
import { QPage, debounce, useQuasar } from 'quasar';
import { ref, nextTick, onMounted, computed } from 'vue';
import Side from './components/Side.vue';
// import { useMainStore } from '../../stores/main';
import { useChatRobotStore } from '@/stores/chatRobot';
//import { useUserStore } from '@/stores/user';
import { XHeader, XNullPage } from '@/components';

const $q = useQuasar();
const chatRobotPageRef = ref<QPage>();
const chatRobotStore = useChatRobotStore();
const style = computed(() => {
  return {
    height: $q.screen.height + 'px',
    width: $q.screen.width - 56 + 'px',
  };
});

function setScrollAreaWidth(value?: number) {
  if (value) chatRobotStore.setYSplitter(value);
  const splitter = value || chatRobotStore.ySplitter;
  const pageContainer = chatRobotPageRef.value?.$el;
  if (pageContainer) {
    const widththPx = pageContainer.style.width as string;
    const width = widththPx.substring(0, widththPx.length - 2);
    // 计算message最大宽度=屏幕宽度-分割器宽度-左右边距-头像宽度
    chatRobotStore.maxWidth = `${
      (Number(width) * (100 - splitter)) / 100 - 48 - 40
    }px`;
  }
}
// 监听窗口变化时重新计算高度
window.addEventListener(
  'resize',
  debounce(() => {
    setScrollAreaWidth();
  })
);

onMounted(() => {
  nextTick(() => {
    setScrollAreaWidth();
  });
});
</script>
<style lang="scss">
.chat-layout > div > div {
  overflow: hidden !important;
}
</style>
