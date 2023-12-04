<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onHide">
    <slot v-if="type === DialogTypeEnum.NATIVE" />
    <q-card v-bind="attrs" v-if="type === DialogTypeEnum.CARD">
      <q-card-section class="items-center row q-pb-none">
        <div class="text-h6">{{ attrs.title }}</div>
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
import { defineEmits, PropType, useAttrs, ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { DialogTypeEnum, XDialogProps, XDialogButton } from './index';

const attrs: XDialogProps = useAttrs();

defineOptions({
  name: 'XDialog',
});

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

const $emits = defineEmits([...useDialogPluginComponent.emits, 'cancel']);
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
