<template>
  <div>
    <XMessagePage
      ref="XMessagePageRef"
      :items="chatRobotStore.getActiveMssage"
      :contextMenu="contextMenu"
      :editor="editor as XMessagePageProps['editor']"
      :splitter="chatRobotStore.xSplitter"
      @send="send"
      @update-splitter="chatRobotStore.setXSplitter"
      :message-max-width="chatRobotStore.maxWidth"
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
    <XDialog
      persistent
      v-model="dialogConfig.visible"
      v-bind="dialogConfig"
      @hide="dialogHide"
    >
      <div class="q-ma-md">
        <template v-if="editType === EditType.image">
          <XInput
            dense
            outlined
            bottom-slots
            debounce="500"
            v-model="imageUrl"
            hint="粘贴图片链接"
            :loading="imageLoading"
            clearable
          />
          <q-uploader
            field-name="images"
            auto-upload
            hide-upload-btn
            class="full-width q-mt-xs"
            :url="`${VITE_GLOB_API_URL}${url.uploadImage}`"
            label="上传图片"
            color="primary"
            square
            flat
            bordered
            :headers="[
              { name: 'Token', value: userStore.getToken },
              { name: 'Username', value: encrypt(userStore.getUserName) },
            ]"
            max-files="1"
            accept="image/*"
            @uploaded="imageUploaded"
          />
        </template>
        <template v-if="editType === EditType.file">
          <q-uploader
            field-name="file"
            auto-upload
            hide-upload-btn
            class="full-width q-mt-xs"
            :url="`${VITE_GLOB_API_URL}${url.uploadFile}`"
            label="上传文件"
            color="primary"
            square
            flat
            bordered
            :headers="[
              { name: 'Token', value: userStore.getToken },
              { name: 'Username', value: encrypt(userStore.getUserName) },
            ]"
            max-files="1"
            accept=".c,.cpp,.csv,.docx,.html,.java,.json,.md,.pdf,.php,.pptx,.py,.rb,.tex,.txt,.css,.jpeg,.jpg,.js,.gif,.png,.tar,.ts,.xlsx,.xml,.zip"
            @uploaded="fileUploaded"
          />
        </template>
      </div>
    </XDialog>
  </div>
</template>
<script setup lang="ts">
import { uid, QUploader } from 'quasar';
import { ref, computed, nextTick, watch, reactive } from 'vue';
import { useChatRobotStore } from '@/stores/chatRobot';
import { useUserStore } from '@/stores/user';
import { useDBStore } from '@/stores/database';
import { fetchChatAPIProcess, Response } from '@/axios';
import { useI18n } from '@/boot/i18n';
import { copyText, isNumber, notify, encrypt } from '@/utils';
import url from '@/axios/url';
import {
  XMessagePage,
  XChatMessageProps,
  XMessagePageProps,
  XDialog,
  XInput,
  SendData,
} from '@/components';

enum EditType {
  image = 'image',
  file = 'file',
}

