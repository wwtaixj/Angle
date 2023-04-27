<template>
  <div class="app-locale-picker">
    <Dropdown :trigger="['hover']" placement="bottom">
      <TranslationOutlined :style="`color: ${color}; font-size: ${size}`" />
      <template #overlay>
        <XMenu
          v-model:current="language"
          :menu-config="menuConfig"
          :menu-list="menuList"
          @click="menuClick"
        >
        </XMenu>
      </template>
    </Dropdown>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, defineProps } from 'vue';
import { Dropdown } from 'ant-design-vue';
import XMenu from '@renderer/components/custom/XMenu.vue';
import { TranslationOutlined } from '@ant-design/icons-vue';
import { XMenuItem } from '@renderer/components/model';
import { useAppStore } from '@renderer/store/app';

defineProps({
  color: {
    type: String,
    default: 'white'
  },
  size: {
    type: String,
    default: '1.5rem'
  }
});
const appStore = useAppStore();
const menuConfig = reactive({
  mode: 'inline',
  theme: 'light'
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
const language = computed(() => [appStore.language]); // 当前选中语言
const menuClick = async ({ key }) => {
  appStore.setLanguage(key);
};
</script>
<style lang="less" scoped></style>
