<template>
  <a-form
    :model="formState"
    name="mobile_login"
    class="mobile-login"
    :label-col="{ span: 4 }"
    autocomplete="off"
    @finish="onFinish"
  >
    <phoneAndNumber v-model:data="formState" />
    <a-form-item class="form-submit">
      <a-button :loading="loading" block html-type="submit" ghost>
        {{ $t('login.Login') }}
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
import { UserForm } from '@renderer/views/login/model';
import phoneAndNumber from './phoneAndNumber.vue';

const { t } = useI18n();
const userStore = useUserStore();
const loading = ref(false);
const formState = ref<UserForm>({
  phone: '',
  SMSCode: ''
});

// 表单校验成功
const onFinish = async (values: UserForm) => {
  try {
    const { SMSCode, phone } = values;
    loading.value = true;
    // 生成哈希值
    const hashedSMSCode = encrypt(SMSCode);
    const hashedPhone = encrypt(phone);
    // 请求重置
    const result = await postApiData(request_url.resetPssword, {
      SMSCode: hashedSMSCode,
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

  @media screen and(max-width: 750px) {
  }
}
</style>
