declare namespace ChatRobot {
  interface Chat {
    title: string;
    id: string;
    model: string;
  }
  export interface ChatRobotHistoryTable {
    message: string;
    sent: boolean;
    conversationOptions?: ConversationRequest;
    requestOptions?: { prompt: string; options?: ConversationRequest | null };
    timestamp: number;
    error?: boolean;
  }

  interface ChatState {
    active: Chat | null;
    activeMssage: ChatRobotHistoryTable[];
    chatList: Chat[];
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
