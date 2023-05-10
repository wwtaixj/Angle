<template>
  <Layout class="mobile-layout">
    <!-- router-view -->
    <LayoutContent>
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
          ><div class="footer-menu" @click="goTo('/home/chatGPT')()">
            <Badge :count="0"> <AliwangwangOutlined style="font-size: 1.5rem" /></Badge>
          </div>
          <div class="footer-title">{{ t('Chat') }}</div>
        </Col>
        <Col :span="8"
          ><div class="footer-menu" @click="goTo('/home/photo')()">
            <Badge :count="0"><PictureOutlined style="font-size: 1.5rem" /></Badge>
          </div>
          <div class="footer-title">{{ t('Picture') }}</div>
        </Col>
        <Col :span="8"
          ><div class="footer-menu" @click="goTo('/home/about')()">
            <Badge :count="0"><UserOutlined style="font-size: 1.5rem" /></Badge>
          </div>
          <div class="footer-title">{{ t('Me') }}</div></Col
        >
      </Row>
    </LayoutFooter>
  </Layout>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { Layout, LayoutContent, LayoutFooter, Row, Col, Badge } from 'ant-design-vue';
import { AliwangwangOutlined, PictureOutlined, UserOutlined } from '@ant-design/icons-vue';
import { t } from '@renderer/i18n';

const router = useRouter();
function goTo(path: string) {
  return () => {
    router.push(path);
  };
}
</script>
<style lang="less" scoped>
.mobile-layout {
  height: 100%;
  .ant-layout-content {
    height: 92vh !important;
  }
  .ant-layout-footer {
    padding: 0;
    height: 8vh;
    position: fixed;
    z-index: 1;
    width: 100%;
    bottom: 0;
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
