/* eslint-disable @typescript-eslint/no-explicit-any */
import { withInstall } from '@/utils';
import MessagePage from './Index.vue';
import { QBtnProps } from 'quasar';

export const XMessagePage = withInstall(MessagePage);
export interface MessageTool extends QBtnProps {
  icon: string;
}
export interface MessageItem {
  sent: boolean;
  avatar: string;
  text: any[];
  status?: string;
  loading?: boolean;
  timestamp?: number;
}
export interface XMessagePageProps {
  Tools?: MessageTool[];
  items: MessageItem[];
}
