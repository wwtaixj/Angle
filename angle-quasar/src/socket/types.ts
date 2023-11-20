import { ChatHistoryTable } from '@/db';

export interface CreateSoket {
  url: string;
  token: string;
  username: string;
  userId: string;
}

export type TransmissionBody = ChatHistoryTable;
