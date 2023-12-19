<template>
  <q-chat-message
    class="x-chat-message"
    :bg-color="attrsComputed.sent ? 'green-3' : 'grey-4'"
    v-bind="attrsComputed"
  >
    <q-spinner-dots v-if="attrsComputed.loading" color="primary" size="2em" />
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
          <q-item clickable v-close-popup @click="menuClick('copyText')">
            <q-item-section>复制</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="menuClick('delete')">
            <q-item-section>删除</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
      <div
        v-if="textComputed.textHtml && !attrsComputed.sent"
        class="markdown-body"
        v-html="textComputed.text"
      />
      <div v-else class="whitespace-pre-wrap" v-text="textComputed.text" />
    </div>
  </q-chat-message>
</template>

<script lang="ts" setup>
import { useAttrs, computed } from 'vue';
import { XChatMessageProps } from './index';
import MarkdownIt from 'markdown-it';
import mdKatex from '@traptitech/markdown-it-katex';
import mila from 'markdown-it-link-attributes';
import hljs from 'highlight.js';
import { useQuasar } from 'quasar';
import { useI18n } from '@/boot/i18n';
import { copyText } from '@/utils';

defineOptions({
  name: 'XChatMessage',
});

const { t } = useI18n();
const $q = useQuasar();
const attrs: XChatMessageProps = useAttrs();

const attrsComputed = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { text, textHtml, ...attr } = attrs;
  return {
    ...attr,
  };
});
const textComputed = computed(() => {
  const { text, textHtml, sent } = attrs;
  return {
    text: textHtml && !sent ? mdi.render(text?.toString()) : text?.toString(),
    textHtml,
  };
});
const wrapClass = computed(() => {
  return [
    $q.platform.is.mobile ? 'q-pa-2' : 'q-px-3 q-py-2',
    { 'text-red-5': attrs.error },
  ];
});

const mdi = new MarkdownIt({
  linkify: true,
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
function menuClick(key: string) {
  switch (key) {
    case 'copyText':
      copyText({ text: attrs.text?.toString() || '' });
      return;
  }
}
function highlightBlock(str: string, lang?: string) {
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

.markdown-body {
  background-color: transparent !important;

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
    width: 32px;
    height: 32px;
    min-width: 32px;
    .q-message-avatar--sent {
      margin-right: 4px;
    }
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
    margin-left: 1rem;
    &:last-child:before {
      border-width: 5px 0 5px 5px;
      border-color: transparent transparent transparent #a5d6a7;
    }
  }
  .q-message-text--received {
    margin-right: 1rem;
    &:last-child:before {
      border-width: 5px 5px 5px 0;
      border-color: transparent #e0e0e0 transparent transparent;
    }
  }
}
</style>
