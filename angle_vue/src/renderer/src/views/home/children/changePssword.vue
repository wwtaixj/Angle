<template>
	<Form
		ref="changePasswordRef"
		:model="formState"
		:rules="chaPassRules"
		name="change_password"
		:label-col="{ span: 4 }"
		autocomplete="off"
	>
		<nameOrPassword v-model:data="formState" />
		<FormItem name="newPassword">
			<InputPassword
				v-model:value="formState.newPassword"
				:placeholder="newPasswordPlaceholder"
				autocomplete="new-password"
				allowClear
			>
				<template #prefix> <LockOutlined class="site-form-item-icon" /> </template
			></InputPassword>
		</FormItem>
		<FormItem name="againNewPassword">
			<InputPassword
				v-model:value="formState.againNewPassword"
				:placeholder="againNewPasswordPlaceholder"
				autocomplete="new-password"
				allowClear
			>
				<template #prefix> <LockOutlined class="site-form-item-icon" /> </template
			></InputPassword>
		</FormItem>
	</Form>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Form, FormItem, InputPassword } from 'ant-design-vue';
import { LockOutlined } from '@ant-design/icons-vue';
import { useI18n } from '@renderer/i18n';
import { useUserStore } from '@renderer/store';
import nameOrPassword from '@renderer/views/login/children/nameOrPassword.vue';
import { UserForm } from '@renderer/views/login/model';
import { Rule } from 'ant-design-vue/es/form';

const userStore = useUserStore();
const { t } = useI18n();
const changePasswordRef = ref();
const chaPassRules: Record<string, Rule[]> = {
	username: [{ required: true, message: t('login.Please input your username!') }],
	password: [
		{
			required: true,
			validator: async (_rule: Rule, value: string) => {
				if (_rule.required && !value) {
					return Promise.reject(t('login.Please input your password!'));
				}
				if (value && value.length < 6) {
					return Promise.reject(t('login.The input content must contain more than 6 characters'));
				}
				return Promise.resolve();
			}
		}
	],
	newPassword: [
		{
			required: true,
			validator: async (_rule: Rule, value: string) => {
				if (_rule.required && !value) {
					return Promise.reject(t('Please enter a new password'));
				}
				if (value && value.length < 6) {
					return Promise.reject(t('login.The input content must contain more than 6 characters'));
				}
				if (value === formState.value.password) {
					return Promise.reject(t('The new password is the same as the old one'));
				}
				return Promise.resolve();
			}
		}
	],
	againNewPassword: [
		{
			required: true,
			validator: async (_rule: Rule, value: string) => {
				if (_rule.required && !value) {
					return Promise.reject(t('Please enter the new password again'));
				}
				if (value && value.length < 6) {
					return Promise.reject(t('login.The input content must contain more than 6 characters'));
				}
				if (value === formState.value.password) {
					return Promise.reject(t('The new password is the same as the old one'));
				}
				if (value !== formState.value.newPassword) {
					return Promise.reject(t('The two passwords are different'));
				}
				return Promise.resolve();
			}
		}
	]
};
//,message: t('login.Please input your password!'),
// { min: 6, message: t('login.The input content must contain more than 6 characters') },
const formState = ref<UserForm>({
	username: userStore.getUserName,
	password: '',
	remember: false,
	newPassword: '',
	againNewPassword: ''
});

const newPasswordPlaceholder = t('Please enter a new password');
const againNewPasswordPlaceholder = t('Please enter the new password again');
</script>
