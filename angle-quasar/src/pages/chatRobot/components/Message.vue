<template>
  <XMessagePage
    ref="XMessagePageRef"
    :items="chatRobotStore.getActiveMssage"
    :contextMenu="contextMenu"
    :tools="tools as XMessagePageProps['tools']"
    :splitter="chatRobotStore.xSplitter"
    @send="send"
    @update-splitter="chatRobotStore.setXSplitter"
  >
    <template #loading>
      <q-chip
        v-show="loading"
        clickable
        transition-show="scale"
        transition-hide="slide-down"
        color="primary"
        text-color="white"
        icon="fa-regular fa-circle-stop"
        class="stop-respond q-my-lg"
        @click="handleStop"
      >
        Stop Responding
      </q-chip>
    </template>
  </XMessagePage>
</template>
<script setup lang="ts">
import { uid } from 'quasar';
import { ref, computed, nextTick } from 'vue';
import { useChatRobotStore } from '@/stores/chatRobot';
import { useUserStore } from '@/stores/user';
import { useDBStore } from '@/stores/database';
import { fetchChatAPIProcess } from '@/axios';
import { useI18n } from '@/boot/i18n';
import { useCopyCode } from '../hooks';
import { copyText, isNumber, notify } from '@/utils';
import {
  XMessagePage,
  XChatMessageProps,
  XMessagePageProps,
} from '@/components';

useCopyCode();
const { t } = useI18n();
const chatRobotStore = useChatRobotStore();
const userStore = useUserStore();
const dbStore = useDBStore();
const XMessagePageRef = ref();
const loading = ref(false);
const contextMenu = ref<XChatMessageProps['contextMenu']>([
  {
    name: '复制',
    click: (e: XChatMessageProps) => {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(e.text?.toString() ?? '');
      } else {
        copyText({ text: e.text?.toString() ?? '', origin: true });
      }
    },
  },
  {
    name: '删除',
    click: async (e) => {
      // 删除选中消息
      if (e.messageId) {
        const deletedRows = await dbStore.deleteChatRobotHistoryRecords(
          chatRobotStore.getActive?.chatId as string,
          {
            messageId: e.messageId,
          }
        );
        if (isNumber(deletedRows) && deletedRows > 0) {
          const index = chatRobotStore.getActiveMssage.findIndex(
            (item) => item.messageId === e.messageId
          );
          chatRobotStore.getActiveMssage.splice(index, 1);
        }
      }
    },
  },
]);

const tools = ref<XMessagePageProps['tools']>([
  {
    icon: 'fa-solid fa-file-arrow-up',
    style: { fontSize: '12px' },
    padding: '4px',
    color: 'grey-8',
    click: () => {
      // 上传文件
    },
  },
  {
    icon: 'history',
    size: '12px',
    padding: '4px',
    style: { fontSize: '12px' },
    color: chatRobotStore.getActive?.usingContext ? 'grey-8' : 'negative',
    click: (tool) => {
      // 是否携带之前的聊天记录
      if (!chatRobotStore.getActive) return;
      const active = chatRobotStore.getActive;
      const usingContext = !active.usingContext;
      const index = chatRobotStore.getChatList.findIndex(
        (i) => i.chatId === active.chatId
      );
      if (!history) return;

      chatRobotStore.setActive({ ...active, usingContext }, false);
      chatRobotStore.updateChatList(
        {
          chatId: active.chatId,
          usingContext,
        },
        index
      );
      tool.color = usingContext ? 'grey-8' : 'negative';
      usingContext
        ? notify({
            message: t('chat.turnOnContext'),
            type: 'positive',
          })
        : notify({
            message: t('chat.turnOffContext'),
            type: 'warning',
          });
    },
  },
]);
const currentChat = computed(
  () =>
    chatRobotStore.getActiveMssage[chatRobotStore.getActiveMssage.length - 1]
);
const activeMssageList = computed(() =>
  chatRobotStore.getActiveMssage.filter((item) => !item.sent && !item.error)
);

