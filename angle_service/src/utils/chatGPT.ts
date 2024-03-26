import * as dotenv from 'dotenv';
import 'isomorphic-fetch';
import fs from 'fs';
import { join } from 'path';
import type {
  ChatGPTAPIOptions,
  ChatMessage,
  SendMessageOptions,
} from 'chatgpt';
import { ChatGPTAPI } from 'chatgpt';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import fetch from 'node-fetch';
import axios from 'axios';
import { sendResponse } from '.';
import { isNotEmptyString } from './is';
import OpenAI, { ClientOptions } from 'openai';
import type {
  ApiModel,
  ChatContext,
  ModelConfig,
  ChatMessageV1,
  ChatUploadFileOptions,
} from '../types';
import type { sendOptions } from '../controller/types';

dotenv.config();

const ErrorCodeMessage: Record<string, string> = {
  401: '[OpenAI] 提供错误的API密钥 | Incorrect API key provided',
  403: '[OpenAI] 服务器拒绝访问，请稍后再试 | Server refused to access, please try again later',
  502: '[OpenAI] 错误的网关 |  Bad Gateway',
  503: '[OpenAI] 服务器繁忙，请稍后再试 | Server is busy, please try again later',
  504: '[OpenAI] 网关超时 | Gateway Time-out',
  500: '[OpenAI] 服务器繁忙，请稍后再试 | Internal Server Error',
};

const timeoutMs: number = !isNaN(+process.env.TIMEOUT_MS)
  ? +process.env.TIMEOUT_MS
  : 30 * 1000;

let apiModel: ApiModel;

if (
  !isNotEmptyString(process.env.OPENAI_API_KEY) &&
  !isNotEmptyString(process.env.OPENAI_ACCESS_TOKEN)
)
  throw new Error(
    'Missing OPENAI_API_KEY or OPENAI_ACCESS_TOKEN environment variable'
  );

let chatgptApis: { [key in sendOptions['model']]: ChatGPTAPI } = {
  'gpt-3.5-turbo': null,
  'gpt-4': null,
  'gpt-4-vision-preview': null,
  'gpt-4-1106-preview': null,
  'dall-e-3': null,
};
let openai: OpenAI;

(async () => {
  // More Info: https://github.com/transitive-bullshit/chatgpt-api

  if (isNotEmptyString(process.env.OPENAI_API_KEY)) {
    for (const key of Object.keys(chatgptApis)) {
      const OPENAI_API_BASE_URL = process.env.OPENAI_API_BASE_URL;
      const model = isNotEmptyString(key) ? key : 'gpt-3.5-turbo';

      const options: ChatGPTAPIOptions = {
        apiKey: process.env.OPENAI_API_KEY,
        completionParams: { model },
        debug: true,
      };

      // increase max token limit if use gpt-4
      if (model.toLowerCase().includes('gpt-4')) {
        // if use 32k model
        if (model.toLowerCase().includes('32k')) {
          options.maxModelTokens = 32768;
          options.maxResponseTokens = 8192;
        } else {
          options.maxModelTokens = 8192;
          options.maxResponseTokens = 2048;
        }
      }

      if (isNotEmptyString(OPENAI_API_BASE_URL))
        options.apiBaseUrl = `${OPENAI_API_BASE_URL}/v1`;

      setupProxy(options);
      chatgptApis[key] = new ChatGPTAPI({ ...options });
    }
    apiModel = 'ChatGPTAPI';
    // openAi
    const openaiOptions: ClientOptions = {
      apiKey: process.env.OPENAI_API_KEY,
    };
    setupProxy(openaiOptions, true);
    openai = new OpenAI({ ...openaiOptions });
  }
})();

async function chatReplyProcess({
  message,
  lastContext,
  process,
  systemMessage,
  model,
  type,
}: sendOptions) {
  try {
    let options: SendMessageOptions = { timeoutMs },
      content: string | Array<OpenAI.ChatCompletionContentPart> = message;
    if (apiModel === 'ChatGPTAPI') {
      if (isNotEmptyString(systemMessage))
        options.systemMessage = systemMessage;
    }
    if (lastContext != null) {
      if (apiModel === 'ChatGPTAPI')
        options.parentMessageId = lastContext.parentMessageId;
      else options = { ...lastContext };
    }
    if (type !== 'text') {
      content = JSON.parse(content as string);
    }
    const response = await chatgptApis[model].sendMessage(content as string, {
      ...options,
      onProgress: (partialResponse) => {
        process?.(partialResponse);
      },
    });
    return sendResponse({ type: '0', data: response });
  } catch (error: any) {
    const code = error.statusCode;
    global.console.log(error);
    if (Reflect.has(ErrorCodeMessage, code))
      return sendResponse({ type: 'Fail', message: ErrorCodeMessage[code] });
    return sendResponse({
      type: 'Fail',
      message: error.message ?? 'Please check the back-end console',
    });
  }
}
/**
 * 创建助理并发送消息
 * @param params
 */
