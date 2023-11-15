import { withInstall } from '@/utils';
import { QChatMessageProps, QChatMessageSlots } from 'quasar';
import ChatMessage from './Index.vue';

export const XChatMessage = withInstall(ChatMessage);

export type XChatMessageProps = QChatMessageProps;
export type XChatMessageSlots = QChatMessageSlots;
