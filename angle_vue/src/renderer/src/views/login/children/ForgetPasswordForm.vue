<template>
	<Form
		:model="formState"
		name="forget_password"
		class="forget-password"
		:label-col="{ span: 4 }"
		:rules="loginRules"
		autocomplete="off"
		@finish="onFinish"
	>
		<FormItem name="username">
			<Input
				v-model:value="formState.username"
				:placeholder="usernamePlaceholder"
				@input="handleInputChange('username')($event)"
				allowClear
			>
				<template #prefix>
					<UserOutlined class="site-form-item-icon" />
				</template>
			</Input>
		</FormItem>
		<phoneAndNumber v-model:data="formState" />
		<FormItem class="form-submit">
			<Button :loading="loading" block html-type="submit" ghost>
				{{ $t('login.Reset password') }}
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
import { Form, FormItem, Input, Button } from 'ant-design-vue';
import { useI18n } from '@renderer/i18n';
import { useUserStore } from '@renderer/store';
import { LoginStateEnum } from '@renderer/store/model';
import { resetPssword } from '@renderer/api';
import { resultPrompt } from '@renderer/utils/custom';
import { encrypt } from '@renderer/utils/cryptoJs';
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
		const result = await resetPssword({
			SMSCode: hashedSMSCode,
			username: hashedUsername,
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
