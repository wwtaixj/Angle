<template>
  <div class="q-pa-lg position-relative">
    <LoginForm
      v-show="loginStore.loginDialogType === LoginDialogTypeEnum.LOGIN"
    />
    <RegisterForm
      v-show="loginStore.loginDialogType === LoginDialogTypeEnum.REGISTER"
    />
  </div>
</template>
<script lang="ts" setup>
//import { ref } from 'vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import { LoginDialogTypeEnum } from '@/enums/login';
import { useLoginStore } from '@/stores/login';

const loginStore = useLoginStore();
</script>
