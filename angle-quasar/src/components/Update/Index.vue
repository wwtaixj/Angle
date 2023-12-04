<template>
  <XDialog v-bind="config">
    <div style="margin: 10px; border-radius: 6px">
      <QLinearProgress stripe rounded size="20px" :value="progress">
        <div class="absolute-full flex flex-center">
          <QBadge color="white" text-color="accent" :label="progressLabel" />
        </div>
      </QLinearProgress>
    </div>
  </XDialog>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { XDialog, XDialogProps } from '../Dialog';
import { QLinearProgress, QBadge } from 'quasar';

defineOptions({
  name: 'XUpdate',
});
const props = defineProps({
  progress: {
    type: Number,
    default: 0,
  },
});

const progressLabel = computed(() => (props.progress * 100).toFixed(0) + '%');
const config = reactive<XDialogProps>({
  isShowClose: false,
  style: {
    width: '50%',
  },
  title: '下载中...',
  persistent: true,
});
</script>
