<template>
  <Layout v-if="!isMobile" class="home">
    <LayoutSider v-model:collapsed="collapsed" class="sider" :trigger="null" collapsible>
      <div class="logo">
        <Space :size="4">
          <iconAixin1 v-show="!collapsed" size="30px" />
          <iconArtboard v-show="!collapsed" size="30px" />
          <iconHuluobu v-show="!collapsed" size="30px" />
          <iconShouhuituzi size="30px" />
        </Space>
      </div>
      <homeMenu />
    </LayoutSider>
    <Layout>
      <!-- PC header tool -->
      <LayoutHeader class="header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <AppLocalePicker class="app-locale" color="balck" />
        <XAvatar class="user-avatar" />
      </LayoutHeader>
      <!-- router-view -->
      <LayoutContent class="content">
        <router-view v-slot="{ Component, route }">
          <keep-alive>
            <component :is="Component" v-if="route.meta.keepAlive" :key="route.fullPath">
            </component>
          </keep-alive>
          <component :is="Component" v-if="!route.meta.keepAlive" :key="route.fullPath" />
        </router-view>
      </LayoutContent>
    </Layout>
  </Layout>
  <!-- mobile menu button -->
  <MobileLayout v-else />
</template>
<script lang="ts" setup>
import { Layout, LayoutSider, LayoutHeader, LayoutContent, Space } from 'ant-design-vue';
import { ref } from 'vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import XAvatar from './children/XAvatar.vue';
import iconAixin1 from '@renderer/components/iconfont/iconAixin1.vue';
import iconArtboard from '@renderer/components/iconfont/iconArtboard.vue';
import iconHuluobu from '@renderer/components/iconfont/iconHuluobu.vue';
import iconShouhuituzi from '@renderer/components/iconfont/iconShouhuituzi.vue';
import homeMenu from './children/homeMenu.vue';
import { AppLocalePicker } from '@renderer/components/Application';
import { useBasicLayout } from '@renderer/hooks/useBasicLayout';
import MobileLayout from './children/MobileLayout.vue';

const { isMobile } = useBasicLayout();
const collapsed = ref(true);
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .header {
    background: #fff;
    padding: 0;
    .user-avatar {
      position: absolute;
      top: 0;
      right: 1rem;
    }
    .app-locale {
      position: absolute;
      top: 0;
      right: 5rem;
    }
  }
  .content {
    margin: 20px 16px;
    background: #fff;
    min-height: 280px;
  }

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

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }

  @media screen and(max-width: 640px) {
    .sider {
      display: none;
    }

    .header {
      display: none;
    }
    .content {
      margin: 0 !important;
    }
  }
}
</style>
