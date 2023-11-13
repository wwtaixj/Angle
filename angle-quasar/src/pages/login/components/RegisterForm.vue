<template>
  <q-form
    ref="registerFormRef"
    @submit="submitRegister"
    class="q-gutter-md q-x-md"
  >
    <XInput
      v-model="registerForm.username"
      :label="t('login.Username') + '*'"
      lazy-rules
      :rules="getLoginFormRules().username"
    />

    <XInputPassword
      v-model="registerForm.password"
      :label="'设置密码' + '*'"
      lazy-rules
      :rules="getLoginFormRules().password"
    />
    <XInputPassword
      v-model="registerForm.confirmPassword"
      :label="'确认密码' + '*'"
      lazy-rules
      :rules="getLoginFormRules().password"
    />
    <XInput
      ref="emailRef"
      v-model="registerForm.email"
      :label="'邮箱' + '*'"
      lazy-rules
      :rules="getLoginFormRules().email"
    />
    <XInput
      v-model="registerForm.verCode"
      :label="'验证码' + '*'"
      :rules="getLoginFormRules().verCode"
    >
      <template v-slot:after>
        <XButtonVerifyCode
          v-model="userStore.verCodeTimer"
          :before-click="beforeSend"
        />
      </template>
    </XInput>

    <div class="q-gutter-md">
      <XButton
        :label="t('login.RegisterNow')"
        class="full-width"
        type="submit"
        color="primary"
        :loading="registerLoading"
      />
      <q-space />
      <XButton
        outline
        :label="t('login.GoBack')"
        class="full-width"
        color="primary"
        @click="userStore.setLoginDialogType(LoginDialogTypeEnum.LOGIN)"
      />
    </div>
  </q-form>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useI18n } from '@/boot/i18n';
//import { QFormProps } from 'quasar';
import { encrypt } from '@/utils';
import { getLoginFormRules } from './constant';
import { useUserStore } from '@/stores/user';
import { LoginDialogTypeEnum } from '@/enums/login';
import {
  XButton,
  XInput,
  XInputPassword,
  XButtonVerifyCode,
} from '@/components';

const { t } = useI18n();
const userStore = useUserStore();
const registerLoading = ref(false);
const emailRef = ref<typeof XInput>();
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  verCode: '',
});
async function beforeSend() {
  const isTrue = await emailRef.value?.$refs.inputRef.validate();
  if (!isTrue) return isTrue;
  return await userStore.sendVerCode(registerForm.email);
}
async function submitRegister() {
  registerLoading.value = true;
  try {
    await userStore.register({
      username: encrypt(registerForm.username),
      password: encrypt(registerForm.password),
      email: registerForm.email,
      verCode: registerForm.verCode,
    });
  } finally {
    registerLoading.value = false;
  }
}
</script>
