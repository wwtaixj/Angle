<template>
  <XMenu
    v-model:current="current"
    :menu-config="menuConfig"
    :menu-list="menuList"
    @select="headerSelect"
    @click="headerClick"
  >
    <template #chatGpticon>
      <AliwangwangOutlined />
    </template>
    <template #photoicon>
      <PictureOutlined />
    </template>
    <template #abouticon>
      <SmileOutlined />
    </template>
  </XMenu>
</template>
<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import XMenu from '@renderer/components/custom/XMenu.vue';
import { AliwangwangOutlined, PictureOutlined, SmileOutlined } from '@ant-design/icons-vue';
import { XMenuItem } from '@renderer/components/model';

const props = defineProps({
  menuConfig: {
    type: Object,
    default: () => ({
      mode: 'inline',
      theme: 'dark'
    })
  },
  smallMenu: {
    type: Boolean,
    default: false
  }
});
const router = useRouter();
const menuList = ref<XMenuItem[]>([]);
const current = ref<string[]>([]);
const currentRoute = router.currentRoute;
const parentName = currentRoute.value.path.split('/')[1];

const initPage = (): void => {
  setMenuConfig();
};
const setMenuConfig = (): void => {
  const routerList = router.getRoutes();
  const parentChildren = routerList.find((i) => i.name === parentName)?.children;
  const menuName = currentRoute.value.path.split('/')[2];
  if (!menuName) return;
  current.value[0] = menuName; // 当前路由name
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
  if (!props.smallMenu) goToPhotoRouter(key);
};
const headerClick = ({ key }): void => {
  if (props.smallMenu) {
    current.value[0] = key;
    goToPhotoRouter(key);
  }
};
// photo模块路由跳转
const goToPhotoRouter = (key: string): void => {
  router.push(`/${parentName}/${key}`);
};
initPage();
</script>
<style lang="less" scoped></style>
