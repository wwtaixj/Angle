import { withInstall } from '@/utils';
import { QChatMessageProps, QChatMessageSlots } from 'quasar';
import ChatMessage from './Index.vue';

export const XChatMessage = withInstall(ChatMessage);

export interface XChatMessageProps extends QChatMessageProps {
  error?: boolean;
  loading?: boolean;
}
export type XChatMessageSlots = QChatMessageSlots;
