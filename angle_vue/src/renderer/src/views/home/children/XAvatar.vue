<template>
  <a-dropdown v-model:visible="visible" :trigger="['hover']" placement="bottom">
    <a-badge :count="1"
      ><a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 40, xl: 40, xxl: 40 }" shape="square">
        <template #icon>
          <a-image
            src="https://zos.-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
            :preview="false"
            fallback="/src/assets/images/avatar32.png"
          >
            <template #placeholder>
              <UserOutlined />
            </template>
          </a-image>
        </template> </a-avatar
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
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from '@renderer/i18n';
import XMenu from '@renderer/components/XMenu.vue';
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons-vue';
import { sStorage } from '@renderer/assets/public/webStorage';
import { MenuItem } from '@renderer/components/model';

const router = useRouter();
const { t } = useI18n();
const visible = ref(false);
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
  if (key === 'signOut') signOut();
  if (key === 'accountInformation') openAccountInformation;
  console.log(key);
};
const openAccountInformation = () => {};
const signOut = () => {
  sStorage.clear();
  router.push('/');
};
</script>
