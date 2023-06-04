/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable linebreak-style */
/* eslint-disable import/named */
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import UploadFileController from './uploadfile.controller';

const storage = () =>
  multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'public/upload-files/');
    },
    filename(req, file, cb) {
      const datetimestamp = Date.now();
      cb(
        null,
        `${file.fieldname}-${datetimestamp}.${
          file.originalname.split('.')[file.originalname.split('.').length - 1]
        }`
      );
    },
  });

const upload = () =>
  multer({
    storage: storage(),
    limits: { fileSize: 10000000 },
    fileFilter(req, file, callback) {
      const ext = path.extname(file.originalname);
      if (
        ext !== '.png' &&
        ext !== '.jpg' &&
        ext !== '.gif' &&
        ext !== '.jpeg'
      ) {
        return callback(new Error('Only images are allowed'));
      }
      callback(null, true);
    },
  });

// const upload = multer({ dest: 'uploads' });

const router = Router();

router.post(
  '/:id',
  upload().array('profileImage', 1),
  UploadFileController.uploadFile
);

export default router;
