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
            <q-card flat class="q-mt-xl bg-grey-2 q-px-lg">
              <q-item>
                <q-item-section class="q-pr-md" avatar>
                  <XAvatar
                    :src="userStore.getFriendActive.avatarUrl"
                    :text="userStore.getFriendActive.username.charAt(0)"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle2">{{
                    userStore.getFriendActive?.username
                  }}</q-item-label>
                  <q-item-label caption>
                    <span class="q-mr-md">{{
                      userStore.getFriendActive.gender === GenderEnum.MALE
                        ? $t('Man')
                        : $t('Woman')
                    }}</span>
                    <span> {{ userStore.getFriendActive.age }}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator inset />
              <q-card-section>
                <span class="q-mr-md text-body2 text-grey-7"> 标签 </span>
                <span class="text-subtitle2">
                  {{ userStore.getFriendActive.tag }}</span
                >
              </q-card-section>

              <q-separator inset />

              <q-card-section>
                <span class="q-mr-md text-body2 text-grey-7">手机号</span>
                <span class="text-subtitle2">
                  {{ userStore.getFriendActive.phone }}
                </span>
              </q-card-section>
              <q-separator inset />
              <q-card-actions vertical align="center" class="q-mt-md">
                <q-btn
                  flat
                  stack
                  icon="fa-regular fa-comment"
                  label="发消息"
                  color="primary"
                  @click="chatStore.openChat(userStore.getFriendActive)"
                />
              </q-card-actions>
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
import { useChatStore } from '@/stores/chat';
import { useUserStore } from '@/stores/user';
import { XNullPage, XHeader, XAvatar } from '@/components';
import { GenderEnum } from '@/enums/user';

const $q = useQuasar();
const chatStore = useChatStore();
const userStore = useUserStore();
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
