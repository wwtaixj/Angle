<template>
  <a-modal
    v-model:visible="modelVisible"
    :ok-text="t('Ok')"
    :cancel-text="t('Cancel')"
    :after-close="afterClose"
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
  </a-modal>
</template>
<script lang="ts" setup>
import { ref, defineProps, computed, defineEmits } from 'vue';
import { IdcardOutlined, UnlockOutlined } from '@ant-design/icons-vue';
import XTabs from '@renderer/components/XTabs.vue';
import { useI18n } from '@renderer/i18n';
import { useUserStore } from '@renderer/store/userStore';
import changePssword from './changePssword.vue';
import userInformation from './userInformation.vue';
import { updateApiData } from '@renderer/apis/service';
import request_url from '@renderer/apis/request_url';
import { resultPrompt } from '@renderer/assets/public';
import { TabsPaneItem } from '@renderer/components/model';
import { UserForm } from '@renderer/views/login/model';
import { encrypt } from '@renderer/assets/public/cryptoJs';

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
const userData = ref({
  userName: userStore.getUserName,
  phone: userStore.getPhone,
  age: userStore.getAge,
  gender: userStore.getGender,
  avatarUrl: userStore.getAvatarUrl,
  label: userStore.getLabel
});
const editUser = async () => {
  console.log(userData.value);
  const result = await updateApiData(request_url.user, userData.value);
  resultPrompt(result.data, t('The user information is modified successfully'));
};

// 修改密码
const changeRef = ref();
const changePassword = async () => {
  changeRef?.value.$refs.changePasswordRef.validate().then(async (user: UserForm) => {
    delete user.againNewPassword;
    const result = await updateApiData(request_url.changePssword, {
      username: encrypt(user.username),
      password: encrypt(user.password),
      newPassword: encrypt(user.newPassword)
    });
    resultPrompt(result.data, t('The user information is modified successfully'));
  });
};
const okModal = () => {
  if (activeKey.value === 'information') {
    editUser();
    return;
  }
  if (activeKey.value === 'changePassword') {
    changePassword();
    return;
  }
  // modelVisible.value = false;
};
const afterClose = () => {
  changeRef?.value?.$refs?.changePasswordRef.resetFields();
};
</script>
