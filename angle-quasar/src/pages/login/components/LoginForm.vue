<template>
  <q-form
    v-bind="useAttrs()"
    ref="loginForm"
    @submit="submitLogin"
    @reset="onReset"
    class="text-grey-6"
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
  >
    <XInput
      v-model="userStore.username"
      lazy-rules
      :rules="getLoginFormRules().username"
      dense
    >
      <template v-slot:prepend>
        <q-icon size="xs" name="fa-solid fa-user" /> </template
    ></XInput>

    <XInputPassword
      dense
      v-model="userStore.password"
      lazy-rules
      :rules="getLoginFormRules().password"
    >
      <template v-slot:prepend>
        <q-icon size="xs" name="fa-solid fa-lock" />
      </template>
    </XInputPassword>

    <q-checkbox
      class="flex-start"
      right-label
      dense
      v-model="userStore.remember"
      :label="t('login.AutomaticLogin')"
      checked-icon="task_alt"
      unchecked-icon="highlight_off"
    />
    <XButton
      :label="t('login.Login')"
      class="full-width q-mt-md"
      type="submit"
      color="primary"
      :loading="loginLoading"
      unelevated
      rounded
    />
  </q-form>
</template>
<script lang="ts" setup>
import { ref, useAttrs } from 'vue';
import { useI18n } from '@/boot/i18n';
import { QFormProps } from 'quasar';
import { getLoginFormRules } from './constant';
import { useUserStore } from '@/stores/user';

import { XButton, XInputPassword, XInput } from '@/components';

const { t } = useI18n();
const loginForm = ref<QFormProps>();
const userStore = useUserStore();

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

function onReset() {
  userStore.username = '';
  userStore.password = '';
}
</script>
