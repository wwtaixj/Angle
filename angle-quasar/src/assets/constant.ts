import { useI18n } from '@/boot/i18n';
import { SideListKeyEnum } from '@/enums/main';
import chatGptImg from '@/assets/images/chatGpt-logo.jpg';

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
      description: '支持对话.',
      avatar: chatGptImg,
    },
    {
      label: 'gpt-4',
      value: 'gpt-4',
      description: '支持对话，上传文件，上传图片.',
      avatar: chatGptImg,
    },
    {
      label: 'gpt-4-vision-preview',
      value: 'gpt-4-vision-preview',
      description: '支持上传图片分析并生成文本.',
      avatar: chatGptImg,
    },
    {
      label: 'dall-e-3',
      value: 'dall-e-3',
      description: '支持根据提示创建具有特定尺寸的新图像，编辑图片.',
      avatar: chatGptImg,
    },
  ];
}

export function getImageHtml(url: string) {
  return `&nbsp;<div class="editor_image text-white row inline items-center" contenteditable="false">
  <img src="${url}">
  <i class="q-icon material-icons cursor-pointer" onclick="this.parentNode.parentNode.removeChild(this.parentNode)">
    close
  </i>
  </img>
</div>&nbsp;`;
}
