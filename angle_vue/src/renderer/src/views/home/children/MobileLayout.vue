<template>
  <Layout class="mobile-layout">
    <!-- header  -->
    <LayoutHeader class="">
      <HeaderComponent
        :using-context="usingContext"
        @export="handleExport"
        @toggle-using-context="toggleUsingContext"
      />
    </LayoutHeader>
    <!-- router-view -->
    <LayoutContent class="content">
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component :is="Component" v-if="route.meta.keepAlive" :key="route.fullPath"> </component>
        </keep-alive>
        <component :is="Component" v-if="!route.meta.keepAlive" :key="route.fullPath" />
      </router-view>
    </LayoutContent>
    <!-- footer  -->
    <LayoutFooter>
      <Row>
        <Col :span="8"
          ><div class="footer-menu">
            <Badge :count="1"> <AliwangwangOutlined style="font-size: 1.5rem" /></Badge>
          </div>
          <div class="footer-title">{{ t('Chat') }}</div>
        </Col>
        <Col :span="8"
          ><div class="footer-menu">
            <Badge :count="0"><PictureOutlined style="font-size: 1.5rem" /></Badge>
          </div>
          <div class="footer-title">{{ t('Picture') }}</div>
        </Col>
        <Col :span="8"
          ><div class="footer-menu">
            <Badge :count="0"><UserOutlined style="font-size: 1.5rem" /></Badge>
          </div>
          <div class="footer-title">{{ t('Me') }}</div></Col
        >
      </Row>
    </LayoutFooter>
  </Layout>
</template>
<script lang="ts" setup>
import { Layout, LayoutHeader, LayoutContent, LayoutFooter, Row, Col, Badge } from 'ant-design-vue';
import { AliwangwangOutlined, PictureOutlined, UserOutlined } from '@ant-design/icons-vue';
import HeaderComponent from '@renderer/views/chatGpt/components/Header/index.vue';
import { useUsingContext } from '@renderer/views/chatGpt/hooks/useUsingContext';
import { uesExport } from '@renderer/views/chatGpt/hooks/useExport';
import { t } from '@renderer/i18n';

const { usingContext, toggleUsingContext } = useUsingContext();
const { handleExport } = uesExport();
</script>
<style lang="less" scoped>
.mobile-layout {
  height: 100%;
  .ant-layout-footer {
    padding: 0;
    height: 4rem;
    .ant-row {
      .ant-col {
        padding: 0.5rem 3rem;
        .footer-menu {
          width: 100%;
          text-align: center;
        }
        .footer-title {
          width: 100%;
          text-align: center;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
