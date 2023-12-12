<template>
  <q-page :style="style">
    <q-splitter v-model="splitter" :limits="[30, 50]" class="window-height">
      <template v-slot:before>
        <Side />
      </template>
      <template v-slot:after>
        <XNullPage v-if="!userStore.getFriendActive" />
        <q-layout
          class="chat-layout bg-grey-2"
          v-else
          view="hHh lpR fFf"
          container
        >
          <q-header class="text-black bg-grey-2" bordered>
            <XHeader :title="userStore.getFriendActive?.username" />
          </q-header>
          <q-page-container>
            <q-card flat class="q-mt-xl bg-grey-2 q-px-md">
              <q-item>
                <q-item-section class="q-px-md" avatar>
                  <q-avatar>
                    <img :src="userStore.getFriendActive.avatarUrl" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{
                    userStore.getFriendActive?.username
                  }}</q-item-label>
                  <q-item-label caption>
                    {{
                      userStore.getFriendActive.gender === GenderEnum.MALE
                        ? '男'
                        : '女'
                    }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </q-card-section>

              <q-separator inset />

              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </q-card-section>
            </q-card>
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
//import { useChatStore } from '@/stores/chat';
import { useUserStore } from '@/stores/user';
import { XNullPage, XHeader } from '@/components';
import { GenderEnum } from '@/enums/user';

const $q = useQuasar();
//const chatStore = useChatStore();
const userStore = useUserStore();
//const socketStore = useSocketStore();
const splitter = ref(30);

const style = computed(() => {
  return {
    height: $q.screen.height + 'px',
  };
});
</script>
<style lang="scss">
.friends-layout > div > div {
  overflow: hidden !important;
}
</style>
