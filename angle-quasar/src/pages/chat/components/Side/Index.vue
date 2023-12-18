<template>
  <q-layout class="chat-layout fit bg-grey-3" view="hHh lpR fFf" container>
    <q-header class="text-black bg-grey-2" bordered>
      <q-toolbar class="q-py-md chat-list-header">
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

    <q-scroll-area class="chat-list-scroll">
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
          active-class="chat-list-active"
          :active="chatStore.getChatActive?.id === conversation.id"
          @click="setCurrentConversation(conversation)"
        >
          <q-menu class="chat-list-menu text-body2" touch-position context-menu>
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>置顶</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="deleteChat(conversation)">
                <q-item-section>删除聊天</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          <q-item-section avatar>
            <q-avatar>
              <img
                :src="conversation.avatarUrl"
                style="width: 32px; height: 32px"
              />
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
import { useDBStore } from '@/stores/database';

const router = useRouter();
//const userStore = useUserStore();
const chatStore = useChatStore();
const search = ref('');
/**
 * 设置当前会话
 * @param chat
 */
function setCurrentConversation(chat: Chat) {
  if (chatStore.getChatActive?.id === chat.id) return;
  chatStore.setChatActive(chat);
  router.replace({ name: 'chatBox', params: { uuid: chat.id } });
}
/**
 * 删除聊天
 * @param chat
 */
function deleteChat(chat: Chat) {
  const chatList = chatStore.getChatList;
  const findIndex = chatList.findIndex((item) => item.id === chat.id);
  chatList.splice(findIndex, 1);
  chatStore.setChatList(chatList);
  if (chatStore.getChatActive?.id === chat.id) {
    chatStore.setChatActive(null);
  }
}
onMounted(async () => {
  const chat = chatStore.getChatActive;
  if (chat) {
    await useDBStore().initDatabase();
    chatStore.setChatActive(chat);
    router.replace({
      name: 'chatBox',
      params: { uuid: chatStore.getChatActive.id },
    });
  }
});
</script>
