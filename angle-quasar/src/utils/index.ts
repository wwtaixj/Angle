/* eslint-disable @typescript-eslint/no-explicit-any */
import { notify } from './message';
import { QNotifyCreateOptions } from 'quasar';
import type { App, Plugin } from 'vue';
import { Response } from '@/axios/typings';
import { isObject } from './is';

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
  options: QNotifyCreateOptions | boolean,
  succeedFun?: (arg0: Response<T>) => void
) {
  if (
    result.hasOwnProperty('status') &&
    result.status &&
    result.status.toString() === '0'
  ) {
    if (isObject(options) && options.message) {
      notify({
        type: 'positive',
        ...options,
      });
    }

    if (!succeedFun) return;
    succeedFun(result);
  }
}

/**
 * 复制文本
 * @param options
 */
export function copyText(options: { text: string; origin?: boolean }) {
  const props = { origin: true, ...options };

  let input: HTMLInputElement | HTMLTextAreaElement;

  if (props.origin) input = document.createElement('textarea');
  else input = document.createElement('input');

  input.setAttribute('readonly', 'readonly');
  input.value = props.text;
  document.body.appendChild(input);
  input.select();
  if (document.execCommand('copy')) document.execCommand('copy');
  document.body.removeChild(input);
}
/**
 * 数组移动到顶部
 * @param arr
 * @param index
 */
export function moveToTop(arr: any[], index: number) {
  if (index < 0 || index >= arr.length) {
    throw 'Invalid index';
  }

  const element = arr.splice(index, 1);
  arr.unshift(element[0]);
  return arr;
}
/**
 * 将小驼峰命名法（minWidth）转换为连字符命名法（min-width）
 * @param obj
 */
export function convertObjectPropertiesToHyphenCase<T = { [x: string]: any }>(
  obj: T
) {
  const hyphenCaseObj: T | { [x: string]: any } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const hyphenCaseKey = key
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase();
      hyphenCaseObj[hyphenCaseKey] = obj[key];
    }
  }
  return hyphenCaseObj as T;
}
export * from './cryptoJs';
export * from './is';
export * from './message';
export * from './webStorage';
export * from './timer';
export * from './navigator';
export * from './date';
