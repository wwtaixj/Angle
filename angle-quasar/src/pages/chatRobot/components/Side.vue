<template>
  <q-layout class="chat-layout fit bg-grey-3" view="hHh lpR fFf" container>
    <q-header class="text-black bg-grey-2" bordered>
      <q-toolbar class="q-py-md q-pt-md">
        <XButton
          outline
          text-color="primary"
          label="新增聊天"
          align="between"
          icon-right="add_circle_outline"
          class="full-width"
          @click="chatRobotStore.addChat"
        />
      </q-toolbar>
    </q-header>

    <q-scroll-area class="chat-list">
      <q-list>
        <q-item class="q-mt-md" v-if="!chatRobotStore.getChatList.length">
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
          v-for="(item, index) in chatRobotStore.getChatList"
          :key="index"
          clickable
          v-ripple
          active-class="chat-active"
          :active="chatRobotStore.getActive?.id === item.id"
          @click="setCurrentConversation(item)"
        >
          <q-menu class="chat-list-menu text-body2" touch-position context-menu>
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>置顶</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="deleteChat(item)">
                <q-item-section>删除聊天</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          <q-item-section>
            <q-item-label lines="1">
              {{ item.title }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-badge outline color="primary" :label="item.model" />
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
import { useChatRobotStore } from '@/stores/chatRobot';
import { Chat } from '@/stores/typings/chat';
import { XButton } from '@/components';
import { useDBStore } from '@/stores/database';

const router = useRouter();
//const userStore = useUserStore();
const chatRobotStore = useChatRobotStore();

/**
 * 设置当前会话
 * @param chat
 */
function setCurrentConversation(chat: ChatRobot.Chat) {
  // if (chatStore.getChatActive?.id === chat.id) return;
  // chatStore.setChatActive(chat);
  // router.replace({ name: 'chatBox', params: { uuid: chat.id } });
}
/**
 * 删除聊天
 * @param chat
 */
function deleteChat(chat: ChatRobot.Chat) {
  // const chatList = chatStore.getChatList;
  // const findIndex = chatList.findIndex((item) => item.id === chat.id);
  // chatList.splice(findIndex, 1);
  // chatStore.setChatList(chatList);
  // if (chatStore.getChatActive?.id === chat.id) {
  //   chatStore.setChatActive(void 0);
  // }
}
onMounted(async () => {
  const chat = chatRobotStore.getActive;
  if (chat) {
    await useDBStore().initDatabase();
    chatRobotStore.setActive(chat);
    router.replace({
      name: 'chatRobotBox',
      params: { uuid: chatRobotStore.getActive.id },
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
.chat-list-menu .q-list {
  .q-item {
    min-height: 35px;
  }
}
</style>
