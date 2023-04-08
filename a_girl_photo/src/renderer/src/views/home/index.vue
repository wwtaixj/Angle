<template>
  <a-layout class="home">
    <a-layout-sider v-model:collapsed="collapsed" class="sider" :trigger="null" collapsible>
      <div class="logo">
        <a-space :size="4">
          <iconAixin1 v-show="!collapsed" size="30px" />
          <iconArtboard v-show="!collapsed" size="30px" />
          <iconHuluobu v-show="!collapsed" size="30px" />
          <iconShouhuituzi size="30px" />
        </a-space>
      </div>
      <homeMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view v-slot="{ Component, route }">
          <keep-alive>
            <component :is="Component" v-if="route.meta.keepAlive" :key="route.fullPath">
            </component>
          </keep-alive>
          <component :is="Component" v-if="!route.meta.keepAlive" :key="route.fullPath" />
        </router-view>
      </a-layout-content>
    </a-layout>
    <div class="small-menu">
      <a-dropdown v-model:visible="smallMenuVisible" :trigger="['click']" placement="top">
        <span class="small-menu-icon ant-avatar ant-avatar-circle ant-avatar-icon">
          <Transition>
            <FrownTwoTone v-show="!smallMenuVisible" />
          </Transition>
          <Transition>
            <SmileTwoTone v-show="smallMenuVisible" two-tone-color="#eb2f96" />
          </Transition>
        </span>
        <template #overlay>
          <homeMenu
            :menu-config="{
              mode: 'inline',
              theme: 'light'
            }"
            small-menu
          />
        </template>
      </a-dropdown>
    </div>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FrownTwoTone,
  SmileTwoTone
} from '@ant-design/icons-vue';
import iconAixin1 from '../../components/iconfont/iconAixin1.vue';
import iconArtboard from '../../components/iconfont/iconArtboard.vue';
import iconHuluobu from '../../components/iconfont/iconHuluobu.vue';
import iconShouhuituzi from '../../components/iconfont/iconShouhuituzi.vue';
import homeMenu from './children/homeMenu.vue';
import { ref } from 'vue';

const collapsed = ref(false);
const smallMenuVisible = ref(false);
</script>
<style lang="less" scoped>
.home {
  height: 100%;

  @media screen and(max-width: 750px) {
    .sider {
      display: none;
    }
    .header {
      display: none;
    }
    .content {
      margin: 0 !important;
    }
    .small-menu {
      position: fixed;
      left: 1rem;
      bottom: 10rem;
      z-index: 100;
      display: flex !important;
      flex-direction: column;
      cursor: pointer;
      .small-menu-icon {
        animation: rubberBand 1s; // rubberBand是animate.css辅助类
        font-size: 32px;
        color: #000;
        background-color: #fff;
        box-shadow: var(--shadow-card);
        transition: color 0.3s;
        // Transition 过渡动画
        .v-enter-active,
        .v-leave-active {
          transition: opacity 0.5s ease;
        }

        .v-enter-from,
        .v-leave-to {
          opacity: 0;
        }
      }
      .small-menu-icon:active {
        animation: none;
      }
    }
  }
  @media screen and(min-width: 751px) {
    .header {
      background: #fff;
      padding: 0;
    }
    .content {
      margin: 20px 16px;
      background: #fff;
      min-height: 280px;
    }
    .small-menu {
      display: none;
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
  }
}
</style>
