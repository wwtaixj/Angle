<template>
	<Form
		:model="formState"
		name="mobile_login"
		class="mobile-login"
		:label-col="{ span: 4 }"
		autocomplete="off"
		@finish="onFinish"
	>
		<phoneAndNumber v-model:data="formState" />
		<FormItem class="form-submit">
			<Button :loading="loading" block html-type="submit" ghost>
				{{ $t('login.Login') }}
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
import { LoginStateEnum } from '@renderer/store/model';
import { resetPssword } from '@renderer/api';
import { resultPrompt } from '@renderer/utils/custom';
import { encrypt } from '@renderer/utils/cryptoJs';
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
		const result = await resetPssword({
			SMSCode: hashedSMSCode,
			phone: hashedPhone
		});
		// 返回结果提示
		resultPrompt(result, t('login.Password reset succeeded'), () => {
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
