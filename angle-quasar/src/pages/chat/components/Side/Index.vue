<template>
  <q-toolbar class="bg-grey-3">
    <q-avatar class="cursor-pointer">
      <img :src="userStore.getAvatarUrl" />
    </q-avatar>

    <q-space />

    <q-btn round flat icon="message" />
    <q-btn round flat icon="more_vert">
      <q-menu auto-close :offset="[110, 8]">
        <q-list style="min-width: 150px">
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
      class="WAL__field full-width"
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
        active-class="chat-list-selected"
        :active="chatStore.getChatListSelectedId === conversation.id"
        @click="setCurrentConversation(index)"
      >
        <q-item-section avatar>
          <q-avatar>
            <img :src="conversation.avatar" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">
            {{ conversation.name }}
          </q-item-label>
          <q-item-label class="conversation__summary" caption>
            <q-icon name="check" v-if="conversation.sent" />
            <q-icon name="not_interested" v-if="conversation.deleted" />
            {{ conversation.caption }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label caption>
            {{ conversation.time }}
          </q-item-label>
          <q-icon name="keyboard_arrow_down" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>
<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useChatStore } from '@/stores/chat';

const router = useRouter();
const userStore = useUserStore();
const chatStore = useChatStore();
const search = ref('');

function setCurrentConversation(id: number) {
  const chat = chatStore.getChatList[id];
  chatStore.setChatListSelectedId(chat.id);
  router.replace({ name: 'Chat', params: { uuid: id } });
}
</script>
<style lang="sass" scoped>
.chat-list-selected
  color: white
  background: var(--q-primary)
</style>
