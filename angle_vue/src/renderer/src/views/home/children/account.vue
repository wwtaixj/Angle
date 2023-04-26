<template>
  <Modal
    v-model:visible="modelVisible"
    :ok-text="t('Ok')"
    :cancel-text="t('Cancel')"
    :after-close="afterClose"
    :confirm-loading="confirmLoading"
    @ok="okModal"
  >
    <XTabs v-model:activeKey="activeKey" :pane-list="paneList">
      <template #informationicon>
        <IdcardOutlined />
      </template>
      <template #informationcontent>
        <userInformation v-model:data="userData" />
      </template>
      <template #changePasswordicon>
        <UnlockOutlined />
      </template>
      <template #changePasswordcontent>
        <changePssword ref="changeRef" />
      </template>
    </XTabs>
  </Modal>
</template>
<script lang="ts" setup>
import { ref, defineProps, computed, defineEmits } from 'vue';
import { Modal } from 'ant-design-vue';
import { IdcardOutlined, UnlockOutlined } from '@ant-design/icons-vue';
import XTabs from '@renderer/components/custom/XTabs.vue';
import { useI18n } from '@renderer/i18n';
import { useUserStore } from '@renderer/store';
import changePssword from './changePssword.vue';
import userInformation from './userInformation.vue';
import { updateUser, updatePssword } from '@renderer/api';
import { resultPrompt } from '@renderer/utils/custom';
import { TabsPaneItem } from '@renderer/components/model';
import { UserForm } from '@renderer/views/login/helper';
import { encrypt } from '@renderer/utils/cryptoJs';

const userStore = useUserStore();
const { t } = useI18n();
const $emit = defineEmits(['update:visible']);
const props = defineProps({
  visible: {
    required: true,
    type: Boolean,
    default: false
  }
});
const confirmLoading = ref(false);
const modelVisible = computed({
  get() {
    return props.visible;
  },
  set(val) {
    $emit('update:visible', val);
  }
});

const paneList = ref<TabsPaneItem[]>([
  {
    key: 'information',
    name: t('Account information')
  },
  {
    key: 'changePassword',
    name: t('Change password')
  }
]);
const activeKey = ref(paneList.value[0].key);
const userData = ref<Omit<UserForm, 'password'>>({
  username: userStore.getUserName,
  phone: userStore.getPhone,
  age: userStore.getAge,
  gender: userStore.getGender,
  avatarUrl: userStore.getAvatarUrl,
  label: userStore.getLabel
});
// 修改用户信息
const editUser = async () => {
  const result = await updateUser({
    ...userData.value,
    username: encrypt(userData.value.username),
    phone: encrypt(userData.value.phone)
  });
  resultPrompt(result, t('The user information is modified successfully'), () => {
    userStore.setUserInfo(userData.value);
    modelVisible.value = false;
  });
};

// 修改密码
const changeRef = ref();
const changePassword = async () => {
  const user: UserForm = await changeRef?.value.$refs.changePasswordRef.validate();
  delete user.againNewPassword;
  const result = await updatePssword({
    username: encrypt(user.username),
    password: encrypt(user.password),
    newPassword: encrypt(user.newPassword)
  });
  resultPrompt(result, t('The user information is modified successfully'), () => {
    modelVisible.value = false;
  });
};
const okModal = async () => {
  confirmLoading.value = true;
  try {
    if (activeKey.value === 'information') {
      await editUser();
      return;
    }
    if (activeKey.value === 'changePassword') {
      await changePassword();
      return;
    }
  } finally {
    confirmLoading.value = false;
  }
};
const afterClose = () => {
  userData.value = {
    username: userStore.getUserName,
    phone: userStore.getPhone,
    age: userStore.getAge,
    gender: userStore.getGender,
    avatarUrl: userStore.getAvatarUrl,
    label: userStore.getLabel
  };
  changeRef?.value?.$refs?.changePasswordRef.resetFields();
};
</script>
