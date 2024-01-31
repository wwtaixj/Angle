<template>
  <Transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <RegisterForm
      v-show="userStore.loginDialogType === LoginDialogTypeEnum.REGISTER"
    />
  </Transition>
  <Transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <q-layout
      v-show="userStore.loginDialogType === LoginDialogTypeEnum.LOGIN"
      class="login"
    >
      <q-header class="login-header">
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

            <q-card-section class="q-pt-sm">
              <LoginForm />
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
      <q-footer class="bg-white text-grey-6">
        <XButton outline flat label="注册账号" @click="register" />
      </q-footer>
    </q-layout>
  </Transition>
</template>
<script lang="ts" setup>
//import { computed } from 'vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import { LoginDialogTypeEnum } from '@/enums/login';
import { useUserStore } from '@/stores/user';
import { XWinBar, XButton } from '@/components';

const userStore = useUserStore();
//const mainStore = useMainStore();

function register() {
  userStore.setLoginDialogType(LoginDialogTypeEnum.REGISTER);
}
</script>
<style lang="scss" scoped>
.login {
  .login-header {
    background: url('/src/assets/images/shijie.png');
    background-size: cover;
    min-height: 200px;
    -webkit-app-region: drag;
  }
  .avatar {
    top: 0;
    right: 50%;
    transform: translateY(-50%) translateX(50%);
    z-index: 9999;
    -webkit-app-region: no-drag;
  }

  .login-content {
    margin: 0 80px;
  }
}
</style>