function loadingStop() {
  // set loading to false
  chatRobotStore.setChatActiveMssage(
    {
      loading: false,
    },
    chatRobotStore.getActiveMssage.length - 1
  );
}
let controller: AbortController;
async function send(message: string) {
  if (loading.value || message.trim() === '') return;
  const active = chatRobotStore.getActive;
  controller = new AbortController();
  const messageBody: ChatRobot.ChatRobotHistoryTable = {
    messageId: uid(),
    message: message,
    sent: true,
    timestamp: Date.now(),
    error: false,
    conversationOptions: null,
    requestOptions: null,
  };
  dbStore.addChatRobotHistory(active?.chatId as string, messageBody);
  chatRobotStore.setChatActiveMssage({
    messageId: messageBody.messageId,
    text: [message],
    avatar: userStore.getAvatarUrl,
    sent: true,
    timestamp: Date.now(),
  });
  loading.value = true;
  XMessagePageRef.value.clearMessage();
  nextTick(() => {
    XMessagePageRef.value.setScrollPositionBottom();
  });
  let options: ChatRobot.ConversationRequest = {};
  const lastContext =
    activeMssageList.value[activeMssageList.value.length - 1]
      ?.conversationOptions;
  if (lastContext && active?.usingContext) options = { ...lastContext };
  chatRobotStore.setChatActiveMssage({
    messageId: uid(),
    text: [''],
    avatar: active?.avatar as string,
    sent: false,
    loading: true,
    conversationOptions: null,
    requestOptions: { prompt: message, options: { ...options } },
  });
  nextTick(() => {
    XMessagePageRef.value.setScrollPositionBottom();
  });
  try {
    let lastText = '';
    const fetchChatAPIOnce = async () => {
      await fetchChatAPIProcess<ChatRobot.ConversationResponse>({
        prompt: message,
        options,
        signal: controller.signal,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onDownloadProgress: ({ event }): any => {
          const xhr = event.target;
          const { responseText } = xhr;
          // Always process the final line
          const lastIndex = responseText.lastIndexOf(
            '\n',
            responseText.length - 2
          );
          let chunk = responseText;
          if (lastIndex !== -1) chunk = responseText.substring(lastIndex);
          try {
            const data = JSON.parse(chunk);
            chatRobotStore.setChatActiveMssage(
              {
                timestamp: Date.now(),
                text: [lastText + data.text ?? ''],
                avatar: active?.avatar as string,
                sent: false,
                loading: false,
                textHtml: true,
                conversationOptions: {
                  conversationId: data.conversationId,
                  parentMessageId: data.id,
                },
                requestOptions: {
                  prompt: message,
                  options: { ...options },
                },
              },
              chatRobotStore.getActiveMssage.length - 1
            );

            if (data.detail.choices[0].finish_reason === 'length') {
              options.parentMessageId = data.id;
              lastText = data.text;
              message = '';
              return fetchChatAPIOnce();
            }
            nextTick(() => {
              XMessagePageRef.value.setScrollPositionBottom();
            });
          } catch (error) {
            //throw new Error(`${error}`);
          }
        },
      });
    };
    await fetchChatAPIOnce();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorMessage = error?.message ?? t('common.wrong');
    if (error.message === 'canceled') {
      loadingStop();
      XMessagePageRef.value.setScrollPositionBottom();
      return;
    }

    if (currentChat.value?.text && currentChat.value.text[0] !== '') {
      chatRobotStore.setChatActiveMssage(
        {
          text: [`${currentChat.value.text[0]}\n[${errorMessage}]`],
          error: false,
          loading: false,
        },
        chatRobotStore.getActiveMssage.length - 1
      );
      return;
    }
    chatRobotStore.setChatActiveMssage(
      {
        timestamp: Date.now(),
        text: errorMessage,
        sent: false,
        error: true,
        loading: false,
        conversationOptions: null,
        requestOptions: { prompt: message, options: { ...options } },
      },
      chatRobotStore.getActiveMssage.length - 1
    );
    XMessagePageRef.value.setScrollPositionBottom();
  } finally {
    loading.value = false;
    loadingStop();
    // 添加回答数据到数据库
    dbStore.addChatRobotHistory(active?.chatId as string, {
      messageId: currentChat.value.messageId,
      message: currentChat.value.text[0],
      sent: currentChat.value.sent,
      conversationOptions: JSON.stringify(
        currentChat.value.conversationOptions
      ),
      requestOptions: JSON.stringify(currentChat.value.requestOptions),
      timestamp: currentChat.value.timestamp,
      error: currentChat.value.error as boolean,
    });
  }
}
function handleStop() {
  controller.abort();
  loadingStop();
}
</script>
<style lang="scss" scoped>
.stop-respond {
  left: 50%;
  transform: translateX(-50%);
  :deep(.q-icon) {
    font-size: 18px;
  }
}
</style>
