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
        <q-item class="q-mt-md" v-if="!chatRobotStore.chatList.length">
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
          :active="chatRobotStore.getActive?.chatId === item.chatId"
          @click="setCurrentConversation(item)"
        >
          <q-menu
            class="chat-list-menu text-body2"
            transition-show="scale"
            transition-hide="scale"
            touch-position
            context-menu
          >
            <q-list>
              <q-item clickable v-close-popup @click="toTop(index)">
                <q-item-section>置顶</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="editTitle(index)">
                <q-item-section>修改标题</q-item-section>
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
              <XInputPopupEdit
                ref="editTitleRef"
                class="inline"
                :model-value="item.title"
                @update:model-value="setChatRobotTitle($event, index, item)"
              />
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
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useChatRobotStore } from '@/stores/chatRobot';
import { formatTimestamp, moveToTop } from '@/utils';
import { getModelList } from '@/assets/constant';
import { useDBStore } from '@/stores/database';
import { XInputPopupEdit } from '@/components';

const router = useRouter();
const dbStore = useDBStore();
const chatRobotStore = useChatRobotStore();
const editTitleRef = ref();
/**
 * 设置当前会话
 * @param chat
 */
function setCurrentConversation(chat: ChatRobot.Chat) {
  if (chatRobotStore.getActive?.chatId === chat.chatId) return;
  chatRobotStore.setActive(chat);
  router.replace({ name: 'chatRobotBox', params: { uuid: chat.chatId } });
}
/**
 * 删除聊天
 * @param chat
 */
async function deleteChat(chat: ChatRobot.Chat) {
  try {
    await dbStore.deleteChatRobotHistoryTable(chat.chatId);
    const chatList = chatRobotStore.chatList;
    const findIndex = chatList.findIndex((item) => item.chatId === chat.chatId);
    chatList.splice(findIndex, 1);
    chatRobotStore.deleteChatList(chat, findIndex);
  } finally {
    if (chatRobotStore.getActive?.chatId === chat.chatId) {
      chatRobotStore.setActive(null);
    }
  }
}
/**
 * @description 置顶聊天
 * @param index
 */
function toTop(index: number) {
  chatRobotStore.chatList = moveToTop(chatRobotStore.chatList, index);
}
function setChatRobotTitle(title: string, index: number, chat: ChatRobot.Chat) {
  chatRobotStore.updateChatList(
    {
      chatId: chat.chatId,
      title,
    },
    index
  );
}
function editTitle(index: number) {
  editTitleRef.value[index].inputPopupEditRef.popupEditRef.show();
}
onMounted(async () => {
  await dbStore.initDatabase();
  const chat = chatRobotStore.getActive;
  if (chat) {
    chatRobotStore.setActive(chat);
    router.replace({
      name: 'chatRobotBox',
      params: { uuid: chatRobotStore.getActive.chatId },
    });
  }
});
</script>