const { VITE_GLOB_API_URL } = import.meta.env;
const { t } = useI18n();
const chatRobotStore = useChatRobotStore();
const userStore = useUserStore();
const dbStore = useDBStore();
const loading = ref(false);
const dialogConfig = reactive({
  visible: false,
  title: '',
});
const imageUrl = ref('');
const imageLoading = ref(false);
const XMessagePageRef = ref<typeof XMessagePage>();
const editType = ref<EditType>(EditType.image);
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
const editor = computed(() => {
  const toolbar = [['history']];
  if (chatRobotStore.getActive?.model === 'gpt-4') {
    toolbar[0].push('file');
  }
  if (
    chatRobotStore.getActive?.model === 'dall-e-3' ||
    chatRobotStore.getActive?.model === 'gpt-4-vision-preview'
  ) {
    toolbar[0].push('image');
  }
  const tool: XMessagePageProps['editor'] = {
    definitions: {
      file: {
        tip: '上传文件',
        icon: 'fa-solid fa-file-arrow-up',
        handler: () => {
          editType.value = EditType.file;
          dialogConfig.visible = true;
          dialogConfig.title = '上传文件';
        },
      },
      history: {
        tip: '是否联系上下文',
        icon: 'history',
        handler: () => {
          // 是否携带之前的聊天记录
          if (!chatRobotStore.getActive) return;
          const active = chatRobotStore.getActive;
          const usingContext = !active.usingContext;
          const index = chatRobotStore.getChatList.findIndex(
            (i) => i.chatId === active.chatId
          );
          if (!active) return;
          chatRobotStore.setActive({ ...active, usingContext }, false);
          chatRobotStore.updateChatList(
            {
              chatId: active.chatId,
              usingContext,
            },
            index
          );
          // tool.color = usingContext ? 'grey-8' : 'negative';
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
      image: {
        tip: '上传图片',
        icon: 'fa-solid fa-image',
        handler: () => {
          editType.value = EditType.image;
          dialogConfig.title = '输入图片';
          dialogConfig.visible = true;
        },
      },
    },
    toolbar,
    toolbarColor: 'grey-8',
  };
  return tool;
});

const currentChat = computed(
  () =>
    chatRobotStore.getActiveMssage[chatRobotStore.getActiveMssage.length - 1]
);
const activeMssageList = computed(() =>
  chatRobotStore.getActiveMssage.filter((item) => !item.sent && !item.error)
);

watch(
  () => imageUrl.value,
  (value) => {
    imageLoading.value = true;
    const regexUrl =
      /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
    const regexImg =
      /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i;

    const regex =
      /^(http|https):\/\/((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|([a-zA-Z0-9\-]+\.[a-zA-Z]{2,}))(:\d+)?(\/\S*)?/i;

    if (regexUrl.test(value) || regexImg.test(value) || regex.test(value)) {
      imageLoading.value = false;

      XMessagePageRef.value?.addImage(value);
      dialogConfig.visible = false;
    }
    if (!value) {
      imageUrl.value = '';
      imageLoading.value = false;
      return;
    }
  }
);
function setOpenaiMessageConent({ text, html, urls, files }: SendData): {
  prompt: string;
  type: ChatRobot.Type;
} {
  // 提示词和输入类型;
  const isImage = !!urls?.length; // 是否有图片
  const isFile = !!files?.length; // 是否有文件
  if (isImage) {
    const images: ChatRobot.ChatCompletionContentPart[] = [
      {
        type: 'text',
        text,
      },
    ];
    for (let ul of urls) {
      images.push({
        type: 'image_url',
        image_url: {
          url: ul,
          detail: 'auto',
        },
      });
    }
    return {
      prompt: JSON.stringify(images),
      type: 'image',
    };
  }
  if (isFile) {
    return {
      prompt: text,
      type: 'text',
    };
  }
  return {
    prompt: html,
    type: 'text',
  };
}

function fileUploaded({ xhr }: { xhr: XMLHttpRequest }) {
  const { data, status, message } = JSON.parse(
    xhr.response
  ) as Response<ChatRobot.FileObject>;
  if (status === '0') {
    XMessagePageRef.value?.addFile(data);
    dialogConfig.visible = false;
    return;
  }
  notify({
    message: message ?? '上传失败',
    type: 'negative',
  });
}
function imageUploaded({ xhr }: { xhr: XMLHttpRequest }) {
  const { data, status, message } = JSON.parse(xhr.response) as Response<{
    url: string;
  }>;
  if (status === '0') {
    imageUrl.value = data.url;
    return;
  }
  notify({
    message: message ?? '上传失败',
    type: 'negative',
  });
}

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
async function send({ text, html, urls, files }: SendData) {
  if (loading.value) return;
  const active = chatRobotStore.getActive;
  if (!active) return;
  controller = new AbortController();
  // 提示词和输入类型;
  const { prompt, type } = setOpenaiMessageConent({ text, html, urls, files });
  const messageBody: ChatRobot.ChatRobotHistoryTable = {
    messageId: uid(),
    message: html,
    sent: true,
    timestamp: Date.now(),
    error: false,
    conversationOptions: null,
    requestOptions: null,
  };
  dbStore.addChatRobotHistory(active?.chatId as string, messageBody);
  chatRobotStore.setChatActiveMssage({
    messageId: messageBody.messageId,
    text: [html],
    avatar: userStore.getAvatarUrl,
    sent: true,
    timestamp: Date.now(),
    textHtml: true,
  });
  loading.value = true;
  XMessagePageRef.value?.setMessage('');
  nextTick(() => {
    XMessagePageRef.value?.setScrollPositionBottom();
  });
  const fileIds = files?.map((file) => file.id);
  let options: ChatRobot.ConversationRequest = {};
  if (fileIds?.length) options.fileIds = fileIds;
  const lastContext =
    activeMssageList.value[activeMssageList.value.length - 1]
      ?.conversationOptions;
  if (lastContext && active?.usingContext)
    options = { ...lastContext, ...options };
  chatRobotStore.setChatActiveMssage({
    messageId: uid(),
    text: [''],
    avatar: active?.avatar as string,
    sent: false,
    loading: true,
    conversationOptions: null,
    requestOptions: { prompt: prompt, options: { ...options } },
  });
  nextTick(() => {
    XMessagePageRef.value?.setScrollPositionBottom();
  });
  try {
    let lastText = '';
    const fetchChatAPIOnce = async () => {
      await fetchChatAPIProcess<ChatRobot.ConversationResponse>({
        prompt: prompt,
        options,
        model: active.model,
        signal: controller.signal,
        type: type,
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
            console.log(data);
            // 展示图片
            const imageHtml = data?.url
              ? `[![alt text](${data?.url})](${data?.url})`
              : '';
            if (!data) throw new Error('error');
            chatRobotStore.setChatActiveMssage(
              {
                timestamp: Date.now(),
                text: [lastText + data.text + imageHtml ?? ''],
                avatar: active?.avatar as string,
                sent: false,
                loading: false,
                textHtml: true,
                isMarkdown: true,
                conversationOptions: {
                  conversationId: data.conversationId,
                  parentMessageId: data.id,
                  threadId: '',
                },
                requestOptions: {
                  prompt: prompt,
                  options: { ...options },
                },
              },
              chatRobotStore.getActiveMssage.length - 1
            );
            if (data?.detail?.choices[0].finish_reason === 'length') {
              options.parentMessageId = data.id;
              lastText = text;
              text = '';
              return fetchChatAPIOnce();
            }
          } catch (error) {
            console.log(error);
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
      XMessagePageRef.value?.setScrollPositionBottom();
      return;
    }
    console.log(error);
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
        requestOptions: { prompt: prompt, options: { ...options } },
      },
      chatRobotStore.getActiveMssage.length - 1
    );
  } finally {
    loading.value = false;
    loadingStop();
    if (!currentChat.value.text[0]) return;
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
function dialogHide() {
  imageUrl.value = '';
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
