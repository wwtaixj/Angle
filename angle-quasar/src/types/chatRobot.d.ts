declare namespace ChatRobot {
  interface FileObject {
    url: string;
    id: string;
    bytes: number;
    created_at: number;
    filename: string;
    object: 'file';
    purpose:
      | 'fine-tune'
      | 'fine-tune-results'
      | 'assistants'
      | 'assistants_output';
  }
  export type ChatCompletionContentPart = {
    type: 'text' | 'image_url';
    text?: string;
    image_url?: {
      url: string;
      detail: 'auto' | 'full' | 'large' | 'medium' | 'small' | 'thumb';
    };
  };
  type Chat = ChatRobotListTable;
  type Type = 'text' | 'image' | 'tools' | 'logprobs';
  export type Model =
    | 'gpt-3.5-turbo'
    | 'gpt-4'
    | 'dall-e-3'
    | 'gpt-4-vision-preview'
    | 'gpt-4-1106-preview';
  interface ChatRobotModel {
    label: string;
    value: Model;
    description?: string;
    avatar: string;
  }
  export interface ChatRobotHistoryTable {
    messageId: string;
    message: string;
    sent: boolean;
    conversationOptions: string | null;
    requestOptions: string | null;
    timestamp: number;
    error: boolean;
  }
  export interface ChatRobotListTable {
    title: string;
    chatId: string;
    model: Model;
    timestamp: number;
    avatar: string;
    usingContext: boolean; // 是否使用上下文
    serialNumber: number;
  }
  export interface Message {
    messageId: string;
    sent: boolean;
    avatar: string;
    text: any[];
    status?: string;
    loading?: boolean;
    error?: boolean;
    timestamp: number;
    textHtml?: boolean;
    isMarkdown?: boolean;
    conversationOptions?: ConversationRequest | null;
    requestOptions?: { prompt: string; options?: ConversationRequest | null };
  }
  interface ChatState {
    active: Chat | null;
    activeMssage: Message[];
    chatList: Chat[];
    model: Chat['model'];
    xSplitter: number;
    ySplitter: number;
    role: string;
    maxWidth: string;
  }

  interface ConversationRequest {
    conversationId?: string;
    parentMessageId?: string;
    fileIds?: string[];
    threadId?: string;
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
