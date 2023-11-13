<template>
  <q-form
    ref="registerForm"
    @submit="submitRegister"
    @reset="onReset"
    class="q-gutter-md q-x-md"
  >
    <q-input
      v-model="userStore.username"
      :label="t('login.Username') + '*'"
      lazy-rules
      :rules="getLoginFormRules().username"
    />

    <q-input
      type="password"
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
        :label="t('login.RegisterNow')"
        class="full-width"
        type="submit"
        color="primary"
        :loading="registerLoading"
      />
      <q-space />
      <XButton
        outline
        label="注册"
        class="full-width"
        color="primary"
        @click="loginStore.setLoginDialogType(LoginDialogTypeEnum.REGISTER)"
      />
    </div>
  </q-form>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from '@/boot/i18n';
//import { QFormProps } from 'quasar';
import { getLoginFormRules } from './constant';
import { useUserStore } from '@/stores/user';
import { useLoginStore } from '@/stores/login';
import { LoginDialogTypeEnum } from '@/enums/login';
import { XButton } from '@/components/button';

const { t } = useI18n();
const userStore = useUserStore();
const loginStore = useLoginStore();
const registerLoading = ref(false);
async function submitRegister() {
  registerLoading.value = true;
  try {
    await userStore.login();
  } finally {
    registerLoading.value = false;
  }
}
function onReset() {
  userStore.username = '';
  userStore.password = '';
}
</script>
