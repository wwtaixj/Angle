<template>
  <div class="q-pa-lg position-relative">
    <LoginForm
      v-show="userStore.loginDialogType === LoginDialogTypeEnum.LOGIN"
    />
    <RegisterForm
      v-show="userStore.loginDialogType === LoginDialogTypeEnum.REGISTER"
    />
  </div>
</template>
<script lang="ts" setup>
//import { ref } from 'vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import { LoginDialogTypeEnum } from '@/enums/login';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>
