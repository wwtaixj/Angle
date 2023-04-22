<template>
  <a-dropdown :trigger="['hover']" placement="bottom">
    <a-badge :count="1"
      ><a-avatar
        :src="userStore.getAvatarUrl"
        :size="{ xs: 24, sm: 32, md: 40, lg: 40, xl: 40, xxl: 40 }"
        shape="square"
      >
        <template #icon> <UserOutlined /></template></a-avatar
    ></a-badge>
    <template #overlay>
      <XMenu
        v-model:current="current"
        :menu-config="menuConfig"
        :menu-list="menuList"
        class="menu"
        @click="headerClick"
      >
        <template #accountInformationicon>
          <UserOutlined />
        </template>
        <template #signOuticon>
          <PoweroffOutlined />
        </template>
      </XMenu>
    </template>
  </a-dropdown>
  <account v-model:visible="accountVisible" />
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useI18n } from '@renderer/i18n';
import XMenu from '@renderer/components/XMenu.vue';
import account from './account.vue';
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '@renderer/store/userStore';
import { MenuItem } from '@renderer/components/model';

const userStore = useUserStore();
const { t } = useI18n();
const accountVisible = ref(false);
const menuList = ref<MenuItem[]>([
  {
    key: 'accountInformation',
    title: t('Account information')
  },
  {
    key: 'signOut',
    title: t('Sign out')
  }
]);
const current = ref<string[]>([]);
const menuConfig = reactive({
  mode: 'inline',
  theme: 'light'
});

const headerClick = ({ key }) => {
  current.value[0] = key;
  if (key === 'signOut') userStore.loginOut();
  if (key === 'accountInformation') openAccountInformation();
};
const openAccountInformation = () => {
  accountVisible.value = true;
};
</script>
