/*
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-12 11:08:01
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-19 15:55:15
 * @FilePath: \Angle\angle-quasar\src\shims-vue.d.ts
 */
/* eslint-disable */

/// <reference types="vite/client" />

// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
