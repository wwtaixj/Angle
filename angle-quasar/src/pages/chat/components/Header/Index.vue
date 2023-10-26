<!--
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-16 11:00:25
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-16 18:01:06
 * @FilePath: \angle-quasar\src\pages\chat\components\Header\Index.vue
-->
<template>
  <q-toolbar class="text-black bg-grey-3">
    <q-btn round flat>
      <q-avatar>
        <img :src="currentConversation?.avatar" />
      </q-avatar>
    </q-btn>

    <span class="q-subtitle-1 q-pl-md">
      {{ currentConversation?.name }}
    </span>

    <q-space />

    <q-btn round flat icon="cancel" @click="mainStore.closeDialog" />
  </q-toolbar>
</template>
<script lang="ts" setup>
import { ref, computed, reactive } from 'vue';
import { useMainStore } from '@/stores/mainStore';
import { useChatStore } from '@/stores/chatStore';

const mainStore = useMainStore();
const chatStore = useChatStore();
const currentConversation = computed(() =>
  chatStore.getChatList.find((i) => i.id === chatStore.getChatListSelectedId)
);
</script>
