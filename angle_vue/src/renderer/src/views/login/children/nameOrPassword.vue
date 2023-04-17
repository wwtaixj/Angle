<template>
  <a-form-item :rules="usernameRules" name="username">
    <a-input
      v-model:value="formState.username"
      :placeholder="usernamePlaceholder"
      :autocomplete="data?.remember ? 'on' : 'off'"
      @input="handleInputChange('username')"
      allowClear
    >
      <template #prefix>
        <UserOutlined class="site-form-item-icon" />
      </template>
    </a-input>
  </a-form-item>

  <a-form-item :rules="passwordRules" name="password">
    <a-input-password
      v-model:value="formState.password"
      @input="handleInputChange('password')"
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
// username and password rules
const usernameRules = [{ required: true, message: t('login.Please input your username!') }];
const passwordRules = [
  { required: true, message: t('login.Please input your password!') },
  { min: 6, message: t('login.The input content must contain more than 6 characters') }
];
const usernamePlaceholder = t('login.Username');
const passwordPlaceholder = t('login.Password');
const formState = reactive({
  password: props.data?.username,
  username: '',
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
