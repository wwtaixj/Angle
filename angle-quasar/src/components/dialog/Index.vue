<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onHide">
    <slot v-if="type === DialogTypeEnum.NATIVE" />
    <q-card v-bind="options" v-if="type === DialogTypeEnum.CARD" class="">
      <q-card-section class="items-center row q-pb-none">
        <div class="text-h6">{{ options.title }}</div>
        <q-space />
        <q-btn icon="cancel" flat round dense v-close-popup />
      </q-card-section>
      <slot />
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { defineEmits, PropType, CSSProperties } from 'vue';
import { useDialogPluginComponent, QCardProps } from 'quasar';
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
    type: Object as PropType<
      { title?: string; style?: CSSProperties; class?: string } & QCardProps
    >,
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
