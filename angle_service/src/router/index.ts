import { login } from '../controller/login.js';
import { uploadPhoto, upload } from '../controller/photo.js';
import express from 'express';
import {
  getAllUser,
  addUser,
  updateUser,
  deleteUser,
  changePassword,
} from '../controller/user.js';
import { authentication, apiPermission } from '../public/index.js';

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

export default router;
