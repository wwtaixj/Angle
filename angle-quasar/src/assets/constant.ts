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

export function getModelList(): ChatRobot.ChatRobotModel[] {
  return [
    {
      label: 'gpt-3.5-turbo',
      value: 'gpt-3.5-turbo',
      description: 'Currently points to gpt-3.5-turbo-0613.',
    },
    {
      label: 'gpt-3.5-turbo-16k',
      value: 'gpt-3.5-turbo-16k',
      description: '更长令牌的gpt-3.5-turbo.',
    },
    {
      label: 'gpt-4',
      value: 'gpt-4',
      description:
        'Currently points to gpt-4-0613. See continuous model upgrades.',
    },
    {
      label: 'gpt-4-32k',
      value: 'gpt-4-32k',
      description: '更长令牌的gpt-4.',
    },
  ];
}
