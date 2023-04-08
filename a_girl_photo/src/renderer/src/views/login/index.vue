<template>
  <a-layout class="login">
    <Particles id="tsparticles" :options="light" />
    <a-layout-header
      class="login-header"
      :style="`background: url(${imgUrl})
          no-repeat;background-size: cover;`"
    ></a-layout-header>
    <a-layout class="login-content">
      <a-layout-content>
        <a-card class="login-card">
          <a-form
            :model="formState"
            name="normal_login"
            class="login-form"
            :label-col="{ span: 4 }"
            autocomplete="off"
            @finish="onFinish"
            @finish-failed="onFinishFailed"
          >
            <a-form-item
              name="username"
              :rules="[{ required: true, message: $t('login.Please input your username!') }]"
            >
              <a-input v-model:value="formState.username" :placeholder="$t('login.Username')">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              name="password"
              :rules="[{ required: true, message: $t('login.Please input your password!') }]"
              class="login-form-password"
            >
              <a-input-password
                v-model:value="formState.password"
                :placeholder="$t('login.Password')"
              >
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item>
              <a-form-item name="remember" no-style>
                <a-checkbox v-model:checked="formState.remember">{{
                  $t('login.Remember me')
                }}</a-checkbox>
              </a-form-item>
              <a-typography-link class="login-form-forgot" href="">{{
                $t('login.Forgot password')
              }}</a-typography-link>
            </a-form-item>

            <a-form-item class="login-form-button">
              <a-button type="primary" html-type="submit">
                {{ $t('login.Log in') }}
              </a-button>
            </a-form-item>
            <a-typography-link class="login-form-register" delete href="">{{
              $t('login.register now')
            }}</a-typography-link>
          </a-form>
        </a-card>
      </a-layout-content>
    </a-layout>
    <a-layout-footer></a-layout-footer>
  </a-layout>
</template>
<script lang="ts" setup>
import { reactive, computed, ref } from 'vue';

import light from '../../assets/particles/light';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
const imgUrl = ref('');
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true
});

const getAssetsFile = (url: string): void => {
  imgUrl.value = new URL(url, import.meta.url).href;
};
const onFinish = (values: never): void => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: never): void => {
  console.log('Failed:', errorInfo);
};

getAssetsFile('../../assets/images/background/307794f9e72f99d31c5d0784f417c97a.gif');
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: transparent !important;
  .login-header {
    background-size: cover;
  }
  .login-content {
    .login-card {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      min-width: 400px;
      width: 30rem;
      box-shadow: var(--shadow-card);
    }
    .login-card:hover {
      transition: box-shadow 0.3s, border-color 0.3s;
    }
    .login-form {
      .login-form-forgot {
        float: right;
      }
      .login-form-button {
        margin-bottom: 5px;
        margin-top: 5rem;
        width: 100%;
        .ant-btn {
          width: 100%;
        }
      }
      .login-form-password {
      }
      .login-form-register {
        float: right;
      }
    }
  }
}
</style>
