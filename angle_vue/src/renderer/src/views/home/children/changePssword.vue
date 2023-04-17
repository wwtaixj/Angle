<template>
  <a-form
    ref="changePasswordRef"
    :model="formState"
    name="change_password"
    :label-col="{ span: 4 }"
    autocomplete="off"
  >
    <nameOrPassword v-model:data="formState" />
    <a-form-item :rules="passwordRules" name="newPassword">
      <a-input-password
        v-model:value="formState.newPassword"
        :placeholder="newPasswordPlaceholder"
        autocomplete="new-password"
        allowClear
      >
        <template #prefix> <LockOutlined class="site-form-item-icon" /> </template
      ></a-input-password>
    </a-form-item>
    <a-form-item :rules="passwordRules" name="againNewPassword">
      <a-input-password
        v-model:value="formState.againNewPassword"
        :placeholder="againNewPasswordPlaceholder"
        autocomplete="new-password"
        allowClear
      >
        <template #prefix> <LockOutlined class="site-form-item-icon" /> </template
      ></a-input-password>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { LockOutlined } from '@ant-design/icons-vue';
import { useI18n } from '@renderer/i18n';
import { useUserStore } from '@renderer/store/userStore';
import nameOrPassword from '@renderer/views/login/children/nameOrPassword.vue';
import { UserForm } from '@renderer/views/login/model';

defineProps({
  data: {
    type: Object as () => { newPassword: string; againNewPassword: string },
    required: true,
    default: () => ({
      newPassword: '',
      againNewPassword: ''
    })
  }
});
const userStore = useUserStore();
const { t } = useI18n();
const changePasswordRef = ref();
const formState = ref<UserForm>({
  username: userStore.getUserName,
  password: '',
  remember: false,
  newPassword: '',
  againNewPassword: ''
});

const passwordRules = [
  { required: true, message: t('login.Please input your new password!') },
  { min: 6, message: t('login.The input content must contain more than 6 characters') }
];
const newPasswordPlaceholder = t('Please enter a new password');
const againNewPasswordPlaceholder = t('Please enter the new password again');
</script>
