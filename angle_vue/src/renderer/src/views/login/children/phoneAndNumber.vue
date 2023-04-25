<template>
	<FormItem name="phone" :rules="phoneRules">
		<Input
			v-model:value="formState.phone"
			:placeholder="phonePlaceholder"
			@input="handleInputChange('phone')($event)"
			allowClear
		>
			<template #prefix>
				<MobileOutlined class="site-form-item-icon" />
			</template>
		</Input>
	</FormItem>
	<FormItem name="SMSCode" :rules="SMSCodeRules">
		<InputSearch
			v-model:value="formState.SMSCode"
			:placeholder="verCodePlaceholder"
			@search="onSMSCode"
		>
			<template #enterButton>
				<Button type="primary" :loading="sendLoading">{{
					t('login.Get verification code')
				}}</Button>
			</template>
		</InputSearch>
	</FormItem>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, reactive, watch } from 'vue';
import { Input, FormItem, InputSearch, Button } from 'ant-design-vue';
import { useI18n } from '@renderer/i18n';
import { MobileOutlined } from '@ant-design/icons-vue';
import { UserForm } from '@renderer/views/login/model';
import { Rule } from 'ant-design-vue/es/form';
import { resetPssword } from '@renderer/api';
import { resultPrompt } from '@renderer/utils/custom';

const { t } = useI18n();
const $emit = defineEmits(['update:data']);
const props = defineProps({
	data: {
		type: Object as () => UserForm,
		default: () => ({
			phone: '', // phone
			SMSCode: ''
		})
	}
});
const formState = reactive({
	phone: props.data?.phone,
	SMSCode: props.data?.SMSCode
});
const sendLoading = ref(false);
const phonePlaceholder = t('login.Mobile number');
const verCodePlaceholder = t('login.SMS verification code');
const phoneRules = [
	{
		required: true,
		validator: (_rule: Rule, value: string) => {
			if (!value) {
				return Promise.reject(t('login.Please enter your mobile phone number!'));
			}
			const regExp = /^(?:(?:\+|00)86)?1\d{10}$/;
			if (!regExp.test(value)) {
				return Promise.reject(t('login.Please enter the phone number in the correct format'));
			}
			return Promise.resolve();
		}
	}
];
const SMSCodeRules = [
	{ required: true, message: t('login.Please enter the verification code!') },
	{ min: 4, max: 4, message: t('login.Verify to 4 bits') }
];
// 提取输入框值变化的处理函数
function handleInputChange(name: string) {
	return (e: Event) => {
		formState[name] = e.target?.['value'].replace(/\s+/g, '');
	};
}
// 请求验证码
const onSMSCode = async () => {
	try {
		sendLoading.value = true;
		const result = await resetPssword({
			phone: formState.phone,
			username: props.data?.username
		});
		resultPrompt(result, t('login.The SMS verification code is sent successfully'));
	} finally {
		sendLoading.value = false;
	}
};
// 监听输入参数变化
watch(
	() => formState,
	(newVal) => {
		$emit('update:data', newVal);
	},
	{ deep: true }
);
</script>
