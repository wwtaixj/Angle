//import type { ChatMessage } from '../utils/chatGPT';
import type { ChatRobotRequest } from '../types';
import {
  chatConfig,
  chatReplyProcess,
  uploadFile,
  chatAssistantsProcess,
  chatImageProcess,
} from '../utils/chatGPT';
import { GlobalResponse, GlobalRequest } from '@/types';
import OpenAI from 'openai';
import { decrypt, formatDate, useLogger } from '@/utils';
import type { sendOptions } from '../controller/types';

const logger = useLogger('aiChat');

/**
 * 发送对话
 * @param req
 * @param res
 */
export const chatProcess = async (
  req: GlobalRequest<ChatRobotRequest>,
  res: GlobalResponse<null>
) => {
  res.setHeader('Content-type', 'application/octet-stream');
  try {
    const { prompt, options, systemMessage, model, type } = req.body;
    let firstChunk = true;
    const username = decrypt(req.headers.username as string);
    const token = req.headers.token as string;
    const params: sendOptions = {
      message: prompt,
      lastContext: options,
      process: (chat) => {
        res.write(
          firstChunk ? JSON.stringify(chat) : `\n${JSON.stringify(chat)}`
        );
        firstChunk = false;
      },
      systemMessage,
      model,
      type,
    };
    const { process, lastContext, ...logs } = params;
    logger.info('chatProcess', JSON.stringify(logs));
    if (options.fileIds) {
      await chatAssistantsProcess({
        ...params,
        assistantsName: username + '_' + token + formatDate(),
      });
    } else if (model.includes('dall-e')) {
      await chatImageProcess(params);
    } else {
      await chatReplyProcess(params);
    }
  } catch (error) {
    res.write(JSON.stringify(error));
  } finally {
    res.end();
  }
};

/**
 * 返回openai账号配置
 * @param req
 * @param res
 */
export const config = async (req, res) => {
  try {
    const response = await chatConfig();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

export async function uploadImage(
  req: GlobalRequest<any>,
  res: GlobalResponse<{ url: string }>
) {
  try {
    const filename = `${req.file.filename}`;
    const url =
      `http://${process.env.UPLOAD_URL}:${process.env.LISTEN_PORT}/upload/images/chat/` +
      filename;
    console.log(url);
    res.send({
      status: '0',
      message: '上传成功！',
      data: {
        url,
      },
    });
  } catch (e) {
    console.log('uploadPhoto api error:' + e);
    res.send({
      status: '-1',
      message: e.message,
      data: null,
    });
  }
}
export async function ChatUploadFile(
  req: GlobalRequest<any>,
  res: GlobalResponse<OpenAI.FileObject & { url: string }>
) {
  try {
    const filename = `${req.file.filename}`;
    const url =
      `http://${process.env.UPLOAD_URL}:${process.env.LISTEN_PORT}/upload/files/chat/` +
      filename;

    const file = await uploadFile({
      path: '/public/upload/files/chat/' + filename,
    });
    res.send({
      status: '0',
      message: '上传成功！',
      data: {
        url,
        ...file,
      },
    });
  } catch (e) {
    console.log('uploadPhoto api error:' + e);
    res.send({
      status: '-1',
      message: e.message,
      data: null,
    });
  }
}
