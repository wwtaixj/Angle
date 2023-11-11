<template>
  <q-form
    ref="loginForm"
    @submit="submitLogin"
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
        :label="t('login.Login')"
        class="full-width"
        type="submit"
        color="primary"
        :loading="loginLoading"
      />
      <q-space />
    </div>
  </q-form>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from '@/boot/i18n';
import { QFormProps } from 'quasar';
import { getLoginFormRules } from './constant';
import { useUserStore } from '@/stores/user';
import { XButton } from '@/components/button';

const { t } = useI18n();
const loginForm = ref<QFormProps>();
const userStore = useUserStore();
const loginLoading = ref(false);
async function submitLogin() {
  loginLoading.value = true;
  try {
    await userStore.login();
  } finally {
    loginLoading.value = false;
  }
}
function onReset() {
  userStore.username = '';
  userStore.password = '';
}
</script>
