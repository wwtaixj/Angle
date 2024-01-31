import * as dotenv from 'dotenv';
import express from 'express';
import { login, logout } from '../controller/login';
import { uploadPhoto } from '../controller/photo';
import {
  chatProcess,
  config,
  uploadImage,
  ChatUploadFile,
} from '../controller/chat';
import { Url } from '@/enums/url';
import { uploadFile } from '@/utils';
import {
  getAllUser,
  addUser,
  updateUser,
  deleteUser,
  changePassword,
  register,
  sendVerificationCode,
  getFriends,
  uploadAvatar,
} from '../controller/user';

import { limiter } from '../auth/limiter';

dotenv.config();
const chatImages = uploadFile({
  path: 'public/upload/images/chat/',
  fileTypes: 'image/',
});
const photoImages = uploadFile({
  path: 'public/upload/images/photo/',
  fileTypes: 'image/',
});
const avatarImage = uploadFile({
  path: 'public/upload/images/avatar/',
  fileTypes: 'image/',
});
const file = uploadFile({
  path: 'public/upload/files/chat',
  fileTypes: ['text/', 'application/', 'image/'],
});

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
router.post(Url.UPLOAD_AVATAR, avatarImage.single('avatar'), uploadAvatar);
// photo
router.post(Url.UPLOAD_PHOTO, photoImages.single('images'), uploadPhoto);

// chatGPT
router.post(Url.CHAT_PROCESS, limiter, chatProcess);
router.post(Url.UPLOAD_IMAGE, chatImages.single('images'), uploadImage);
router.post(Url.UPLOAD_File, file.single('file'), ChatUploadFile);

router.post(Url.CONFIG, config);
export default router;
