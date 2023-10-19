/*
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-16 17:01:19
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-16 17:03:44
 * @FilePath: \angle-quasar\src\stores\typings\chat.d.ts
 */
export interface Chat {
  id: number;
  name: string;
  avatar: string;
  caption: string;
  time: string;
  sent?: boolean;
  deleted?: boolean;
}
