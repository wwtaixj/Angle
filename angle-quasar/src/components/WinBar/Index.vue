<template>
  <q-bar class="bg-grey-2" style="-webkit-app-region: drag">
    <q-space />
    <q-btn
      style="-webkit-app-region: no-drag"
      dense
      flat
      icon="remove_circle_outline"
      class="q-mr-sm"
      @click="minimize"
    />
    <q-btn
      v-show="isMaximized"
      style="-webkit-app-region: no-drag"
      dense
      flat
      icon="fa-regular fa-clone"
      @click="unmaximize"
      class="q-mr-sm"
    />
    <q-btn
      v-show="!isMaximized"
      style="-webkit-app-region: no-drag"
      dense
      flat
      icon="crop_square"
      @click="maximize"
      class="q-mr-sm"
    />
    <q-btn
      style="-webkit-app-region: no-drag"
      size="sm"
      dense
      flat
      icon="fa-regular fa-circle-xmark"
      @click="close"
    />
  </q-bar>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { $Window } from '@/types/env';

defineOptions({
  name: 'XWinBar',
});

const isMaximized = ref(false);
const { electron } = window as unknown as $Window;

function minimize() {
  electron.ipcRenderer.send('minimize');
}
function maximize() {
  electron.ipcRenderer.send('maximize');
}
function unmaximize() {
  electron.ipcRenderer.send('unmaximize');
}
function close() {
  electron.ipcRenderer.send('close');
}

onMounted(() => {
  electron.ipcRenderer.on('maximized', () => {
    isMaximized.value = true;
  });
  electron.ipcRenderer.on('unmaximized', () => {
    isMaximized.value = false;
  });
});
</script>
