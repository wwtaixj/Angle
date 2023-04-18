<template>
  <a-form-item name="username">
    <a-input
      v-model:value="formState.username"
      :placeholder="usernamePlaceholder"
      :autocomplete="data?.remember ? 'on' : 'off'"
      @input="handleInputChange('username')($event)"
      allowClear
    >
      <template #prefix>
        <UserOutlined class="site-form-item-icon" />
      </template>
    </a-input>
  </a-form-item>

  <a-form-item name="password">
    <a-input-password
      v-model:value="formState.password"
      @input="handleInputChange('password')($event)"
      :placeholder="passwordPlaceholder"
      :autocomplete="data?.remember ? 'on' : 'new-password'"
      allowClear
    >
      <template #prefix>
        <LockOutlined class="site-form-item-icon" />
      </template>
    </a-input-password>
  </a-form-item>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, reactive, watch } from 'vue';
import { useI18n } from '@renderer/i18n';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { UserForm } from '@renderer/views/login/model';

const { t } = useI18n();
const $emit = defineEmits(['update:data']);
const props = defineProps({
  data: {
    type: Object as () => UserForm,
    default: () => ({
      password: '', // password
      username: '' // username
    })
  }
});

const usernamePlaceholder = t('login.Username');
const passwordPlaceholder = t('login.Password');
const formState = reactive({
  password: props.data?.password,
  username: props.data?.username,
  remember: props.data?.remember
});
// 提取输入框值变化的处理函数
function handleInputChange(name: string) {
  return (e: Event) => {
    formState[name] = e.target?.['value'].replace(/\s+/g, '');
  };
}
// 监听输入参数变化
watch(
  () => formState,
  (newVal) => {
    $emit('update:data', newVal);
  },
  { deep: true }
);
</script>
