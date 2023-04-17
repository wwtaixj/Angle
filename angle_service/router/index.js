import { login } from '../controller/login.js';
import { uploadPhoto, upload } from '../controller/photo.js';
import express from 'express';
import { getAllUser } from '../controller/user.js';

// 创建路由对象
const router = new express.Router();

// 挂载路由规划
//login
router.post('/login', login);
//user
router.get('/user', getAllUser);
router.post('/user', getAllUser);
router.put('/user', getAllUser);
router.delete('/user', getAllUser);
// photo
router.post('/uploadPhoto', upload.single('images'), uploadPhoto);

// 使用ES6的默认导出语法，将路由对象共享出去
export default router;
