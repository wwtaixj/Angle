declare namespace ChatRobot {
  interface Chat {
    title: string;
    id: string;
    model: string;
    timestamp: number;
    avatar: string;
  }
  interface ChatRobotModel {
    label: string;
    value: string;
    description?: string;
    avatar: string;
  }
  export interface ChatRobotHistoryTable {
    message: string;
    sent: boolean;
    conversationOptions: string | null;
    requestOptions: string | null;
    timestamp: number;
    error: boolean;
  }
  export interface Message {
    sent: boolean;
    avatar: string;
    text: any[];
    status?: string;
    loading?: boolean;
    error?: boolean;
    timestamp: number;
    textHtml?: boolean;
    conversationOptions?: ConversationRequest | null;
    requestOptions?: { prompt: string; options?: ConversationRequest | null };
  }
  interface ChatState {
    active: Chat | null;
    activeMssage: Message[];
    chatList: Chat[];
    model: Chat['model'];
    usingContext: boolean;
  }

  interface ConversationRequest {
    conversationId?: string;
    parentMessageId?: string;
  }

  interface ConversationResponse {
    conversationId: string;
    detail: {
      choices: {
        finish_reason: string;
        index: number;
        logprobs: any;
        text: string;
      }[];
      created: number;
      id: string;
      model: string;
      object: string;
      usage: {
        completion_tokens: number;
        prompt_tokens: number;
        total_tokens: number;
      };
    };
    id: string;
    parentMessageId: string;
    role: string;
    text: string;
  }
}
