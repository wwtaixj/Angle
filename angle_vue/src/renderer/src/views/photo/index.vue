<template>
  <div class="photo">
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
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import XMenu from '../../components/XMenu.vue';
import { HomeOutlined, LikeOutlined, HeartOutlined, UploadOutlined } from '@ant-design/icons-vue';
import { MenuItem } from '@renderer/components/model';

const menuList = ref<MenuItem[]>([]);
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
      (i): MenuItem => ({
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
