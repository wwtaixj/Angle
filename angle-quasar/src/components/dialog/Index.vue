<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onHide">
    <slot v-if="type === DialogTypeEnum.NATIVE" />
    <q-card v-bind="attrs" v-if="type === DialogTypeEnum.CARD">
      <q-card-section class="items-center row q-pb-none">
        <div class="text-h6">{{ attrs.title }}</div>
        <q-space />
        <q-btn icon="cancel" flat round dense v-close-popup />
      </q-card-section>
      <slot />
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { defineEmits, PropType, useAttrs } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { DialogTypeEnum, XDialogProps } from './index';

const attrs: XDialogProps = useAttrs();

defineOptions({
  name: 'XDialog',
});

defineProps({
  type: {
    type: String as PropType<DialogTypeEnum>,
    default: () => DialogTypeEnum.CARD,
  },
});
const $emits = defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

// function onOKClick() {
//   onDialogOK();
//   $emits('ok');
// }
// function onCancelClick() {
//   onDialogCancel();
// }
function onHide() {
  onDialogHide();
  $emits('hide');
}
</script>
