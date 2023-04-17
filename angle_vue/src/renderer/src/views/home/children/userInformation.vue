<template>
  <a-typography-text>{{ t('login.Username') }}:&nbsp;&nbsp;</a-typography-text>
  <a-typography-paragraph v-model:content="user.userName" class="inline-block" editable>
    <template #editableTooltip>{{ t('Click to edit text') }}</template>
  </a-typography-paragraph>

  <a-typography-paragraph>
    {{ t('Gender') }}:&nbsp;&nbsp;
    <a-radio-group v-model:value="user.gender">
      <a-radio value="0">{{ t('Woman') }}</a-radio>
      <a-radio value="1">{{ t('Man') }}</a-radio>
    </a-radio-group>
  </a-typography-paragraph>

  <a-typography-text>{{ t('Age') }}:&nbsp;&nbsp;</a-typography-text>
  <a-typography-paragraph v-model:content="user.age" class="inline-block" editable>
    <template #editableTooltip>{{ t('Click to edit text') }}</template>
    <template #editableEnterIcon="{ className }">
      <CheckOutlined :class="className" />
    </template> </a-typography-paragraph
  ><br />

  <a-typography-text>{{ t('Phone') }}:&nbsp;&nbsp;</a-typography-text>
  <a-typography-paragraph v-model:content="user.phone" class="inline-block" editable>
    <template #editableTooltip>{{ t('Click to edit text') }}</template>
    <template #editableEnterIcon="{ className }">
      <CheckOutlined :class="className" />
    </template> </a-typography-paragraph
  ><br />

  <a-typography-text>{{ t('Avatar') }}:&nbsp;&nbsp;</a-typography-text>
  <a-typography-paragraph v-model:content="user.avatarUrl" class="inline-block" editable>
    <template #editableTooltip>{{ t('Click to edit text') }}</template> </a-typography-paragraph
  ><br />

  <a-typography-text>{{ t('Personality label') }}:&nbsp;&nbsp;</a-typography-text>
  <a-typography-paragraph v-model:content="user.label" class="inline-block" editable>
    <template #editableTooltip>{{ t('Click to edit text') }}</template> </a-typography-paragraph
  ><br />
</template>
<script lang="ts" setup>
import { defineProps, computed, defineEmits } from 'vue';
import { useI18n } from '@renderer/i18n';
import { CheckOutlined } from '@ant-design/icons-vue';

const { t } = useI18n();
const $emit = defineEmits(['update:data']);
const props = defineProps({
  data: {
    required: true,
    type: Object,
    default: () => ({})
  }
});
const user = computed({
  get() {
    return new Proxy(props.data, {
      set(obj, name, val): boolean {
        $emit('update:data', {
          ...obj,
          [name]: val
        });
        return true;
      }
    });
  },
  set(v) {
    $emit('update:data', v);
  }
});
</script>
