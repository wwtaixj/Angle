import { useI18n } from '@/boot/i18n';
import { SideListKeyEnum } from '@/enums/main';

const { t } = useI18n();

export function getSideList() {
  return [
    { key: SideListKeyEnum.CHAT, icon: 'question_answer', text: t('Chat') },
    {
      key: SideListKeyEnum.PHOTO,
      icon: 'photo_library',
      text: t('photo.PhotoAlbum'),
    },
  ];
}
