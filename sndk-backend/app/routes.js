import { Router } from 'express';
import authRoutes from './controllers/authController';
import userRoutes from './controllers/userController';
import uploadRoutes from './controllers/uploadFileController';

const router = Router();
/*
 - Auth route for login, signup and logout api's
 - User route for user list , user detail , profile update api's
 - Upload route for upload a profile image of user
 */
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;
