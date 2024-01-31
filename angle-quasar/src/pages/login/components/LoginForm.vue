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
      placeholder="用户名"
      dense
      no-error-icon
    >
      <template v-slot:prepend>
        <q-icon size="xs" name="fa-solid fa-user" />
      </template>
      <template #append>
        <q-icon
          v-show="!menu"
          size="xs"
          name="fa-solid fa-angle-down"
          class="cursor-pointer down"
          @click.stop.prevent="menu = true"
        />
        <q-icon
          v-show="menu"
          size="xs"
          name="fa-solid fa-angle-up"
          class="cursor-pointer down"
          @click.stop.prevent="menu = false"
        />
      </template>
      <q-menu
        transition-show="jump-down"
        transition-hide="jump-up"
        :no-parent-event="!menu"
        max-width="238px"
        max-height="200px"
        style="width: 238px"
        v-model="menu"
      >
        <q-list>
          <q-item
            clickable
            v-for="(item, index) in userStore.loginHistory"
            :key="index"
          >
            <q-item-section v-close-popup @click="backfillCipher(item)">{{
              item.username
            }}</q-item-section>
            <q-item-section top side>
              <q-btn
                size="12px"
                flat
                dense
                round
                icon="close"
                @click="userStore.deleteLoginHistory(index)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </XInput>

    <XInputPassword
      dense
      no-error-icon
      v-model="userStore.password"
      lazy-rules
      :rules="getLoginFormRules().password"
      placeholder="密码"
    >
      <template v-slot:prepend>
        <q-icon size="xs" name="fa-solid fa-lock" />
      </template>
    </XInputPassword>

    <q-checkbox
      class="flex-start text-caption"
      right-label
      dense
      :model-value="userStore.automaticLogin"
      @update:model-value="userStore.setAutomaticLogin"
      :label="t('login.AutomaticLogin')"
      checked-icon="task_alt"
      unchecked-icon="radio_button_unchecked"
    />
    <q-checkbox
      class="flex-start q-ml-md text-caption"
      right-label
      dense
      :model-value="userStore.remember"
      @update:model-value="userStore.setRemember"
      :label="t('login.RememberMe')"
      checked-icon="task_alt"
      unchecked-icon="radio_button_unchecked"
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
import { ref, useAttrs, onMounted } from 'vue';
import { useI18n } from '@/boot/i18n';
import { QFormProps } from 'quasar';
import { getLoginFormRules } from './constant';
import { useUserStore } from '@/stores/user';
import { XButton, XInputPassword, XInput } from '@/components';

const { t } = useI18n();
const loginForm = ref<QFormProps>();
const userStore = useUserStore();
const menu = ref(false);
const loginLoading = ref(false);
/**
 * 登录
 */
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
/**
 * 填充密码
 * @param item
 */
function backfillCipher(item: { username: string; password: string }) {
  userStore.username = item.username;
  if (item.password) {
    userStore.password = item.password;
  }
}
function onReset() {
  userStore.username = '';
  userStore.password = '';
}
onMounted(() => {
  if (userStore.remember)
    backfillCipher({
      username: userStore.getUserName,
      password: userStore.getPassword,
    });
  setTimeout(() => {
    if (userStore.automaticLogin && userStore.username && userStore.password) {
      submitLogin();
    }
  }, 1200);
});
</script>
