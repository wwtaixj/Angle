<!--
 * @Author: JX 761359511@qq.com
 * @Date: 2023-04-16 14:02:23
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-26 09:57:01
 * @FilePath: \Angle\angle_vue\src\renderer\src\views\login\children\nameOrPassword.vue
-->
<template>
  <FormItem name="username">
    <Input
      v-model:value="formState.username"
      :placeholder="t('login.Username')"
      :autocomplete="data?.remember ? 'on' : 'off'"
      @input="handleInputChange('username')($event)"
      allowClear
    >
      <template #prefix>
        <UserOutlined class="site-form-item-icon" />
      </template>
    </Input>
  </FormItem>

  <FormItem name="password">
    <InputPassword
      v-model:value="formState.password"
      @input="handleInputChange('password')($event)"
      :placeholder="t('login.Password')"
      :autocomplete="data?.remember ? 'on' : 'new-password'"
      allowClear
    >
      <template #prefix>
        <LockOutlined class="site-form-item-icon" />
      </template>
    </InputPassword>
  </FormItem>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, reactive, watch } from 'vue';
import { Input, FormItem, InputPassword } from 'ant-design-vue';
import { useI18n } from '@renderer/i18n';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { UserForm } from '@renderer/views/login/helper';

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
