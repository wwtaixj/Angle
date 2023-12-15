<template>
  <q-page :style="style">
    <q-splitter v-model="splitter" :limits="[30, 50]" class="window-height">
      <template v-slot:before>
        <Side />
      </template>
      <template v-slot:after>
        <XNullPage v-if="!chatStore.getChatActive" />
        <q-layout class="chat-layout" v-else view="hHh lpR fFf" container>
          <q-header class="text-black bg-grey-2" bordered>
            <XHeader :title="chatStore.getChatActive?.username" />
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
import { ref, computed } from 'vue';
import Side from './components/Side.vue';

// import { useMainStore } from '../../stores/main';
import { useChatStore } from '@/stores/chat';
//import { useUserStore } from '@/stores/user';
import { XHeader, XNullPage } from '@/components';

const $q = useQuasar();
const chatStore = useChatStore();
//const userStore = useUserStore();
//const socketStore = useSocketStore();
const splitter = ref(30);

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
