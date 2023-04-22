<template>
  <a-form
    :model="formState"
    name="forget_password"
    class="forget-password"
    :label-col="{ span: 4 }"
    :rules="loginRules"
    autocomplete="off"
    @finish="onFinish"
  >
    <a-form-item name="username">
      <a-input
        v-model:value="formState.username"
        :placeholder="usernamePlaceholder"
        @input="handleInputChange('username')($event)"
        allowClear
      >
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>
    <phoneAndNumber v-model:data="formState" @send-s-m-s-code="onSMSCode" />
    <a-form-item class="form-submit">
      <a-button :loading="loading" block html-type="submit" ghost>
        {{ $t('login.Reset password') }}
      </a-button>
    </a-form-item>
    <a-form-item class="form-back">
      <a-button
        type="dashed"
        :loading="loading"
        @click="userStore.setLoginState(LoginStateEnum.LOGIN)"
        ghost
      >
        {{ $t('login.Go back') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from '@renderer/i18n';
import { useUserStore } from '@renderer/store/userStore';
import { LoginStateEnum } from '@renderer/store/model';
import { postApiData } from '@renderer/apis/service';
import request_url from '@renderer/apis/request_url';
import { resultPrompt } from '@renderer/assets/public';
import { encrypt } from '@renderer/assets/public/cryptoJs';
import { Rule } from 'ant-design-vue/es/form';
import { UserOutlined } from '@ant-design/icons-vue';
import { UserForm } from '@renderer/views/login/model';
import phoneAndNumber from './phoneAndNumber.vue';

const { t } = useI18n();
const userStore = useUserStore();
const loading = ref(false);
const formState = ref<UserForm>({
  // 重置表单
  username: '',
  phone: '',
  SMSCode: ''
});
const usernamePlaceholder = t('login.Username');
const loginRules: Record<string, Rule[]> = {
  username: [{ required: true, message: t('login.Please input your username!') }],
  password: [
    { required: true, message: t('login.Please input your password!') },
    { min: 6, message: t('login.The input content must contain more than 6 characters') }
  ]
};
// 提取输入框值变化的处理函数
function handleInputChange(name: string) {
  return (e: Event) => {
    formState[name] = e.target?.['value'].replace(/\s+/g, '');
  };
}
// 重置表单校验成功
const onFinish = async (values: UserForm) => {
  try {
    const { username, SMSCode, phone } = values;
    loading.value = true;
    // 生成哈希值
    const hashedSMSCode = encrypt(SMSCode);
    const hashedUsername = encrypt(username);
    const hashedPhone = encrypt(phone);
    // 请求重置
    const result = await postApiData(request_url.resetPssword, {
      SMSCode: hashedSMSCode,
      username: hashedUsername,
      phone: hashedPhone
    });
    // 返回结果提示
    resultPrompt(result.data, t('login.Password reset succeeded'), () => {
      userStore.setLoginState(LoginStateEnum.LOGIN);
    });
  } finally {
    loading.value = false;
  }
};

// 发送验证码
const onSMSCode = async () => {
  const result = await postApiData(request_url.SMSCode, {
    phone: formState.value.phone,
    username: formState.value.username
  });
  resultPrompt(result.data, t('login.The SMS verification code is sent successfully'));
};
</script>
<style lang="less" scoped>
.forget-password {
  .form-submit {
    margin-top: 10vh;
    margin-bottom: 0.5rem;
    width: 100%;
    .ant-btn {
      width: 100%;
    }
  }
  .form-back {
    margin-bottom: 0.5rem;
    width: 100%;
    .ant-btn {
      width: 100%;
    }
  }

  @media screen and(max-width: 750px) {
  }
  @media screen and(min-width: 751px) {
  }
}
</style>
