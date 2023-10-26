/*
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-20 11:45:00
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-20 11:45:03
 * @FilePath: \Angle\angle-quasar\src\utils\index.ts
 */
import type { App, Plugin } from 'vue';

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};
