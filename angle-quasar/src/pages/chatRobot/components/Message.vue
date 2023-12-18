<template>
  <XMessagePage
    ref="XMessagePageRef"
    :items="chatRobotStore.getActiveMssage"
    @send="send"
  >
    <template #messageLoading="{ item }">
      <q-chip
        v-show="item.loading"
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
import { ref, computed, nextTick } from 'vue';
import { useChatRobotStore } from '@/stores/chatRobot';
import { useUserStore } from '@/stores/user';
import { useDBStore } from '@/stores/database';
import { XMessagePage } from '@/components';
import { fetchChatAPIProcess } from '@/axios';
import { useI18n } from '@/boot/i18n';

const { t } = useI18n();
const chatRobotStore = useChatRobotStore();
const userStore = useUserStore();
const dbStore = useDBStore();
const XMessagePageRef = ref();
const currentChat = computed(
  () =>
    chatRobotStore.getActiveMssage[chatRobotStore.getActiveMssage.length - 1]
);
const activeMssageList = computed(() =>
  chatRobotStore.getActiveMssage.filter((item) => !item.sent && !item.error)
);
const usingContext = computed(() => chatRobotStore.usingContext);

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
  if (currentChat.value.loading) return;
  const active = chatRobotStore.getActive;
  controller = new AbortController();
  const messageBody: ChatRobot.ChatRobotHistoryTable = {
    message: message,
    sent: true,
    timestamp: Date.now(),
    error: false,
    conversationOptions: null,
    requestOptions: null,
  };
  XMessagePageRef.value.clearMessage();
  dbStore.addChatRobotHistory(active?.id as string, messageBody);
  chatRobotStore.setChatActiveMssage({
    text: [message],
    avatar: userStore.getAvatarUrl,
    sent: true,
  });
  let options: ChatRobot.ConversationRequest = {};
  const lastContext =
    activeMssageList.value[activeMssageList.value.length - 1]
      ?.conversationOptions;

  if (lastContext && usingContext.value) options = { ...lastContext };
  chatRobotStore.setChatActiveMssage({
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
                loading: true,
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
            throw new Error(`${error}`);
          }
        },
      });
    };
    await fetchChatAPIOnce();
    loadingStop();
    // 添加回答数据到数据库
    dbStore.addChatRobotHistory(active?.id as string, {
      message: currentChat.value.text[0],
      sent: currentChat.value.sent,
      conversationOptions: JSON.stringify(
        currentChat.value.conversationOptions
      ),
      requestOptions: JSON.stringify(currentChat.value.requestOptions),
      timestamp: currentChat.value.timestamp,
      error: currentChat.value.error as boolean,
    });
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
