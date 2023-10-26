/*
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-20 10:51:52
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-20 13:53:29
 * @FilePath: \Angle\angle-quasar\src\components\dialog\Index.ts
 */
import { withInstall } from '@/utils';
import Dialog from './Index.vue';

export const XDialog = withInstall(Dialog);

export enum DialogTypeEnum {
  NATIVE = 'native',
  CARD = 'card',
}
