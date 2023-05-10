<template>
  <Layout class="photo-mobile-layout">
    <LayoutHeader>
      <menu-unfold-outlined v-if="visible" class="trigger" @click="() => (visible = !visible)" />
      <menu-fold-outlined v-else class="trigger" @click="() => (visible = !visible)" />
    </LayoutHeader>
    <!-- router-view -->
    <LayoutContent>
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component :is="Component" v-if="route.meta.keepAlive" :key="route.fullPath"> </component>
        </keep-alive>
        <component :is="Component" v-if="!route.meta.keepAlive" :key="route.fullPath" />
      </router-view>
    </LayoutContent>
    <Drawer
      width="200"
      class="photo-mobile-drawer"
      :placement="placement"
      :closable="false"
      :visible="visible"
      @close="onClose"
    >
      <Divider />
      <Button type="text" block @click="addImageFolder"
        ><template #icon><FolderAddOutlined /></template>{{ t('photo.addFolder') }}</Button
      >
      <Divider />
    </Drawer>
  </Layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  Drawer,
  Button,
  Divider,
  Row,
  Col
} from 'ant-design-vue';
import { MenuUnfoldOutlined, MenuFoldOutlined, FolderAddOutlined } from '@ant-design/icons-vue';
import type { DrawerProps } from 'ant-design-vue';
import { t } from '@renderer/i18n';

const visible = ref(false);
const placement = ref<DrawerProps['placement']>('left');
const addImageFolder = () => {};
const onClose = () => {
  visible.value = false;
};
</script>
<style lang="less" scoped>
.photo-mobile-drawer {
  .ant-divider-horizontal {
    margin: 10px 0;
  }
  .ant-btn {
    font-size: 16px;
    font-weight: 500;
  }
}
.photo-mobile-layout {
  height: 100%;

  .ant-layout-header {
    background-color: white;
    padding: 0;
    position: fixed;
    z-index: 1;
    width: 100%;
    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
    }

    .trigger:hover {
      color: #1890ff;
    }
  }
}
</style>
