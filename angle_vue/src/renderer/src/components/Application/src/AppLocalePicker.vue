<template>
  <Dropdown :trigger="['hover']" placement="bottom">
    <TranslationOutlined style="color: white; color: 1rem" />
    <template #overlay>
      <XMenu
        v-model:current="current"
        :menu-config="menuConfig"
        :menu-list="menuList"
        @click="menuClick"
      >
      </XMenu>
    </template>
  </Dropdown>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Dropdown } from 'ant-design-vue';
import XMenu from '@renderer/components/custom/XMenu.vue';
import { TranslationOutlined } from '@ant-design/icons-vue';
import { XMenuItem } from '@renderer/components/model';

const menuConfig = reactive({
  mode: 'inline',
  theme: 'dark'
});
const menuList = ref<XMenuItem[]>([
  {
    key: 'zh-cn',
    title: '简体中文'
  },
  {
    key: 'en-us',
    title: 'English'
  }
]);
const current = ref<[]>(); // 当前选中语言
const menuClick = async ({ key }) => {};
</script>
<style lang="less" scoped></style>
