<template>
  <q-chat-message class="x-chat-message" v-bind="attrsComputed">
    <template v-for="key in slots" v-slot:[key]>
      <slot :name="key" />
    </template>
  </q-chat-message>
</template>

<script lang="ts" setup>
import { useAttrs, useSlots, computed } from 'vue';
import { XChatMessageProps } from './index';
import MarkdownIt from 'markdown-it';
import mdKatex from '@traptitech/markdown-it-katex';
import mila from 'markdown-it-link-attributes';
import hljs from 'highlight.js';
import { useQuasar } from 'quasar';
import { useI18n } from '@/boot/i18n';

defineOptions({
  name: 'XChatMessage',
});
const { t } = useI18n();
const slots = Object.keys(useSlots()) as unknown;

const attrsComputed = computed(() => {
  const attrs: XChatMessageProps = useAttrs();

  return {
    ...attrs,
    text: [mdi.render(attrs?.text[0])],
  };
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
  blockClass: 'katexmath-block rounded-md p-[10px]',
  errorColor: ' #cc0000',
});

function highlightBlock(str: string, lang?: string) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">${t(
    'chat.copyCode'
  )}</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`;
}
</script>
<style lang="scss">
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
    border-radius: 4px;
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
      border-color: transparent transparent transparent #e0e0e0;
    }
  }
  .q-message-text--received {
    &:last-child:before {
      border-width: 5px 5px 5px 0;
      border-color: transparent #81c784 transparent transparent;
    }
  }
}
</style>
