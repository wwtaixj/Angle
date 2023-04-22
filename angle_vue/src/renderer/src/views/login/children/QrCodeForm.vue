<template>
  <div class="enter-x min-w-64 min-h-64">
    <QrCode :value="qrCodeUrl" class="enter-x flex justify-center xl:justify-start" :width="280" />
    <a-divider class="enter-x">{{ t('login.QrCodeConfirmMessage') }}</a-divider>
    <a-button
      size="large"
      block
      class="mt-4 enter-x"
      @click="userStore.setLoginState(LoginStateEnum.LOGIN)"
    >
      {{ t('login.Go back') }}
    </a-button>
  </div>
</template>
<script lang="ts" setup>
import { QrCode } from '@renderer/components/Qrcode/index';
import { useI18n } from '@renderer/i18n';
import { useUserStore } from '@renderer/store/userStore';
import { LoginStateEnum } from '@renderer/store/model';

const { t } = useI18n();
const userStore = useUserStore();

const qrCodeUrl = 'http://loose.net.cn/api/user/login';
</script>
