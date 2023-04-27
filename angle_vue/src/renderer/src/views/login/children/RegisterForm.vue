<template>
  <Form
    :model="formState"
    name="register"
    class="register"
    :label-col="{ span: 4 }"
    :rules="registerRules"
    autocomplete="off"
    @finish="onFinish"
  >
    <nameOrPassword v-model:data="formState" />
    <phoneAndNumber v-model:data="formState" />
    <FormItem class="form-submit">
      <Button :loading="loading" block html-type="submit" ghost>
        {{ $t('login.register now') }}
      </Button>
    </FormItem>
    <FormItem class="form-back">
      <Button
        type="dashed"
        :loading="loading"
        @click="userStore.setLoginState(LoginStateEnum.LOGIN)"
        ghost
      >
        {{ $t('login.Go back') }}
      </Button>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Form, FormItem, Button } from 'ant-design-vue';
import { useI18n } from '@renderer/i18n';
import { useUserStore } from '@renderer/store';
import nameOrPassword from './nameOrPassword.vue';
import { LoginStateEnum } from '@renderer/store/model';
import { register } from '@renderer/api';
import { resultPrompt } from '@renderer/utils/custom';
import { encrypt } from '@renderer/utils/cryptoJs';
import { UserForm } from '@renderer/views/login/helper';
import phoneAndNumber from './phoneAndNumber.vue';
import { Rule } from 'ant-design-vue/es/form';
import { usernameRules, passwordRules, phoneRules, SMSCodeRules } from '../helper';

const { t } = useI18n();
const userStore = useUserStore();
const registerRules: Record<string, Rule[]> = {
  username: usernameRules.value,
  password: passwordRules.value,
  phone: phoneRules.value,
  SMSCode: SMSCodeRules.value
};
const loading = ref(false);
const formState = ref<UserForm>({
  username: '',
  password: '',
  phone: '',
  SMSCode: ''
});

// 表单校验成功
const onFinish = async (values: UserForm) => {
  try {
    const { username, password, SMSCode, phone } = values;
    loading.value = true;
    // 生成哈希值
    const hashedusername = encrypt(username);
    const hashedpassword = encrypt(password);
    const hashedSMSCode = encrypt(SMSCode);
    const hashedPhone = encrypt(phone);
    // 请求重置
    const result = await register({
      username: hashedusername,
      password: hashedpassword,
      SMSCode: hashedSMSCode,
      phone: hashedPhone
    });
    // 返回结果提示
    resultPrompt(result, t('login.SuccessfulRegistration'), () => {
      userStore.setLoginState(LoginStateEnum.LOGIN);
    });
  } finally {
    loading.value = false;
  }
};
</script>
<style lang="less" scoped>
.mobile-login {
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

  @media screen and(max-width: 640px) {
  }
}
</style>
