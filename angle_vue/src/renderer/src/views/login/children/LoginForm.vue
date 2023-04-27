<template>
  <Form
    :model="formState"
    name="normal_login"
    class="login-form"
    :label-col="{ span: 4 }"
    :rules="loginRules"
    autocomplete="off"
    @finish="onFinish"
    @finish-failed="onFinishFailed"
  >
    <nameOrPassword v-model:data="formState" />
    <FormItem>
      <FormItem name="remember" no-style>
        <Checkbox
          v-model:checked="formState.remember"
          @change="rememberChange"
          class="login-form-remember"
          >{{ $t('login.Remember me') }}</Checkbox
        >
      </FormItem>
      <TypographyLink
        class="login-form-forgot"
        @click="userStore.setLoginState(LoginStateEnum.RESET_PASSWORD)"
        >{{ $t('login.Forgot password') }}</TypographyLink
      >
    </FormItem>

    <FormItem class="form-submit">
      <Button :loading="loginLoading" block html-type="submit" ghost>
        {{ $t('login.Login') }}
      </Button>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Form, FormItem, Checkbox, Button, TypographyLink } from 'ant-design-vue';
import type { CheckboxChangeEvent } from 'ant-design-vue/lib/checkbox/interface';
import { useRouter } from 'vue-router';
import { useI18n } from '@renderer/i18n';
import { useUserStore, useAuthStore } from '@renderer/store';
import { resultPrompt } from '@renderer/utils/custom';
import { encrypt, decrypt } from '@renderer/utils/cryptoJs';
import { Rule } from 'ant-design-vue/es/form';
import nameOrPassword from './nameOrPassword.vue';
import { UserForm } from '@renderer/views/login/helper';
import { getNavLocation } from '@renderer/utils';
import { LoginStateEnum } from '@renderer/store/model';
import { login } from '@renderer/api';
import { usernameRules, passwordRules } from '../helper';

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const authStore = useAuthStore();
const loginLoading = ref(false);
const formState = ref<UserForm>({
  // 登陆表单
  username: '',
  password: '',
  remember: userStore.getRemember
});
const loginRules: Record<string, Rule[]> = {
  username: usernameRules.value,
  password: passwordRules.value
};

// 获取地理位置
onMounted(() => {
  getNavLocation()
    .then((position) => {
      userStore.setLocation(position);
    })
    .catch((error) => {
      const { message } = error;
      userStore.setLocation({ longitude: 0, latitude: 0, message });
    });
});
// login 表单校验成功
const onFinish = async (values: UserForm) => {
  try {
    const { username, password } = values;
    loginLoading.value = true;
    // 生成哈希值
    const hashedPassword = encrypt(password);
    const hashedUsername = encrypt(username);
    // 存储 hash 值到数据库中
    const result = await login({
      username: hashedUsername,
      password: hashedPassword,
      date: new Date(),
      ...userStore.getLocation // 地理位置信息
    });

    // 返回结果提示
    resultPrompt(result, t('login.Login success'), () => {
      const { token, phone, avatar_url, age, label, gender } = result.data as any;
      userStore.setUserName(username);
      authStore.setToken(token);
      userStore.setPhone(decrypt(phone));
      userStore.setAvatarUrl(avatar_url);
      userStore.setAge(age);
      userStore.setLabel(label);
      userStore.setGender(gender);
      userStore.setPassword(password);
      router.push('/home/chatGPT/chat');
    });
  } finally {
    loginLoading.value = false;
  }
};
// login 表单校验失败
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const rememberChange = (e: CheckboxChangeEvent) => {
  if (!e.target) return;
  userStore.setRemember(e.target['checked']);
};
</script>
<style lang="less" scoped>
.login-form {
  .login-form-forgot {
    float: right;
  }

  .login-form-remember {
    color: #fff;
  }
  @media screen and(max-width: 640px) {
  }
}
</style>
