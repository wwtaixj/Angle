/*
 * @Author: JX 761359511@qq.com
 * @Date: 2023-04-23 09:40:12
 * @LastEditors: JX 761359511@qq.com
 * @LastEditTime: 2023-10-19 17:31:28
 * @FilePath: \Angle\angle_service\src\router\index.ts
 */
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
