/* eslint-disable @typescript-eslint/no-explicit-any */
import { withInstall } from '@/utils';
//import { StyleValue } from 'vue';
import MessagePage from './Index.vue';
import { QEditorProps } from 'quasar';
import { XChatMessageProps } from '@/components';

export const XMessagePage = withInstall(MessagePage);
export type MessageEditor = Omit<
  QEditorProps,
  'modelValue' | 'minHeight' | 'maxHeight'
>;
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
  editor?: MessageEditor;
  items: MessageItem[];
  contextMenu?: XChatMessageProps['contextMenu'];
  isHtml?: boolean;
  splitter?: number;
}
export interface SendData {
  urls?: string[];
  text: string;
  html: string;
  files?: ChatRobot.FileObject[];
}
