import { Router } from 'express';
import authRoutes from './controllers/authController';
import userRoutes from './controllers/userController';
import uploadRoutes from './controllers/uploadFileController';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;
