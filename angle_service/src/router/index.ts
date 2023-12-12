import * as dotenv from 'dotenv';
import { login, logout } from '../controller/login';
import { uploadPhoto, upload } from '../controller/photo';
import express from 'express';
import { chatProcess, config } from '../controller/chat';
import { Url } from '@/enums/url';
import {
  getAllUser,
  addUser,
  updateUser,
  deleteUser,
  changePassword,
  register,
  sendVerificationCode,
  getFriends,
} from '../controller/user';

import { limiter } from '../auth/limiter';

dotenv.config();

// 创建路由对象
const router = express.Router();

// 挂载路由规划
//login
router.post(Url.LOGIN, login);
router.post(Url.LOGOUT, logout);
//user
router.get(Url.USER, getAllUser);
router.post(Url.USER, addUser);
router.put(Url.USER, updateUser);
router.delete(Url.USER, deleteUser);
router.post(Url.REGISTER, register);
router.post(Url.VERIFICATION_CODE, sendVerificationCode);
router.put(Url.CHANGE_PASSWORD, changePassword);
router.get(Url.FRIENDS, getFriends);
// photo
router.post(Url.UPLOAD_PHOTO, upload.single('images'), uploadPhoto);
// chatGPT
router.post(Url.CHAT_PROCESS, limiter, chatProcess);
router.post(Url.CONFIG, config);
export default router;
