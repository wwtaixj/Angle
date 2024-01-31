<template>
  <q-page ref="messagePageRef">
    <q-splitter
      :model-value="splitter"
      :limits="[60, 80]"
      horizontal
      style="height: calc(100vh - 69px)"
      @update:model-value="setScrollAreaHeight"
      before-class="overflow-hidden"
      after-class="overflow-hidden"
    >
      <template v-slot:before>
        <q-scroll-area
          :delay="1200"
          id="chat-message-scroll-id"
          ref="scrollAreaRef"
          :style="{ height: scrollAreaHeight }"
        >
          <q-virtual-scroll
            class="q-px-lg"
            scroll-target="#chat-message-scroll-id > .scroll"
            :items="items"
            ref="virtualScrollRef"
            v-slot="{ item, index }"
          >
            <XChatMessage
              :sent="item.sent"
              :avatar="item.avatar"
              :text="item.text"
              :key="index"
              :textHtml="item.textHtml"
              :isMarkdown="item.isMarkdown"
              :loading="item.loading"
              :name="formatTimestamp(item.timestamp)"
              :contextMenu="contextMenu"
              :messageId="item.messageId"
              :max-width="messageMaxWidth"
              :avatarText="item.avatarText"
            />
          </q-virtual-scroll>
          <slot name="loading" />
        </q-scroll-area>
      </template>
      <template v-slot:after>
        <form
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
        >
          <q-editor
            ref="editorRef"
            min-height="3rem"
            :max-height="messageHeight"
            @paste="onPaste"
            class="send-message-field"
            v-model="sendMessage"
            v-bind="editor"
            @keyup.ctrl.enter="send"
          >
            <template v-for="key in editorSlots" v-slot:[key]>
              <slot :name="key" />
            </template>
          </q-editor>
        </form>

        <XButton
          class="send-button"
          unelevated
          padding="xs lg"
          color="grey-3"
          text-color="primary"
          label="发送"
          @click="send"
        />
      </template>
    </q-splitter>
  </q-page>
</template>
<script lang="ts" setup>
import {
  ref,
  defineExpose,
  onMounted,
  nextTick,
  PropType,
  computed,
  useSlots,
} from 'vue';
import { QVirtualScroll, QPage, QScrollArea, debounce, QEditor } from 'quasar';
import {
  XChatMessage,
  XButton,
  XMessagePageProps,
  SendData,
} from '@/components';
import { formatTimestamp } from '@/utils';
import { getImageHtml } from '@/assets/constant';

interface ClipboardData {
  getData?: (arg0: string) => string;
}

const $emits = defineEmits(['send', 'update-splitter', 'update:model-value']);
const props = defineProps({
  items: {
    type: Array as PropType<XMessagePageProps['items']>,
    required: true,
  },
  editor: {
    type: Object as PropType<XMessagePageProps['editor']>,
  },
  contextMenu: {
    type: Array as PropType<XMessagePageProps['contextMenu']>,
  },
  splitter: {
    type: Number,
    default: 80,
  },
  messageMaxWidth: {
    type: String,
  },
});

const editorSlots = computed(() => {
  const slots = Object.keys(useSlots());
  if (!Array.isArray(props.editor?.toolbar)) return [];
  const toolbar = props.editor?.toolbar;
  return slots.filter((i: string) => toolbar?.includes(i));
});
const virtualScrollRef = ref<QVirtualScroll>();
const messagePageRef = ref<QPage>();
const scrollAreaRef = ref<QScrollArea>();
const editorRef = ref<QEditor>();
const scrollAreaHeight = ref('0px');
const messageHeight = ref('0px');
const sendMessage = ref('');

function setScrollAreaHeight(value?: number) {
  if (value) $emits('update-splitter', value);
  const splitter = value || props.splitter;
  const pageContainer = messagePageRef.value?.$el;
  if (pageContainer) {
    const minHeightPx = pageContainer.style.minHeight as string;
    const minHeight = minHeightPx.substring(0, minHeightPx.length - 2);
    scrollAreaHeight.value = `${(Number(minHeight) * splitter) / 100}px`;
    messageHeight.value = `${
      (Number(minHeight) * (100 - splitter)) / 100 - 34 - 53
    }px`;
  }
}
function setScrollPositionBottom() {
  const scroll = scrollAreaRef.value?.getScroll();
  if (!scroll) return;
  scrollAreaRef.value?.setScrollPosition('vertical', scroll.verticalSize);
}
function send() {
  const data: SendData = {
    urls: [],
    files: [],
    text: '',
    html: sendMessage.value,
  };
  // 使用DOMParser解析HTML字符串
  const parser = new DOMParser();
  const doc = parser.parseFromString(sendMessage.value, 'text/html');
  const imageElements =
    doc.querySelectorAll<HTMLImageElement>('.editor_image img');
  const fileElements = doc.querySelectorAll<HTMLDivElement>('.editor_file');
  // 提取属性
  imageElements.forEach((el) => {
    data.urls?.push(el.src);
  });
  fileElements.forEach((el) => {
    data.files?.push(JSON.parse(el.getAttribute('data-file') ?? ''));
  });
  // 删除所有的元素
  doc.querySelectorAll('.editor_image').forEach((el) => el.remove());
  fileElements.forEach((el) => el.remove());
  data.text = doc.body.innerText.trim();
  if (!data.text && !data.urls?.length && !data.files?.length) {
    return;
  }
  $emits('send', data);
}

