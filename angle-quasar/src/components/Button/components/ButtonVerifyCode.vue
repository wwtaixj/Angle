<template>
  <XButton round dense flat @click="updateModelValue" v-bind="useAttrs()">
    <q-icon left name="send" v-if="!modelValue" />
    <span class="text-subtitle1" v-else> {{ modelValue || '' }}</span>
  </XButton>
</template>
<script lang="ts" setup>
import { PropType, defineEmits, useAttrs } from 'vue';
import { XButton, XButtonVerifyCodeProps } from '../index';
import { CountdownTimer } from '@/utils';

const $emits = defineEmits(['update:modelValue']);

defineOptions({
  name: 'XButtonVerifyCode',
});
const props = defineProps({
  modelValue: {
    type: Number as PropType<XButtonVerifyCodeProps['modelValue']>,
  },
  beforeClick: {
    type: Function as PropType<XButtonVerifyCodeProps['beforeClick']>,
  },
  time: {
    type: Number as PropType<XButtonVerifyCodeProps['time']>,
    default: 60,
  },
});

async function updateModelValue() {
  if (props.modelValue) return;
  const countdown = new CountdownTimer(props.time);
  countdown.remaining = (time) => {
    $emits('update:modelValue', time);
  };

  if (props.beforeClick) {
    const isUpdate = await props.beforeClick();
    if (isUpdate) {
      countdown.start();
    }
  } else {
    countdown.start();
  }
}
</script>
