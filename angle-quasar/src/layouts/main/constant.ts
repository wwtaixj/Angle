import { useI18n } from '@/boot/i18n';
import { SideListKeyEnum } from '@/enums/main';

const { t } = useI18n();
interface SideList {
  key: SideListKeyEnum;
  icon: string;
  label: string;
  class?: string;
  router?: boolean;
}

export function getSideList(): SideList[] {
  return [
    {
      key: SideListKeyEnum.CHAT,
      icon: 'fa-regular fa-comment',
      label: t('Chat'),
      class: 'col-2',
      router: true,
    },
    {
      key: SideListKeyEnum.FRIENDS,
      icon: 'fa-regular fa-user',
      label: '通讯录',
      class: 'col-2',
      router: true,
    },
    {
      key: SideListKeyEnum.CHAT_ROBOT,
      icon: 'fa-brands fa-bots',
      label: 'AI聊天',
      class: 'col-2',
      router: true,
    },
    {
      key: SideListKeyEnum.PHOTO,
      icon: 'fa-regular fa-image',
      label: t('photo.PhotoAlbum'),
      class: 'col-2',
    },
  ];
}
