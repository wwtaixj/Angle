<template>
  <q-layout class="chat-layout fit bg-grey-3" view="hHh lpR fFf" container>
    <q-header class="text-black bg-grey-2" bordered>
      <q-toolbar class="q-py-md">
        <XInput
          outlined
          dense
          type="search"
          debounce="500"
          class="full-width"
          bg-color="white"
          v-model="search"
          placeholder="搜索"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </XInput>
        <q-btn round flat icon="more_vert">
          <q-menu auto-close :offset="[110, 8]">
            <q-list>
              <q-item clickable>
                <q-item-section>New group</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Archived</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Favorites</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-scroll-area class="chat-list">
      <q-list>
        <q-item class="q-mt-md" v-if="!chatStore.getChatList.length">
          <q-item-section class="absolute-center">
            <q-icon
              size="32px"
              style="color: #e0e0e0"
              name="fa-regular fa-comments"
            />
          </q-item-section>
        </q-item>
        <q-item
          v-else
          v-for="(conversation, index) in chatStore.getChatList"
          :key="index"
          clickable
          v-ripple
          active-class="chat-active"
          :active="chatStore.getChatActive?.id === conversation.id"
          @click="setCurrentConversation(conversation)"
        >
          <q-item-section avatar>
            <q-avatar>
              <img :src="conversation.avatarUrl" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">
              {{ conversation.username }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="keyboard_arrow_down" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-layout>
</template>
<script lang="ts" setup>
//import { useQuasar } from 'quasar';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
//import { useUserStore } from '@/stores/user';
import { useChatStore } from '@/stores/chat';
import { Chat } from '@/stores/typings/chat';
import { XInput } from '@/components';

const router = useRouter();
//const userStore = useUserStore();
const chatStore = useChatStore();
const search = ref('');

function setCurrentConversation(chat: Chat) {
  if (chatStore.getChatActive?.id === chat.id) return;
  chatStore.setChatActive(chat);
  router.replace({ name: 'chatBox', params: { uuid: chat.id } });
}
onMounted(() => {
  const chat = chatStore.getChatActive;
  if (chat) {
    chatStore.setChatActive(chat);
    router.replace({
      name: 'chatBox',
      params: { uuid: chatStore.getChatActive.id },
    });
  }
});
</script>
<style lang="scss" scoped>
.chat-active {
  color: black;
  background: $grey-5;
}
.chat-list {
  height: calc(100vh - 74px);
  margin-top: 74px;
}
</style>
