<!--
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-16 19:37:37
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-26 14:12:46
 * @FilePath: \angle-quasar\src\pages\login\components\LoginForm.vue
-->
<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-input
      v-model="username"
      :label="t('login.Username') + '*'"
      lazy-rules
      :rules="getLoginFormRules().username"
    />

    <q-input
      type="password"
      v-model="password"
      :label="t('login.Password') + '*'"
      lazy-rules
      :rules="getLoginFormRules().password"
    />
    <q-checkbox
      v-model="accept"
      :label="t('login.RememberMe')"
      checked-icon="task_alt"
      unchecked-icon="highlight_off"
    />

    <div class="row justify-center">
      <q-btn
        :label="t('login.Login')"
        class="full-width"
        type="submit"
        color="primary"
      />
    </div>
  </q-form>
</template>
<script lang="ts" setup>
import { useI18n } from '@/boot/i18n';
import { useQuasar } from 'quasar';
import { getLoginFormRules } from './constant';
import { ref } from 'vue';

const $q = useQuasar();
const { t } = useI18n();
const username = ref(null);
const password = ref(null);
const accept = ref(false);
function onSubmit() {
  if (accept.value !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first',
    });
  } else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted',
    });
  }
}
function onReset() {
  username.value = null;
  password.value = null;
  accept.value = false;
}
</script>
