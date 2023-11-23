<template>
  <div class="app-container">
    <XDialog
      :title="title"
      v-model="visible"
      :button="{
        show: true,
        ok: {
          label: '立即升级',
          type: 'primary',
          loading: false,
        },
        cancel: {
          label: '取消',
          type: 'default',
          loading: false,
        },
      }"
      @ok="downloadUpdate"
      @cancel="visible = false"
      width="400px"
    >
      <div>{{ remark }}</div>
    </XDialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue';
import { XDialog } from '@/components';
import { ipcRenderer } from 'electron';

const title = ref('软件更新');
const remark = ref('发现新版本, 确定升级吗?');
const visible = ref(false);
const downloadPercent = ref(0);

onMounted(() => {
  // 给主进程发送事件
  ipcRenderer.send('web-created');
  // 检查更新
  ipcRenderer.send('checkForUpdate');
  // 监听自动更新事件
  ipcRenderer.on('message', (event, text) => {
    if (text === '检测到新版本，正在下载……') {
      nextTick(() => {
        visible.value = true;
      });
    }
  });
});
function downloadUpdate() {
  downloadPercent.value = 0;
  ipcRenderer.send('downloadUpdate');
  // //注意：“downloadProgress”事件可能存在无法触发的问题，只需要限制一下下载网速就好了
  ipcRenderer.on('downloadProgress', (event, progressObj) => {
    downloadPercent.value = parseInt(progressObj.percent || 0);
  });
  ipcRenderer.on('isUpdateNow', () => {
    ipcRenderer.send('isUpdateNow');
  });
}
</script>
