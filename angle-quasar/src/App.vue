<!--
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-12 11:08:01
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-19 15:19:02
 * @FilePath: \angle-quasar\src\App.vue
-->
<template>
  <router-view />
</template>

<script setup lang="ts">
import { useUserStore } from './stores/userStore';
useUserStore().initUserStore();
</script>
