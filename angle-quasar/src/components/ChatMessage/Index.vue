<template>
  <q-chat-message
    class="x-chat-message"
    :bg-color="attrsComputed.sent ? 'green-3' : 'grey-4'"
    v-bind="attrsComputed"
  >
    <template #name>
      <div class="text-caption text-grey-6">
        {{ customComputed.name }}
      </div>
    </template>
    <template v-slot:avatar>
      <XAvatar
        :class="`q-message-avatar ${
          attrsComputed.sent
            ? 'q-message-avatar--sent'
            : 'q-message-avatar--received'
        }`"
        :src="customComputed.avatar"
        :text="avatarText"
      />
    </template>
    <q-spinner-dots v-if="loading" color="primary" size="2em" />
    <div
      v-else
      ref="textRef"
      class="leading-relaxed break-words"
      :class="wrapClass"
    >
      <q-menu
        class="chat-list-menu text-body2"
        transition-show="scale"
        transition-hide="scale"
        touch-position
        context-menu
      >
        <q-list>
          <q-item
            clickable
            v-close-popup
            v-for="(item, index) in contextMenu"
            :key="index"
            @click="item.click(attrs)"
          >
            <q-item-section>{{ item.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
      <div
        v-if="customComputed.textHtml"
        class="markdown-body"
        v-html="customComputed.text"
      />
      <div v-else class="whitespace-pre-wrap" v-text="customComputed.text" />
    </div>
  </q-chat-message>
</template>

<script lang="ts" setup>
import { useAttrs, computed, PropType, nextTick } from 'vue';
import { XChatMessageProps } from './index';
import MarkdownIt from 'markdown-it';
import mdKatex from '@traptitech/markdown-it-katex';
import mila from 'markdown-it-link-attributes';
import hljs from 'highlight.js';
import { useQuasar } from 'quasar';
import { useI18n } from '@/boot/i18n';
import { copyText } from '@/utils';
import { XAvatar } from '@/components';

defineOptions({
  name: 'XChatMessage',
});
const props = defineProps({
  error: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  contextMenu: {
    type: Array as PropType<XChatMessageProps['contextMenu']>,
  },
  isMarkdown: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: String,
    default: '470px',
  },
  avatarText: {
    type: String,
  },
});

const { t } = useI18n();
const $q = useQuasar();
const attrs: XChatMessageProps = useAttrs();

const attrsComputed = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { text, textHtml, name, avatar, ...attr } = attrs;
  return {
    ...attr,
  };
});
const customComputed = computed(() => {
  const { text, textHtml, name, avatar } = attrs;
  return {
    text:
      props.isMarkdown && textHtml
        ? mdi.render(text?.toString() ?? '')
        : text?.toString(),
    textHtml,
    name,
    avatar,
  };
});
const wrapClass = computed(() => {
  return [
    $q.platform.is.mobile ? 'q-pa-2' : 'q-px-3 q-py-2',
    { 'text-red-5': props.error },
  ];
});

const mdi = new MarkdownIt({
  linkify: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  highlight(code: any, language: string) {
    const validLang = !!(language && hljs.getLanguage(language));
    if (validLang) {
      const lang = language ?? '';
      return highlightBlock(
        hljs.highlight(code, { language: lang }).value,
        lang
      );
    }
    return highlightBlock(hljs.highlightAuto(code).value, '');
  },
});

mdi.use(mila, { attrs: { target: '_blank', rel: 'noopener' } });
mdi.use(mdKatex, {
  blockClass: 'katexmath-block',
  errorColor: '#cc0000',
});
function copyCode() {
  nextTick(() => {
    const codeBlockWrapper = document.querySelectorAll('.code-block-wrapper');
    codeBlockWrapper.forEach((wrapper) => {
      const copyBtn = wrapper.querySelector('.code-block-header__copy');
      const codeBlock = wrapper.querySelector('.code-block-body');
      if (copyBtn && codeBlock) {
        copyBtn.addEventListener('click', () => {
          if (navigator.clipboard?.writeText)
            navigator.clipboard.writeText(codeBlock.textContent ?? '');
          else copyText({ text: codeBlock.textContent ?? '', origin: true });
        });
      }
    });
  });
}
function highlightBlock(str: string, lang?: string) {
  copyCode();
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">${t(
    'chat.copyCode'
  )}</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`;
}
</script>
<style lang="scss">
.leading-relaxed {
  line-height: 1.625;
}
.break-words {
  overflow-wrap: break-word;
}
.whitespace-pre-wrap {
  white-space: pre-wrap !important;
}
.markdown-body {
  background-color: transparent !important;
  .editor_image {
    .q-icon {
      display: none;
    }
  }
  .editor_file {
    .q-icon {
      display: none;
    }
  }
  p {
    white-space: pre-wrap;
  }

  ol {
    list-style-type: decimal;
  }

  ul {
    list-style-type: disc;
  }

  pre code,
  pre tt {
    line-height: 1.65;
  }
  .highlight pre,
  pre {
    background-color: #fff;
  }
  code.hljs {
    padding: 0;
  }

  .code-block {
    &-wrapper {
      position: relative;
      padding-top: 24px;
    }

    &-header {
      position: absolute;
      top: 5px;
      right: 0;
      width: 100%;
      padding: 0 1rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #b3b3b3;

      &__copy {
        cursor: pointer;
        margin-left: 0.5rem;
        user-select: none;

        &:hover {
          color: $primary;
        }
      }
    }
  }
}
.x-chat-message {
  &:first-child {
    margin-top: 8px;
  }
  .q-message-container {
    align-items: center;
  }
  .q-message-avatar {
    margin-top: 20px;
    width: 32px;
    height: 32px;
    min-width: 32px;
    .q-message-avatar--sent {
      margin-right: 4px;
    }
  }
  .q-message-text {
    max-width: v-bind('props.maxWidth');
  }
  .q-message-text:last-child {
    border-radius: 6px;
    min-height: 0;
    &::before {
      top: 50%;
      transform: translateY(-50%);
      border-style: solid;
    }
  }

  .q-message-text--sent {
    &:last-child:before {
      border-width: 5px 0 5px 5px;
      border-color: transparent transparent transparent #a5d6a7;
    }
  }
  .q-message-text--received {
    &:last-child:before {
      border-width: 5px 5px 5px 0;
      border-color: transparent #e0e0e0 transparent transparent;
    }
  }
}
</style>
