<template>
  <q-layout>
    <q-header>
      <XWinBar class="bg-white text-grey-9" :showMaximized="false">
        <template #before>
          <XButton
            style="-webkit-app-region: no-drag"
            icon="arrow_back_ios"
            color="primary"
            flat
            round
            @click="userStore.setLoginDialogType(LoginDialogTypeEnum.LOGIN)"
          />
        </template>
      </XWinBar>
    </q-header>
    <q-page-container>
      <q-page>
        <q-form
          ref="registerFormRef"
          @submit="submitRegister"
          class="text-grey-6 q-px-lg q-pt-md"
        >
          <XInput
            v-model="registerForm.username"
            :label="t('login.Username') + '*'"
            lazy-rules
            :rules="getLoginFormRules().username"
            clearable
            dense
          />

          <XInputPassword
            v-model="registerForm.password"
            :label="'设置密码' + '*'"
            lazy-rules
            :rules="getLoginFormRules().password"
            clearable
            dense
          />
          <XInputPassword
            v-model="registerForm.confirmPassword"
            :label="'确认密码' + '*'"
            lazy-rules
            :rules="getLoginFormRules().password"
            clearable
            dense
          />
          <XInput
            ref="emailRef"
            v-model="registerForm.email"
            :label="'邮箱' + '*'"
            lazy-rules
            :rules="getLoginFormRules().email"
            clearable
            dense
          />
          <XInput
            v-model="registerForm.referralCode"
            label="推荐码(选填)"
            clearable
            dense
          />
          <XInput
            v-model="registerForm.verCode"
            :label="'验证码' + '*'"
            :rules="getLoginFormRules().verCode"
            clearable
            dense
            class="q-mt-xs"
          >
            <template v-slot:after>
              <XButtonVerifyCode
                v-model="userStore.verCodeTimer"
                :before-click="beforeSend"
                :loading="verCodeloading"
              />
            </template>
          </XInput>

          <XButton
            :label="t('login.RegisterNow')"
            class="full-width q-mt-sm"
            type="submit"
            color="primary"
            :loading="registerLoading"
            unelevated
            rounded
          />
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
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
  XWinBar,
} from '@/components';

const { t } = useI18n();
const userStore = useUserStore();
const registerLoading = ref(false);
const verCodeloading = ref(false);
const emailRef = ref<typeof XInput>();
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  verCode: '',
  referralCode: '',
});
async function beforeSend() {
  const isTrue = await emailRef.value?.$refs.inputRef.validate();
  let isSend = false;
  if (!isTrue) return isTrue;
  try {
    verCodeloading.value = true;
    isSend = await userStore.sendVerCode(registerForm.email);
  } catch (e) {
    isSend = false;
  } finally {
    verCodeloading.value = false;
    return isSend;
  }
}
async function submitRegister() {
  registerLoading.value = true;
  try {
    await userStore.register({
      username: encrypt(registerForm.username),
      password: encrypt(registerForm.password),
      email: registerForm.email,
      verCode: registerForm.verCode,
      referralCode: registerForm.referralCode,
    });
  } catch (e) {
    console.log(e);
  } finally {
    registerLoading.value = false;
  }
}
</script>
