<template>
	<Row>
		<Col :span="4" class="text-right">{{ t('login.Username') }}:</Col>
		<Col :span="20"
			><TypographyParagraph v-model:content="user.username" editable>
				<template #editableTooltip>{{ t('Click to edit text') }}</template>
			</TypographyParagraph></Col
		>
	</Row>

	<Row>
		<Col :span="4" class="text-right">{{ t('Gender') }}:</Col>
		<Col :span="20">
			<TypographyParagraph>
				<RadioGroup v-model:value="user.gender">
					<Radio value="0">{{ t('Woman') }}</Radio>
					<Radio value="1">{{ t('Man') }}</Radio>
				</RadioGroup>
			</TypographyParagraph>
		</Col>
	</Row>
	<Row>
		<Col :span="4" class="text-right">{{ t('Age') }}:</Col>
		<Col :span="20">
			<TypographyParagraph v-model:content="user.age" editable>
				<template #editableTooltip>{{ t('Click to edit text') }}</template>
				<template #editableEnterIcon="{ className }">
					<CheckOutlined :class="className" />
				</template>
			</TypographyParagraph>
		</Col>
	</Row>
	<Row>
		<Col :span="4" class="text-right">{{ t('Phone') }}:</Col>
		<Col :span="20">
			<TypographyParagraph v-model:content="user.phone" editable>
				<template #editableTooltip>{{ t('Click to edit text') }}</template>
				<template #editableEnterIcon="{ className }">
					<CheckOutlined :class="className" />
				</template>
			</TypographyParagraph>
		</Col>
	</Row>
	<Row>
		<Col :span="4" class="text-right">{{ t('Avatar') }}:</Col>
		<Col :span="20">
			<TypographyParagraph v-model:content="user.avatarUrl" editable>
				<template #editableTooltip>{{ t('Click to edit text') }}</template>
			</TypographyParagraph>
		</Col>
	</Row>

	<Row>
		<Col :span="4" class="text-right">{{ t('Personality label') }}:</Col>
		<Col :span="20">
			<template v-for="tag in user.label?.split(',')" :key="tag">
				<Tooltip v-if="tag.length > 10 && tag" :title="tag">
					<Tag :closable="true" @close="handleClose(tag)" color="blue" style="margin-bottom: 8px">
						{{ `${tag.slice(0, 10)}...` }}
					</Tag>
				</Tooltip>
				<Tag v-else-if="tag" :closable="true" color="blue" @close="handleClose(tag)">
					{{ tag }}
				</Tag>
			</template>
			<Input
				v-if="tagsInputVisible"
				ref="tagsInputRef"
				v-model:value="tagsInputValue"
				type="text"
				size="small"
				:style="{ width: '78px' }"
				@blur="tagsInputConfirm"
				@keyup.enter="tagsInputConfirm"
			/>
			<Tag v-else @click="showTagsInput">
				<PlusOutlined />
				New Tag
			</Tag>
		</Col>
	</Row>
</template>
<script lang="ts" setup>
import { ref, defineProps, computed, defineEmits, nextTick } from 'vue';
import {
	Row,
	Col,
	Tag,
	Input,
	Tooltip,
	TypographyParagraph,
	RadioGroup,
	Radio
} from 'ant-design-vue';
import { useI18n } from '@renderer/i18n';
import { CheckOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { UserForm } from '@renderer/views/login/model';

const { t } = useI18n();
const $emit = defineEmits(['update:data']);
const props = defineProps({
	data: {
		required: true,
		type: Object as () => Omit<UserForm, 'password'>,
		default: () => ({})
	}
});
const user = computed({
	get() {
		return new Proxy(props.data, {
			set(obj, name, val): boolean {
				$emit('update:data', {
					...obj,
					[name]: val
				});
				return true;
			}
		});
	},
	set(v) {
		$emit('update:data', v);
	}
});
const tagsInputVisible = ref(false);
const tagsInputValue = ref('');
const tagsInputRef = ref();
// 删除tag
const handleClose = (removedTag: string) => {
	const tags = user.value.label?.split(',').filter((tag) => tag !== removedTag);
	user.value.label = tags?.toString();
};
// 显示tag title输入框
const showTagsInput = () => {
	tagsInputVisible.value = true;
	nextTick(() => {
		tagsInputRef.value.focus();
	});
};
// 添加tag
const tagsInputConfirm = () => {
	const inputValue = tagsInputValue.value;
	let tags = user.value.label?.split(',') || [];
	if (inputValue && tags?.indexOf(inputValue) === -1) {
		tags = tags[0] && tags[0].length > 0 ? [...tags, inputValue] : [inputValue];
	}
	tagsInputVisible.value = false;
	tagsInputValue.value = '';
	user.value.label = tags?.toString();
};
</script>
