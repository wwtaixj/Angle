<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onHide" style="-webkit-app-region: none">
    <slot v-if="type === DialogTypeEnum.NATIVE" />
    <q-card
      class="bg-grey-2"
      v-bind="attrsComputed"
      v-if="type === DialogTypeEnum.CARD"
    >
      <q-card-section class="items-center row q-pb-none">
        <div class="text-h6">{{ attrsComputed.title }}</div>
        <q-space />
        <q-btn
          v-show="isShowClose"
          icon="cancel"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>
      <slot />
      <!-- 按钮的例子 -->
      <q-card-actions align="right" v-if="propsConfig?.show">
        <q-btn v-bind="propsConfig.ok" @click="onOKClick" />
        <q-btn v-bind="propsConfig.cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { defineEmits, PropType, useAttrs, ref, computed } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { DialogTypeEnum, XDialogProps, XDialogButton } from './index';
import { convertObjectPropertiesToHyphenCase } from '@/utils';

defineOptions({
  name: 'XDialog',
});

const $emits = defineEmits([...useDialogPluginComponent.emits, 'cancel']);
const props = defineProps({
  type: {
    type: String as PropType<XDialogProps['type']>,
    default: () => DialogTypeEnum.CARD,
  },
  button: {
    type: Object as PropType<XDialogProps['button']>,
  },
  isShowClose: {
    type: Boolean as PropType<XDialogProps['isShowClose']>,
    default: true,
  },
});
const attrsComputed = computed(() => {
  const { style, ...attrs }: XDialogProps = useAttrs();
  return {
    ...attrs,
    style: {
      'min-width': '400px',
      'min-height': '100px',
      ...convertObjectPropertiesToHyphenCase(style),
    },
  };
});
const propsConfig = ref<XDialogButton>({
  show: false,
  ok: {
    label: '确定',
  },
  cancel: {
    label: '取消',
  },
});

function initDialog() {
  propsConfig.value = Object.assign(propsConfig, props.button);
}

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

function onOKClick() {
  onDialogOK();
  $emits('ok');
}
function onCancelClick() {
  onDialogCancel();
  $emits('cancel');
}
function onHide() {
  onDialogHide();
  $emits('hide');
}
initDialog();
</script>
