<template>
  <div class="q-pa-sm">
    <q-card-actions class="q-pa-md">
      <div class="q-mr-lg text-subtitle2">聊天记录</div>
      <q-btn color="primary" icon="file_download" flat>导出</q-btn>
      <q-btn color="primary" icon="file_upload" flat>导入</q-btn>
    </q-card-actions>
    <q-card-actions class="q-pa-md">
      <div class="q-mr-lg text-subtitle2">角色设定</div>
      <div class="q-ml-sm">
        <XInput
          style="width: 300px"
          outlined
          rows="3"
          type="textarea"
          filled
          v-model="chatRobotStore.role"
        />
        <q-btn
          color="primary"
          class="q-mt-md"
          flat
          @click="chatRobotStore.setRole(chatRobotStore.role)"
        >
          保存</q-btn
        >
      </div>
    </q-card-actions>
  </div>
</template>
<script lang="ts" setup>
//import { ref } from 'vue';
import { XInput } from '@/components';
import { useChatRobotStore } from '@/stores/chatRobot';

const chatRobotStore = useChatRobotStore();
</script>
