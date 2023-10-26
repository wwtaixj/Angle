<!--
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-20 10:51:33
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-25 18:03:38
 * @FilePath: \Angle\angle-quasar\src\components\dialog\Index.vue
-->
<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onHide">
    <slot v-if="type === DialogTypeEnum.NATIVE" />
    <q-card class="q-dialog-plugin" v-if="type === DialogTypeEnum.CARD">
      <q-card-section class="items-center row q-pb-none">
        <div class="text-h6">{{ options.title }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <slot />
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { defineEmits, ref, PropType } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { DialogTypeEnum } from './index';

defineOptions({
  name: 'XDialog',
});

defineProps({
  type: {
    type: String as PropType<DialogTypeEnum>,
    default: () => DialogTypeEnum.CARD,
  },
  options: {
    type: Object as PropType<{ title?: string }>,
    default: () => ({}),
  },
});
const $emits = defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

function onOKClick() {
  onDialogOK();
  $emits('ok');
}
function onCancelClick() {
  onDialogCancel();
}
function onHide() {
  onDialogHide();
  $emits('hide');
}
</script>
