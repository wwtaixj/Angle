import { notify } from './message';
import { QNotifyCreateOptions } from 'quasar';
import type { App, Plugin } from 'vue';
import { Response } from '@/axios/typings';

declare type TargetContext = '_self' | '_blank';

export const withInstall = <T = unknown>(component: T, alias?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const comp = component as any;
  comp.install = (app: App) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    app.component(comp.name || comp.displayName, component as any);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};

export function openWindow(
  url: string,
  opt?: {
    target?: TargetContext | string;
    noopener?: boolean;
    noreferrer?: boolean;
  }
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}

export function resultPrompt<T>(
  result: Response<T>,
  options: QNotifyCreateOptions,
  succeedFun?: (arg0: Response<T>) => void
) {
  if (
    result.hasOwnProperty('status') &&
    result.status &&
    result.status.toString() === '0'
  ) {
    notify({
      type: 'positive',
      ...options,
    });
    if (!succeedFun) return;
    succeedFun(result);
  }
}

export * from './cryptoJs';
export * from './is';
export * from './message';
export * from './webStorage';
export * from './timer';
export * from './navigator';
export * from './date';
