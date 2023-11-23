<template>
  <q-form
    ref="loginForm"
    @submit="submitLogin"
    @reset="onReset"
    class="q-gutter-md q-x-md"
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
  >
    <XInput
      v-model="userStore.username"
      :label="t('login.Username') + '*'"
      lazy-rules
      :rules="getLoginFormRules().username"
    />

    <XInputPassword
      v-model="userStore.password"
      :label="t('login.Password') + '*'"
      lazy-rules
      :rules="getLoginFormRules().password"
    />
    <q-toggle
      :label="t('login.RememberMe')"
      v-model="userStore.remember"
      checked-icon="check"
      unchecked-icon="clear"
    />

    <div class="q-gutter-md">
      <XButton
        :label="t('login.Login')"
        class="full-width"
        type="submit"
        color="primary"
        :loading="loginLoading"
      />
      <q-space />
      <XButton
        outline
        label="注册"
        class="full-width"
        color="primary"
        @click="register"
      />
    </div>
  </q-form>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from '@/boot/i18n';
import { QFormProps } from 'quasar';
import { getLoginFormRules } from './constant';
import { useUserStore } from '@/stores/user';
import { useMainStore } from '@/stores/main';
import { XButton, XInputPassword, XInput } from '@/components';
import { LoginDialogTypeEnum } from '@/enums/login';

const { t } = useI18n();
const loginForm = ref<QFormProps>();
const userStore = useUserStore();
const mainStore = useMainStore();
const loginLoading = ref(false);
async function submitLogin() {
  loginLoading.value = true;
  try {
    await userStore.login();
  } catch (e) {
    console.log(e);
  } finally {
    loginLoading.value = false;
  }
}
function register() {
  mainStore.setDialog({ title: '注册' });
  userStore.setLoginDialogType(LoginDialogTypeEnum.REGISTER);
}
function onReset() {
  userStore.username = '';
  userStore.password = '';
}
</script>