function setMessage(value: string) {
  sendMessage.value = value;
}
/**
 * 添加图片到editr
 * @param url 图片链接
 */
function addImage(url: string) {
  const edit = editorRef.value;
  edit?.caret.restore();
  edit?.runCmd('insertHTML', getImageHtml(url));
  edit?.focus();
}
/**
 * 添加文件到editr
 * @param name 文件名称
 */
function addFile(file: ChatRobot.FileObject) {
  const edit = editorRef.value;
  edit?.caret.restore();
  edit?.runCmd(
    'insertHTML',
    `&nbsp;<div data-file=${JSON.stringify(
      file
    )} class="editor_file text-white row inline items-center" contenteditable="false">
      <div class="q-badge flex inline items-center no-wrap q-badge--single-line q-badge--outline text-primary" role="status" aria-label="Outline">${
        file.filename
      }</div>
      <i class="q-icon material-icons cursor-pointer" onclick="this.parentNode.parentNode.removeChild(this.parentNode)">
        close
      </i>
      </img>
    </div>&nbsp;`
  );
  edit?.focus();
}
/**
 * 粘贴事件
 * @param evt
 */
function onPaste(evt: {
  target: { nodeName: string };
  preventDefault: () => void;
  stopPropagation: () => void;
  originalEvent: { clipboardData: ClipboardData };
  clipboardData: ClipboardData;
}) {
  // Let inputs do their thing, so we don't break pasting of links.
  if (evt.target.nodeName === 'INPUT') return;
  let text, onPasteStripFormattingIEPaste;
  evt.preventDefault();
  evt.stopPropagation();

  if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
    text = evt.originalEvent.clipboardData.getData('text/plain');
    editorRef.value?.runCmd('insertText', text);
  } else if (evt.clipboardData && evt.clipboardData.getData) {
    text = evt.clipboardData.getData('text/plain');
    editorRef.value?.runCmd('insertText', text);
  } else if (
    (
      window as unknown as {
        clipboardData: ClipboardData;
      }
    ).clipboardData &&
    (window as unknown as { clipboardData: ClipboardData }).clipboardData
      .getData
  ) {
    if (!onPasteStripFormattingIEPaste) {
      onPasteStripFormattingIEPaste = true;
      editorRef.value?.runCmd('ms-pasteTextOnly', text);
    }
    onPasteStripFormattingIEPaste = false;
  }
}
// 暴露给父组件的数据和方法
defineExpose({
  setMessage,
  setScrollPositionBottom,
  addImage,
  addFile,
});

// 监听窗口变化时重新计算高度
window.addEventListener(
  'resize',
  debounce(() => {
    setScrollAreaHeight();
  })
);

onMounted(() => {
  nextTick(() => {
    setScrollAreaHeight();
    setTimeout(() => {
      setScrollPositionBottom();
    }, 100);
  });
});
</script>
<style lang="scss" scoped>
:deep(.editor_image) {
  img {
    width: 35px;
    height: 35px;
    border-radius: 5px;
  }
}

:deep(.q-editor__content) {
  .editor_image {
    .q-icon {
      border-radius: 3px;
      left: -14px;
      top: -10px;
      background: rgba(0, 0, 0, 0.2);
    }
  }
  .editor_file {
    .q-icon {
      border-radius: 3px;
      left: -16px;
      background: rgba(0, 0, 0, 0.2);
    }
    .q-badge {
      padding: 2px 20px 2px 8px;
    }
  }
}

.send-message-field {
  border: none;
  background-color: transparent;
  resize: none;
  :deep(.q-editor__toolbar) {
    border-bottom: none;
  }
}
.send-button {
  position: absolute;
  bottom: 8px;
  right: 16px;
}
</style>
