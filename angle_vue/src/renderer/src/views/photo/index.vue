<template>
  <div class="photo">
    <template v-if="!isMobile">
      <XMenu
        v-model:current="current"
        :menu-config="menuConfig"
        :menu-list="menuList"
        class="menu"
        @select="headerSelect"
      >
        <template #browsePhotoicon>
          <HomeOutlined />
        </template>
        <template #angellPhotoicon>
          <HeartOutlined />
        </template>
        <template #gradePhotoicon>
          <LikeOutlined />
        </template>
        <template #uploadPhotoicon>
          <UploadOutlined />
        </template>
      </XMenu>
      <router-view></router-view>
    </template>
    <PhotoMobileLayout v-else />
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import XMenu from '../../components/custom/XMenu.vue';
import PhotoMobileLayout from './children/PhotoMobileLayout.vue';
import { HomeOutlined, LikeOutlined, HeartOutlined, UploadOutlined } from '@ant-design/icons-vue';
import { XMenuItem } from '@renderer/components/model';
import { useBasicLayout } from '@renderer/hooks/useBasicLayout';

const { isMobile } = useBasicLayout();
const menuList = ref<XMenuItem[]>([]);
const current = ref<string[]>([]);
const menuConfig = reactive({
  mode: 'horizontal',
  theme: 'light'
});

const router = useRouter();
const currentRoute = router.currentRoute;
const parentName = currentRoute.value.path.split('/');

const initPage = (): void => {
  setMenuConfig();
};
const setMenuConfig = (): void => {
  const routerList = router.getRoutes();
  const parentChildren = routerList.find((i) => i.name === parentName[2])?.children;
  if (!currentRoute.value.name) return;
  current.value[0] = <string>currentRoute.value.name; // 当前路由name
  if (!parentChildren) return;
  menuList.value = parentChildren
    ?.filter((i) => i.component)
    .map(
      (i): XMenuItem => ({
        key: <string>i.name,
        title: <string>i?.meta?.name
      })
    );
};
const headerSelect = ({ key }): void => {
  goToPhotoRouter(key);
};
// photo模块路由跳转
const goToPhotoRouter = (key: string): void => {
  router.push(`/${parentName[1]}/${parentName[2]}/${key}`);
};
initPage();
</script>
<style lang="less" scoped>
.photo {
  .menu {
    background-image: url('../../assets/images/Beautiful Love.png');
    background-size: contain;
    :deep(.ant-menu) {
      background: transparent;
    }
  }
}
</style>
