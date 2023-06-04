/* eslint-disable linebreak-style */
/* eslint-disable import/named */
import { Router } from 'express';
import UploadFileController from './uploadfile.controller';
import multer from 'multer';

const upload = multer({ dest: 'uploads' });

const router = Router();

router.post(
  '/',
  upload.single('profileImage'),
  UploadFileController.uploadFile
);

export default router;
