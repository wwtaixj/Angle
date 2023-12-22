<template>
  <q-page :style="style">
    <q-splitter
      v-model="chatRobotStore.ySplitter"
      :limits="[30, 50]"
      @update:model-value="chatRobotStore.setYSplitter"
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
import { useQuasar } from 'quasar';
import { computed } from 'vue';
import Side from './components/Side.vue';
// import { useMainStore } from '../../stores/main';
import { useChatRobotStore } from '@/stores/chatRobot';
//import { useUserStore } from '@/stores/user';
import { XHeader, XNullPage } from '@/components';

const $q = useQuasar();
const chatRobotStore = useChatRobotStore();

const style = computed(() => {
  return {
    height: $q.screen.height + 'px',
  };
});
</script>
<style lang="scss">
.chat-layout > div > div {
  overflow: hidden !important;
}
</style>
