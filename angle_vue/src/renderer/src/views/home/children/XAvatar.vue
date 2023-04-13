<template>
  <a-dropdown v-model:visible="visible" :trigger="['hover']" placement="bottom">
    <a-badge :count="1"
      ><a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 40, xl: 40, xxl: 40 }" shape="square">
        <template #icon>
          <AntDesignOutlined />
        </template> </a-avatar
    ></a-badge>
    <template #overlay>
      <XMenu
        v-model:current="current"
        :menu-config="menuConfig"
        :menu-list="menuList"
        class="menu"
        @select="headerSelect"
      >
        <template #browsePhoto>
          <HomeOutlined />
        </template>
        <template #angellPhoto>
          <HeartOutlined />
        </template>
        <template #gradePhoto>
          <LikeOutlined />
        </template>
        <template #uploadPhoto>
          <UploadOutlined />
        </template>
      </XMenu>
    </template>
  </a-dropdown>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import XMenu from '@renderer/components/XMenu.vue';
import { HomeOutlined, LikeOutlined, HeartOutlined, UploadOutlined } from '@ant-design/icons-vue';
import { MenuItem } from '@renderer/components/model';

const visible = ref(false);
const menuList = ref<MenuItem[]>([]);
const current = ref<string[]>([]);
const menuConfig = reactive({
  mode: 'inline',
  theme: 'light'
});

const headerSelect = () => {};
</script>
