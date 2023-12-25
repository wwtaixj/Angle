<template>
  <RegisterForm
    v-show="userStore.loginDialogType === LoginDialogTypeEnum.REGISTER"
  />
  <q-layout
    v-show="userStore.loginDialogType === LoginDialogTypeEnum.LOGIN"
    class="login"
  >
    <q-header :style="{ height: headerHeight }" class="login-header">
      <XWinBar :showMaximized="false" />
    </q-header>
    <q-page-container class="login-content">
      <q-page>
        <q-card flat>
          <q-card-section>
            <q-btn
              fab
              color="primary"
              icon="fa-solid fa-robot"
              class="avatar absolute"
            />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="position-relative">
              <LoginForm />
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
    <q-footer class="bg-white text-grey-6">
      <XButton outline flat label="注册账号" @click="register" />
    </q-footer>
  </q-layout>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import { LoginDialogTypeEnum } from '@/enums/login';
import { useUserStore } from '@/stores/user';
import { XWinBar, XButton } from '@/components';

const userStore = useUserStore();
//const mainStore = useMainStore();
const headerHeight = computed(() =>
  userStore.loginDialogType === LoginDialogTypeEnum.REGISTER ? '32px' : '220px'
);

function register() {
  userStore.setLoginDialogType(LoginDialogTypeEnum.REGISTER);
}
</script>
<style lang="scss" scoped>
.login {
  .login-header {
    background: url('/src/assets/images/shijie.png');
    background-size: cover;
  }
  .avatar {
    top: 0;
    right: 50%;
    transform: translateY(-50%) translateX(50%);
    z-index: 9999;
  }

  .login-content {
    margin: 0 80px;
  }
}
</style>
