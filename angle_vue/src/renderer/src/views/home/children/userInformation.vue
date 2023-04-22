<template>
  <a-row>
    <a-col :span="4" class="text-right">{{ t('login.Username') }}:</a-col>
    <a-col :span="20"
      ><a-typography-paragraph v-model:content="user.username" editable>
        <template #editableTooltip>{{ t('Click to edit text') }}</template>
      </a-typography-paragraph></a-col
    >
  </a-row>

  <a-row>
    <a-col :span="4" class="text-right">{{ t('Gender') }}:</a-col>
    <a-col :span="20">
      <a-typography-paragraph>
        <a-radio-group v-model:value="user.gender">
          <a-radio value="0">{{ t('Woman') }}</a-radio>
          <a-radio value="1">{{ t('Man') }}</a-radio>
        </a-radio-group>
      </a-typography-paragraph>
    </a-col>
  </a-row>
  <a-row>
    <a-col :span="4" class="text-right">{{ t('Age') }}:</a-col>
    <a-col :span="20">
      <a-typography-paragraph v-model:content="user.age" editable>
        <template #editableTooltip>{{ t('Click to edit text') }}</template>
        <template #editableEnterIcon="{ className }">
          <CheckOutlined :class="className" />
        </template>
      </a-typography-paragraph>
    </a-col>
  </a-row>
  <a-row>
    <a-col :span="4" class="text-right">{{ t('Phone') }}:</a-col>
    <a-col :span="20">
      <a-typography-paragraph v-model:content="user.phone" editable>
        <template #editableTooltip>{{ t('Click to edit text') }}</template>
        <template #editableEnterIcon="{ className }">
          <CheckOutlined :class="className" />
        </template>
      </a-typography-paragraph>
    </a-col>
  </a-row>
  <a-row>
    <a-col :span="4" class="text-right">{{ t('Avatar') }}:</a-col>
    <a-col :span="20">
      <a-typography-paragraph v-model:content="user.avatarUrl" editable>
        <template #editableTooltip>{{ t('Click to edit text') }}</template>
      </a-typography-paragraph>
    </a-col>
  </a-row>

  <a-row>
    <a-col :span="4" class="text-right">{{ t('Personality label') }}:</a-col>
    <a-col :span="20">
      <template v-for="tag in user.label?.split(',')" :key="tag">
        <a-tooltip v-if="tag.length > 10 && tag" :title="tag">
          <a-tag :closable="true" @close="handleClose(tag)" color="blue" style="margin-bottom: 8px">
            {{ `${tag.slice(0, 10)}...` }}
          </a-tag>
        </a-tooltip>
        <a-tag v-else-if="tag" :closable="true" color="blue" @close="handleClose(tag)">
          {{ tag }}
        </a-tag>
      </template>
      <a-input
        v-if="tagsInputVisible"
        ref="tagsInputRef"
        v-model:value="tagsInputValue"
        type="text"
        size="small"
        :style="{ width: '78px' }"
        @blur="tagsInputConfirm"
        @keyup.enter="tagsInputConfirm"
      />
      <a-tag v-else @click="showTagsInput">
        <PlusOutlined />
        New Tag
      </a-tag>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
import { ref, defineProps, computed, defineEmits, nextTick } from 'vue';
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
