import type { ChatMessage } from '../utils/chatGPT';
import type { RequestProps } from '../types';
import { chatConfig, chatReplyProcess } from '../utils/chatGPT';

/**
 * 发送对话
 * @param req
 * @param res
 */
export const chatProcess = async (req, res) => {
  res.setHeader('Content-type', 'application/octet-stream');
  try {
    const { prompt, options = {}, systemMessage } = req.body as RequestProps;
    console.log('prompt' + prompt);
    let firstChunk = true;
    await chatReplyProcess({
      message: prompt,
      lastContext: options,
      process: (chat: ChatMessage) => {
        res.write(
          firstChunk ? JSON.stringify(chat) : `\n${JSON.stringify(chat)}`
        );
        firstChunk = false;
      },
      systemMessage,
    });
  } catch (error) {
    res.write(JSON.stringify(error));
  } finally {
    res.end();
  }
};
/**
 * 返回体
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
// export const verify = async (req, res) => {
//   try {
//     const { token } = req.body as { token: string };
//     if (!token) throw new Error('Secret key is empty');

//     res.send({ status: '0', message: 'Verify successfully', data: null });
//   } catch (error) {
//     res.send({ status: 'Fail', message: error.message, data: null });
//   }
// };
