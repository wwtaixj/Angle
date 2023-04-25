import * as dotenv from 'dotenv';
import { login } from '../controller/login';
import { uploadPhoto, upload } from '../controller/photo';
import express from 'express';
import {
  getAllUser,
  addUser,
  updateUser,
  deleteUser,
  changePassword,
} from '../controller/user';
import { authentication, apiPermission } from '../auth';
import type { RequestProps } from '../types';
import type { ChatMessage } from '../controller/chatGPT';
import {
  chatConfig,
  chatReplyProcess,
  currentModel,
} from '../controller/chatGPT';
import { limiter } from '../auth/limiter';
import { isNotEmptyString } from '../utils/is';

dotenv.config();

// 创建路由对象
const router = express.Router();

// 挂载路由规划
//login
router.post('/v1/login', login);
//user
router.get('/v1/user', authentication, apiPermission, getAllUser);
router.post('/v1/user', authentication, apiPermission, addUser);
router.put('/v1/user', authentication, apiPermission, updateUser);
router.delete('/v1/user', authentication, apiPermission, deleteUser);
router.put(
  '/v1/user/changePassword',
  authentication,
  apiPermission,
  changePassword
);
// photo
router.post(
  '/v1/uploadPhoto',
  authentication,
  apiPermission,
  upload.single('images'),
  uploadPhoto
);
// chatGPT
router.post(
  '/chat-process',
  [authentication, limiter],
  apiPermission,
  async (req, res) => {
    res.setHeader('Content-type', 'application/octet-stream');

    try {
      const { prompt, options = {}, systemMessage } = req.body as RequestProps;
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
  }
);

router.post('/config', authentication, apiPermission, async (req, res) => {
  try {
    const response = await chatConfig();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

router.post('/session', async (req, res) => {
  try {
    res.send({
      status: '0',
      message: '',
      data: { auth: '', model: currentModel() },
    });
  } catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body as { token: string };
    if (!token) throw new Error('Secret key is empty');

    res.send({ status: '0', message: 'Verify successfully', data: null });
  } catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null });
  }
});
export default router;