async function chatAssistantsProcess({
  message,
  lastContext,
  process,
  systemMessage,
  model,
  assistantsName,
}: sendOptions) {
  let assistant: OpenAI.Beta.Assistant,
    messages: OpenAI.Beta.Threads.MessagesPage,
    result: string;

  if (!lastContext.threadId) {
    // 创建助手
    assistant = await openai.beta.assistants.create({
      name: assistantsName,
      instructions: systemMessage,
      tools: [{ type: 'code_interpreter' }],
      model,
    });
  }
  // 创建线程
  const run = await openai.beta.threads.createAndRun({
    assistant_id: assistant.id,
    thread: {
      messages: [
        {
          role: 'user',
          content: message as string,
          file_ids: lastContext.fileIds,
        },
      ],
    },
  });

  while (true) {
    const retrieve = await openai.beta.threads.runs.retrieve(
      run.thread_id,
      run.id
    );
    messages = await openai.beta.threads.messages.list(run.thread_id, {
      order: 'asc',
    });
    const text = messages.data
      .filter((i) => i.role === 'assistant')
      .map((i) =>
        i.content
          .filter((j) => j.type === 'text')
          .map((j) => j['text'].value)
          .reduce((acc, cur) => acc + cur)
      )
      .join();

    process({
      text,
      id: run.id,
      role: 'assistant',
    });
    if (retrieve.status === 'completed') {
      break;
    }
  }

  return sendResponse({
    type: '0',
    data: {
      text: result,
      threadId: lastContext.threadId,
      id: run.id,
      role: 'assistant',
    },
  });
}
async function chatImageProcess({
  message,
  process,
  systemMessage,
  model,
  assistantsName,
}: sendOptions) {
  const image = await openai.images.generate({
    model,
    prompt: message,
  });

  process({
    text: image.data[0].revised_prompt,
    url: image.data[0].url,
    conversationId: '0',
    id: '0',
    role: 'assistant',
  });
  return sendResponse({
    type: '0',
    data: {
      url: image.data[0].url,
      text: image.data[0].revised_prompt,
      id: '0',
      role: 'assistant',
    },
  });
}

async function uploadFile(options: ChatUploadFileOptions) {
  const { file, path, ...args } = options;
  if (!file && !path) return;
  if (path) options.path = join(__dirname, `../../${path}`);
  return await openai.files.create({
    file: file ? file : fs.createReadStream(options.path),
    purpose: 'assistants',
    ...args,
  });
}
async function fetchBalance() {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const OPENAI_API_BASE_URL = process.env.OPENAI_API_BASE_URL;

  if (!isNotEmptyString(OPENAI_API_KEY)) return Promise.resolve('-');

  const API_BASE_URL = isNotEmptyString(OPENAI_API_BASE_URL)
    ? OPENAI_API_BASE_URL
    : 'https://api.openai.com';

  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    };
    const response = await axios.get(
      `${API_BASE_URL}/dashboard/billing/credit_grants`,
      { headers }
    );
    const balance = response.data.total_available ?? 0;
    return Promise.resolve(balance.toFixed(3));
  } catch {
    return Promise.resolve('-');
  }
}

async function chatConfig() {
  const balance = await fetchBalance();
  const httpsProxy = (process.env.HTTPS_PROXY || process.env.ALL_PROXY) ?? '-';
  const socksProxy =
    process.env.SOCKS_PROXY_HOST && process.env.SOCKS_PROXY_PORT
      ? `${process.env.SOCKS_PROXY_HOST}:${process.env.SOCKS_PROXY_PORT}`
      : '-';
  return sendResponse<ModelConfig>({
    type: '0',
    data: {
      apiModel,
      timeoutMs,
      socksProxy,
      httpsProxy,
      balance,
    },
  });
}

function setupProxy(
  options: ChatGPTAPIOptions | ClientOptions,
  isOpenai: boolean = false
) {
  if (process.env.SOCKS_PROXY_HOST && process.env.SOCKS_PROXY_PORT) {
    const agent = new SocksProxyAgent({
      hostname: process.env.SOCKS_PROXY_HOST,
      port: process.env.SOCKS_PROXY_PORT,
    });
    if (isOpenai) {
      (options as ClientOptions).httpAgent = agent;
      return;
    }
    options.fetch = (url, options) => {
      return fetch(url, { agent, ...options });
    };
  } else {
    if (process.env.HTTPS_PROXY || process.env.ALL_PROXY) {
      const httpsProxy = process.env.HTTPS_PROXY || process.env.ALL_PROXY;
      if (httpsProxy) {
        const agent = new HttpsProxyAgent(httpsProxy);
        if (isOpenai) {
          (options as ClientOptions).httpAgent = agent;
          return;
        }
        options.fetch = (url, options) => {
          return fetch(url, { agent, ...options });
        };
      }
    }
  }
}

function currentModel(): ApiModel {
  return apiModel;
}

export type { ChatContext, ChatMessage };

export {
  chatReplyProcess,
  chatConfig,
  currentModel,
  uploadFile,
  chatAssistantsProcess,
  chatImageProcess,
};
