<template>
  <a-form
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
    <a-form-item>
      <a-form-item name="remember" no-style>
        <a-checkbox
          v-model:checked="formState.remember"
          @change="rememberChange"
          class="login-form-remember"
          >{{ $t('login.Remember me') }}</a-checkbox
        >
      </a-form-item>
      <a-typography-link
        class="login-form-forgot"
        @click="userStore.setLoginState(LoginStateEnum.RESET_PASSWORD)"
        >{{ $t('login.Forgot password') }}</a-typography-link
      >
    </a-form-item>

    <a-form-item class="login-form-button">
      <a-button :loading="loginLoading" block html-type="submit" ghost>
        {{ $t('login.Login') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from '@renderer/i18n';
import service from '@renderer/api/service';
import { useUserStore } from '@renderer/store';
import request_url from '@renderer/api/request_url';
import { resultPrompt } from '@renderer/utils/custom';
import { encrypt, decrypt } from '@renderer/utils/cryptoJs';
import { Rule } from 'ant-design-vue/es/form';
import nameOrPassword from './nameOrPassword.vue';
import { UserForm } from '@renderer/views/login/model';
import { getNavLocation } from '@renderer/utils';
import { LoginStateEnum } from '@renderer/store/model';

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const loginLoading = ref(false);
const formState = ref<UserForm>({
  // 登陆表单
  username: '',
  password: '',
  remember: userStore.getRemember
});
const loginRules: Record<string, Rule[]> = {
  username: [{ required: true, message: t('login.Please input your username!') }],
  password: [
    { required: true, message: t('login.Please input your password!') },
    { min: 6, message: t('login.The input content must contain more than 6 characters') }
  ]
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
    const result = await service.postApiData(request_url.login, {
      username: hashedUsername,
      password: hashedPassword,
      ...userStore.getLocation // 地理位置信息
    });
    // 返回结果提示
    resultPrompt(result.data, t('login.Login success'), () => {
      const { token, phone, avatar_url, age, label, gender } = result.data?.data;
      userStore.setUserName(username);
      userStore.setToken(token);
      userStore.setPhone(decrypt(phone));
      userStore.setAvatarUrl(avatar_url);
      userStore.setAge(age);
      userStore.setLabel(label);
      userStore.setGender(gender);
      userStore.setPassword(password);
      router.push('/home/chatGpt');
    });
  } finally {
    loginLoading.value = false;
  }
};
// login 表单校验失败
const onFinishFailed = (errorInfo: never): void => {
  console.log('Failed:', errorInfo);
};
const rememberChange = (e: Event) => {
  if (!e.target) return;
  userStore.setRemember(e.target['checked']);
};
</script>
<style lang="less" scoped>
.login-form {
  .login-form-forgot {
    float: right;
  }
  .login-form-button {
    margin-bottom: 0.5rem;
    margin-top: 10vh;
    width: 100%;
    .ant-btn {
      width: 100%;
    }
  }
  .login-form-remember {
    color: #fff;
  }
  @media screen and(max-width: 750px) {
  }
}
</style>
