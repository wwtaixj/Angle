<template>
	<div class="qr-code-form">
		<QrCode :value="qrCodeUrl" class="qr-code" :width="280" />
		<Divider class="color-white font-size-12">{{ t('login.QrCodeConfirmMessage') }}</Divider>
		<Button
			type="dashed"
			block
			class=""
			@click="userStore.setLoginState(LoginStateEnum.LOGIN)"
			ghost
		>
			{{ t('login.Go back') }}
		</Button>
	</div>
</template>
<script lang="ts" setup>
import { Button, Divider } from 'ant-design-vue';
import { QrCode } from '@renderer/components/Qrcode/index';
import { useI18n } from '@renderer/i18n';
import { useUserStore } from '@renderer/store';
import { LoginStateEnum } from '@renderer/store/model';

const { t } = useI18n();
const userStore = useUserStore();

const qrCodeUrl = 'http://loose.net.cn/api/user/login';
</script>
<style lang="less" scoped>
.qr-code-form {
	.qr-code {
		display: flex;
		justify-content: center;
		:deep(canvas) {
			position: relative;
		}
	}
}
</style>
