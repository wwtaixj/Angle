<template>
  <div class="fit bg-grey-3">
    <q-toolbar>
      <q-btn round flat icon="message" />
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

    <q-toolbar>
      <q-input
        rounded
        outlined
        dense
        class="full-width"
        bg-color="white"
        v-model="search"
        placeholder="Search or start a new conversation"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-toolbar>

    <q-scroll-area style="height: calc(100% - 100px)">
      <q-list>
        <q-item
          v-for="(conversation, index) in chatStore.chatList"
          :key="conversation.id"
          clickable
          v-ripple
          active-class="chat-list-active"
          :active="chatStore.getChatActive?.id === conversation.id"
          @click="setCurrentConversation(index)"
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
            <!-- <q-item-label class="conversation__summary" caption>
              <q-icon name="check" v-if="conversation.sent" />
              <q-icon name="not_interested" v-if="conversation.deleted" />
              {{ conversation.caption }}
            </q-item-label> -->
          </q-item-section>

          <q-item-section side>
            <!-- <q-item-label caption>
              {{ conversation.time }}
            </q-item-label> -->
            <q-icon name="keyboard_arrow_down" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>
<script lang="ts" setup>
//import { useQuasar } from 'quasar';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
//import { useUserStore } from '@/stores/user';
import { useChatStore } from '@/stores/chat';

const router = useRouter();
//const userStore = useUserStore();
const chatStore = useChatStore();
const search = ref('');

function setCurrentConversation(index: number) {
  const chat = chatStore.getChatList[index];
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
<style lang="sass" scoped>
.chat-list-active
  color: black
  background: $grey-5
</style>
