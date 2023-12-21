/* eslint-disable @typescript-eslint/no-explicit-any */
import { withInstall } from '@/utils';
import { StyleValue } from 'vue';
import MessagePage from './Index.vue';
import { QBtnProps } from 'quasar';
import { XChatMessageProps } from '@/components';

export const XMessagePage = withInstall(MessagePage);
export interface MessageTool extends QBtnProps {
  icon: string;
  click: (e: MessageTool, index: number) => void;
  style?: StyleValue;
}
export interface MessageItem {
  sent: boolean;
  avatar: string;
  text: any[];
  status?: string;
  loading?: boolean;
  timestamp?: number;
  textHtml?: boolean;
}
export interface XMessagePageProps {
  tools?: MessageTool[];
  items: MessageItem[];
  contextMenu?: XChatMessageProps['contextMenu'];
}
