import * as dotenv from 'dotenv';
import { login } from '../controller/login';
import { uploadPhoto, upload } from '../controller/photo';
import express from 'express';
import { authentication, apiPermission } from '../auth';
import { chatProcess, config } from '../controller/chat';
import {
  getAllUser,
  addUser,
  updateUser,
  deleteUser,
  changePassword,
  register,
  sendVerificationCode,
} from '../controller/user';

import { limiter } from '../auth/limiter';

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
router.post('/v1/user/register', authentication, apiPermission, register);
router.post(
  '/v1/user/verificationCode',
  authentication,
  apiPermission,
  sendVerificationCode
);
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
  chatProcess
);
router.post('/config', authentication, apiPermission, config);
export default router;
