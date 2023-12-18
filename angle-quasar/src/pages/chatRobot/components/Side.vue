<template>
  <q-layout class="chat-layout fit bg-grey-3" view="hHh lpR fFf" container>
    <q-header class="text-black bg-grey-2" bordered>
      <q-toolbar class="q-py-md q-pt-md">
        <q-btn-dropdown
          outline
          split
          align="center"
          color="primary"
          class="full-width"
          label="新增聊天"
          @click="chatRobotStore.addChat"
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
              v-for="(item, index) in getModelList()"
              :key="index"
              :active="chatRobotStore.getChatModel?.value === item.value"
              @click="chatRobotStore.setChatModel(item.value)"
            >
              <q-item-section avatar>
                <q-icon name="api" color="grey-8" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
                <q-item-label caption>{{ item.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-scroll-area class="chat-list-scroll full-width">
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
          active-class="chat-list-active"
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
          <q-item-section avatar>
            <q-icon
              size="24px"
              color="primary"
              name="fa-regular fa-comment-dots"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">
              {{ item.title }}
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-badge
              class="no-border q-pr-none"
              outline
              align="middle"
              color="primary"
              :label="item.model"
            />
            <q-item-label caption>{{
              formatTimestamp(item.timestamp)
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-layout>
</template>
<script lang="ts" setup>
//import { useQuasar } from 'quasar';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useChatRobotStore } from '@/stores/chatRobot';
import { formatTimestamp } from '@/utils';
import { getModelList } from '@/assets/constant';
import { useDBStore } from '@/stores/database';

const router = useRouter();
const dbStore = useDBStore();
const chatRobotStore = useChatRobotStore();

/**
 * 设置当前会话
 * @param chat
 */
function setCurrentConversation(chat: ChatRobot.Chat) {
  if (chatRobotStore.getActive?.id === chat.id) return;
  chatRobotStore.setActive(chat);
  router.replace({ name: 'chatRobotBox', params: { uuid: chat.id } });
}
/**
 * 删除聊天
 * @param chat
 */
async function deleteChat(chat: ChatRobot.Chat) {
  try {
    await dbStore.deleteChatRobotHistory(chat.id);
    const chatList = chatRobotStore.getChatList;
    const findIndex = chatList.findIndex((item) => item.id === chat.id);
    chatList.splice(findIndex, 1);
    chatRobotStore.setChatList(chatList);
  } finally {
    if (chatRobotStore.getActive?.id === chat.id) {
      chatRobotStore.setActive(null);
    }
  }
}
onMounted(async () => {
  const chat = chatRobotStore.getActive;
  if (chat) {
    await dbStore.initDatabase();
    chatRobotStore.setActive(chat);
    router.replace({
      name: 'chatRobotBox',
      params: { uuid: chatRobotStore.getActive.id },
    });
  }
});
</script>
