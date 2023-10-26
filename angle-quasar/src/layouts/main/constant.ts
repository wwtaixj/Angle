/*
 * @Author: JX 761359511@qq.com
 * @Date: 2023-10-12 16:18:44
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-26 10:36:14
 * @FilePath: \Angle\angle-quasar\src\layouts\main\constant.ts
 */
import { useI18n } from '@/boot/i18n';
import { SideListKeyEnum } from '@/enums/main';

const { t } = useI18n();

export function getSideList() {
  return [
    { key: SideListKeyEnum.CHAT, icon: 'web', text: t('photo.PhotoAlbum') },
  ];
}
